"use client"

import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { toast } from "sonner"

const IMPORT_ERROR_MESSAGES: Record<string, string> = {
  "invalid-hash": "This build link is invalid or uses an unsupported format.",
  "create-failed": "We couldn't import that build. Please try again.",
}

const GENERIC_IMPORT_ERROR = "We couldn't import that build. Please try again."

export function useImportErrorToast(): undefined {
  const [searchParams, setSearchParams] = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (error == null) return
    toast.error(IMPORT_ERROR_MESSAGES[error] ?? GENERIC_IMPORT_ERROR, { id: "build-import-error" })
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete("error")
        return next
      },
      { replace: true }
    )
  }, [error, setSearchParams])
}
