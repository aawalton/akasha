"use client"

import {
  phraseIn,
  useWebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { useImportErrorToastFailed } from "akasha/temper/web/phrase/pages/use-import-error-toast-failed.temper-web-phrase.ts"
import { useImportErrorToastInvalidLink } from "akasha/temper/web/phrase/pages/use-import-error-toast-invalid-link.temper-web-phrase.ts"
import { useImportErrorToastNoAccount } from "akasha/temper/web/phrase/pages/use-import-error-toast-no-account.temper-web-phrase.ts"
import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { toast } from "sonner"

const IMPORT_ERROR_PHRASES: Record<string, string> = {
  "invalid-hash": useImportErrorToastInvalidLink.slug,
  "no-account": useImportErrorToastNoAccount.slug,
  "create-failed": useImportErrorToastFailed.slug,
}

export function useImportErrorToast(): undefined {
  const [searchParams, setSearchParams] = useSearchParams()
  const error = searchParams.get("error")
  const phrases = useWebPhrases()

  useEffect(() => {
    if (error == null || phrases === null) return
    const slug = IMPORT_ERROR_PHRASES[error] ?? useImportErrorToastFailed.slug
    toast.error(phraseIn(phrases, slug), { id: "build-import-error" })
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete("error")
        return next
      },
      { replace: true }
    )
  }, [error, phrases, setSearchParams])
}
