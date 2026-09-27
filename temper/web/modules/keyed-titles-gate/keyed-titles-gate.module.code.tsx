"use client"

import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import type { ReactNode } from "react"

export function KeyedTitlesGate({
  pageTypeSlug,
  children,
  fallback,
}: {
  pageTypeSlug: string
  children: () => ReactNode
  fallback: ReactNode
}) {
  return <>{useKeyedTitles(pageTypeSlug) === null ? fallback : children()}</>
}
