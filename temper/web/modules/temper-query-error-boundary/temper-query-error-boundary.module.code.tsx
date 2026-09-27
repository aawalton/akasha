"use client"

import { QueryErrorBoundary } from "akasha/design/interface/pattern/modules/query-error-boundary/query-error-boundary.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { temperQueryErrorBoundaryDescription } from "akasha/temper/web/phrase/pages/temper-query-error-boundary-description.temper-web-phrase.ts"
import { temperQueryErrorBoundaryTitle } from "akasha/temper/web/phrase/pages/temper-query-error-boundary-title.temper-web-phrase.ts"
import { temperQueryErrorBoundaryTryAgain } from "akasha/temper/web/phrase/pages/temper-query-error-boundary-try-again.temper-web-phrase.ts"
import type { ReactNode } from "react"

export function TemperQueryErrorBoundary({ children }: { children: ReactNode }) {
  const phrase = usePhrase()
  return (
    <QueryErrorBoundary
      wording={{
        title: phrase(temperQueryErrorBoundaryTitle.slug),
        description: phrase(temperQueryErrorBoundaryDescription.slug),
        retry: phrase(temperQueryErrorBoundaryTryAgain.slug),
      }}
    >
      {children}
    </QueryErrorBoundary>
  )
}
