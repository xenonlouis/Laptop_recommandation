"use client"

import type React from "react"

// Adapted from shadcn/ui toast hook
import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  open: boolean
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Action =
  | {
      type: typeof actionTypes.ADD_TOAST
      toast: ToastProps
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST
      toast: Partial<ToastProps>
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST
      toastId?: string
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST
      toastId?: string
    }

interface State {
  toasts: ToastProps[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t)),
        }
      }
      return {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t, open: false })),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  const dispatch = useCallback((action: Action) => {
    setState((prevState) => reducer(prevState, action))
  }, [])

  const toast = useCallback(
    ({ ...props }: Omit<ToastProps, "id" | "open">) => {
      const id = generateId()

      const update = (props: Omit<ToastProps, "id" | "open">) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        })

      const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
        },
      })

      return {
        id,
        dismiss,
        update,
      }
    },
    [dispatch],
  )

  const dismissToast = useCallback(
    (toastId?: string) => {
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId })
    },
    [dispatch],
  )

  const removeToast = useCallback(
    (toastId?: string) => {
      dispatch({ type: actionTypes.REMOVE_TOAST, toastId })
    },
    [dispatch],
  )

  useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.open === false && !toastTimeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          toastTimeouts.delete(toast.id)
          removeToast(toast.id)
        }, TOAST_REMOVE_DELAY)

        toastTimeouts.set(toast.id, timeout)
      }
    })

    return () => {
      toastTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
      toastTimeouts.clear()
    }
  }, [state.toasts, removeToast])

  return {
    toasts: state.toasts,
    toast,
    dismissToast,
    removeToast,
  }
}

