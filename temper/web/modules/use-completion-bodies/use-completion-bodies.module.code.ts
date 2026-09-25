"use client"

import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { useEffect, useState } from "react"
import type { z } from "zod"

const COMPLETION = "completion"

const ENDING = "json"

const NOTHING: ReadonlyMap<string, never> = new Map<string, never>()

interface CompletionBodiesResult<Body> {
  bodies: ReadonlyMap<string, Body>
  isLoading: boolean
  error: Error | null
}

async function bodiesOf<Body>(
  pageTypeSlug: string,
  ownerKey: string,
  ownerId: string,
  shape: z.ZodType<Body>
): Promise<ReadonlyMap<string, Body>> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { [ownerKey]: { is: ownerId } },
    keys: ["id", COMPLETION],
    files: [COMPLETION],
  })
  if (!asked.ok) throw new Error(asked.why)

  const held = new Map<string, Body>()
  for (const row of asked.answer.rows) {
    const id = row.values.id
    const body = row.values[COMPLETION]
    if (typeof id !== "string" || typeof body !== "string" || body === "") continue
    if (body === ENDING) {
      throw new Error(
        `\`${COMPLETION}\` came back as the ending \`${ENDING}\` rather than the body of the file beside ${pageTypeSlug} ${id}, so the query did not name it under \`files\`.`
      )
    }
    const parsed = shape.safeParse(JSON.parse(body))
    if (!parsed.success) {
      throw new Error(
        `the completion beside ${pageTypeSlug} ${id} is not a completion this view can read: ${parsed.error.message}`
      )
    }
    held.set(id, parsed.data)
  }
  return held
}

export function useCompletionBodies<Body>(
  pageTypeSlug: string,
  ownerKey: string,
  ownerId: string | null,
  shape: z.ZodType<Body>
): CompletionBodiesResult<Body> {
  const [bodies, setBodies] = useState<ReadonlyMap<string, Body>>(NOTHING)
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
        const held = await bodiesOf(pageTypeSlug, ownerKey, ownerId, shape)
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
  }, [pageTypeSlug, ownerKey, ownerId, shape])

  return { bodies, isLoading, error }
}
