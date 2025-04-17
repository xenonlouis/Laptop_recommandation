"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ManageToolkitsRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/toolkits")
  }, [router])

  return null
} 