"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  holdKeyedTitles,
  type KeyedTitles,
  keyedTitlesFrom,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { temperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.ts"
import { useMemo } from "react"

const EVERY = 10000

export type WebPhrases = KeyedTitles

export type Fills = Readonly<Record<string, string | number>>

export function useWebPhrases(): WebPhrases | null {
  const pages = usePages({ pageTypeSlug: temperWebPhrase.slug, limit: EVERY })
  const phrases = useMemo(
    () =>
      pages.isLoading ? null : holdKeyedTitles(keyedTitlesFrom(temperWebPhrase.slug, pages.rows)),
    [pages.isLoading, pages.rows]
  )
  if (pages.error !== null) throw pages.error
  return phrases
}

export function phraseIn(phrases: WebPhrases | null, key: string, fills: Fills = {}): string {
  if (phrases === null) return ""
  const title = phrases.titles.get(key)
  if (title === undefined)
    throw new Error(`phraseIn: no temper-web-phrase page is keyed \`${key}\``)
  return Object.entries(fills).reduce(
    (text, [name, fill]) => text.split(`{${name}}`).join(String(fill)),
    title
  )
}

export type Phrase = (key: string, fills?: Fills) => string

export function usePhrase(): Phrase {
  const phrases = useWebPhrases()
  return useMemo<Phrase>(() => (key, fills) => phraseIn(phrases, key, fills), [phrases])
}
