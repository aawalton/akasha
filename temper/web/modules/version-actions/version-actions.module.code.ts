import {
  heldWebPhrases,
  phraseIn,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { versionActionsFetchFailed } from "akasha/temper/web/phrase/pages/version-actions-fetch-failed.temper-web-phrase.ts"
import { versionActionsFetchFailedStatus } from "akasha/temper/web/phrase/pages/version-actions-fetch-failed-status.temper-web-phrase.ts"
import { versionActionsUnknownError } from "akasha/temper/web/phrase/pages/version-actions-unknown-error.temper-web-phrase.ts"
import { z } from "zod"

interface CharacterVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string | null
  buildHash: string
  buildMetadata: Record<string, unknown>
}

const characterVersionSchema = z.object({
  id: z.string(),
  versionNumber: z.number(),
  isCheckpoint: z.boolean(),
  checkpointName: z.string().nullable(),
  createdAt: z.string().nullable(),
  buildHash: z.string(),
  buildMetadata: z.record(z.string(), z.unknown()),
})

const responseSchema = z.union([
  z.object({ versions: z.array(characterVersionSchema) }),
  z.object({ error: z.string() }),
])

export async function getCharacterVersions(
  buildSlug: string
): Promise<{ versions: CharacterVersion[] } | { error: string }> {
  try {
    const response = await fetch(`/api/character-versions/${encodeURIComponent(buildSlug)}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      return {
        error: phraseIn(heldWebPhrases(), versionActionsFetchFailedStatus.slug, {
          status: response.status,
        }),
      }
    }
    return responseSchema.parse(await response.json())
  } catch (err) {
    const phrases = heldWebPhrases()
    const reason =
      err instanceof Error ? err.message : phraseIn(phrases, versionActionsUnknownError.slug)
    return { error: phraseIn(phrases, versionActionsFetchFailed.slug, { reason }) }
  }
}
