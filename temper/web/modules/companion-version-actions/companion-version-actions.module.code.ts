import {
  heldWebPhrases,
  phraseIn,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionVersionActionsFetchFailed } from "akasha/temper/web/phrase/pages/companion-version-actions-fetch-failed.temper-web-phrase.ts"
import { companionVersionActionsFetchFailedStatus } from "akasha/temper/web/phrase/pages/companion-version-actions-fetch-failed-status.temper-web-phrase.ts"
import { companionVersionActionsUnknownError } from "akasha/temper/web/phrase/pages/companion-version-actions-unknown-error.temper-web-phrase.ts"
import { z } from "zod"

interface CompanionVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string | null
  buildHash: string
  buildMetadata: Record<string, unknown>
}

const companionVersionSchema = z.object({
  id: z.string(),
  versionNumber: z.number(),
  isCheckpoint: z.boolean(),
  checkpointName: z.string().nullable(),
  createdAt: z.string().nullable(),
  buildHash: z.string(),
  buildMetadata: z.record(z.string(), z.unknown()),
})

const responseSchema = z.union([
  z.object({ versions: z.array(companionVersionSchema) }),
  z.object({ error: z.string() }),
])

export async function getCompanionVersions(
  buildSlug: string
): Promise<{ versions: CompanionVersion[] } | { error: string }> {
  try {
    const response = await fetch(`/api/companion-versions/${encodeURIComponent(buildSlug)}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      return {
        error: phraseIn(heldWebPhrases(), companionVersionActionsFetchFailedStatus.slug, {
          status: response.status,
        }),
      }
    }
    return responseSchema.parse(await response.json())
  } catch (err) {
    const phrases = heldWebPhrases()
    const reason =
      err instanceof Error
        ? err.message
        : phraseIn(phrases, companionVersionActionsUnknownError.slug)
    return { error: phraseIn(phrases, companionVersionActionsFetchFailed.slug, { reason }) }
  }
}
