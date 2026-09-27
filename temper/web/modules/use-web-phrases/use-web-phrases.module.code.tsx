"use client"

import type { SeededPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.ts"
import { createContext, type ReactNode, useContext, useMemo } from "react"

const EVERY = 10000

const NO_SEED: readonly SeededPhrase[] = []

const Seeded = createContext<readonly SeededPhrase[]>(NO_SEED)

export function TemperPhrasesSeeded({
  phrases,
  children,
}: {
  phrases: readonly SeededPhrase[]
  children: ReactNode
}) {
  return <Seeded.Provider value={phrases}>{children}</Seeded.Provider>
}

function seededFrom(seed: readonly SeededPhrase[]): WebPhrases {
  const read: WebPhrases = new Map(
    seed.map((one) => [one.slug, { title: one.title, description: one.description ?? null }])
  )
  held ??= read
  return read
}

interface Worded {
  readonly title: string
  readonly description: string | null
}

export type WebPhrases = ReadonlyMap<string, Worded>

export type Fills = Readonly<Record<string, string | number>>

let held: WebPhrases | null = null

export function heldWebPhrases(): WebPhrases | null {
  return held
}

function phrasesFrom(rows: readonly Value[]): WebPhrases {
  const read = new Map<string, Worded>()
  for (const row of rows) {
    const slug = textAt(row, "slug")
    const title = textAt(row, "title")
    if (slug === null || title === null) {
      throw new Error("useWebPhrases: a temper-web-phrase page states no slug or no title")
    }
    const worded = { title, description: textAt(row, "description") }
    read.set(slug, worded)
  }
  return read
}

export function useWebPhrases(): WebPhrases | null {
  const pages = usePages({ pageTypeSlug: temperWebPhrase.slug, limit: EVERY })
  const seed = useContext(Seeded)
  const unread = pages.isLoading || pages.error !== null
  const phrases = useMemo(() => {
    if (unread) return seed.length === 0 ? null : seededFrom(seed)
    held = phrasesFrom(pages.rows)
    return held
  }, [unread, pages.rows, seed])
  if (pages.error !== null && seed.length === 0) throw pages.error
  return phrases
}

function filled(text: string, fills: Fills): string {
  return Object.entries(fills).reduce(
    (out, [name, fill]) => out.split(`{${name}}`).join(String(fill)),
    text
  )
}

function wordedIn(phrases: WebPhrases, slug: string): Worded {
  const worded = phrases.get(slug)
  if (worded === undefined) throw new Error(`phraseIn: no temper-web-phrase page is \`${slug}\``)
  return worded
}

export function phraseIn(phrases: WebPhrases | null, slug: string, fills: Fills = {}): string {
  if (phrases === null) return ""
  return filled(wordedIn(phrases, slug).title, fills)
}

export function phraseDescriptionIn(
  phrases: WebPhrases | null,
  slug: string,
  fills: Fills = {}
): string {
  if (phrases === null) return ""
  const description = wordedIn(phrases, slug).description
  if (description === null) {
    throw new Error(`phraseDescriptionIn: temper-web-phrase \`${slug}\` states no description`)
  }
  return filled(description, fills)
}

export type Phrase = (slug: string, fills?: Fills) => string

export function usePhrase(): Phrase {
  const phrases = useWebPhrases()
  return useMemo<Phrase>(() => (slug, fills) => phraseIn(phrases, slug, fills), [phrases])
}

export function usePhraseDescription(): Phrase {
  const phrases = useWebPhrases()
  return useMemo<Phrase>(
    () => (slug, fills) => phraseDescriptionIn(phrases, slug, fills),
    [phrases]
  )
}
