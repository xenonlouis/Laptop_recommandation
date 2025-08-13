"use client";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/components/ui/use-mobile';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function SimpleChat() {
  const isMobile = useIsMobile();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add assistant message placeholder
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      // Stream the response
      let accumulatedContent = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        accumulatedContent += chunk;

        // Update the assistant message with accumulated content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const onQuickAsk = (question: string) => {
    setOpen(true);
    sendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size={isMobile ? 'default' : 'lg'} className="shadow-lg">
            💬 Ask AI
          </Button>
        </SheetTrigger>
        <SheetContent side={isMobile ? 'bottom' : 'right'} className={isMobile ? 'h-[85vh] px-0' : 'w-[480px]'}>
          <SheetHeader>
            <SheetTitle>🤖 Laptop Assistant</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full gap-3 pt-3">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 px-2">
              <Button variant="secondary" size="sm" onClick={() => onQuickAsk('Recommend a developer laptop under €1200 for macOS')}>
                💻 Dev ≤ €1200
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onQuickAsk('Best battery life Windows laptop for consultants?')}>
                🔋 Battery
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onQuickAsk('Compare ThinkPad T14 vs X1 Carbon')}>
                ⚖️ Compare
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-2" ref={scrollRef}>
              <div className="space-y-4 py-2">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    👋 Ask me about laptops, budgets, or recommendations!
                  </div>
                )}
                {messages.map((message) => (
                  <div key={message.id} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                    <div className={`inline-block rounded-lg px-4 py-2 max-w-[85%] text-sm whitespace-pre-wrap ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground border'
                    }`}>
                      {message.content || (message.role === 'assistant' && isLoading ? '💭 Thinking...' : '')}
                    </div>
                    {message.role === 'assistant' && message.content && (
                      <div className="text-xs text-muted-foreground mt-1 ml-2">AI Assistant</div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="text-left">
                    <div className="inline-block rounded-lg px-4 py-2 bg-muted text-foreground border text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 px-2 pb-2">
              <Textarea
                placeholder="Ask about laptops, budgets, OS, performance..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !isLoading) {
                      handleSubmit(e);
                    }
                  }
                }}
                className="min-h-[44px] max-h-[120px] resize-none"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
                {isLoading ? '⏳' : '📤'}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
