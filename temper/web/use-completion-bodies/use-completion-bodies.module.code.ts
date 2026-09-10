"use client"

import { askComposed } from "@akasha/pages/query/store-spelled-asking"
import { useEffect, useState } from "react"

const COMPLETION = "completion"

const ENDING = "json"

export type CompletionBodies = ReadonlyMap<string, unknown>

const NOTHING: CompletionBodies = new Map()

export interface CompletionBodiesResult {
  bodies: CompletionBodies
  isLoading: boolean
  error: Error | null
}

async function bodiesOf(
  pageTypeSlug: string,
  ownerKey: string,
  ownerId: string
): Promise<CompletionBodies> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { [ownerKey]: { is: ownerId } },
    keys: ["id", COMPLETION],
    files: [COMPLETION],
  })
  if (!asked.ok) throw new Error(asked.why)

  const held = new Map<string, unknown>()
  for (const row of asked.answer.rows) {
    const id = row.values.id
    const body = row.values[COMPLETION]
    if (typeof id !== "string" || typeof body !== "string" || body === "") continue
    if (body === ENDING) {
      throw new Error(
        `\`${COMPLETION}\` came back as the ending \`${ENDING}\` rather than the body of the file beside ${pageTypeSlug} ${id}, so the query did not name it under \`files\`.`
      )
    }
    held.set(id, JSON.parse(body))
  }
  return held
}

export function useCompletionBodies(
  pageTypeSlug: string,
  ownerKey: string,
  ownerId: string | null
): CompletionBodiesResult {
  const [bodies, setBodies] = useState<CompletionBodies>(NOTHING)
  const [isLoading, setIsLoading] = useState(ownerId != null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (ownerId == null || ownerId === "") {
      setBodies(NOTHING)
      setIsLoading(false)
      setError(null)
      return
    }
    let dropped = false
    setIsLoading(true)
    setError(null)
    void (async () => {
      try {
        const held = await bodiesOf(pageTypeSlug, ownerKey, ownerId)
        if (dropped) return
        setBodies(held)
        setIsLoading(false)
      } catch (thrown) {
        if (dropped) return
        setBodies(NOTHING)
        setError(thrown instanceof Error ? thrown : new Error(String(thrown)))
        setIsLoading(false)
      }
    })()
    return () => {
      dropped = true
    }
  }, [pageTypeSlug, ownerKey, ownerId])

  return { bodies, isLoading, error }
}
