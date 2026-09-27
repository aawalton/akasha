import type { VersionsFailure } from "akasha/temper/web/modules/version-actions/version-actions.module.code.ts"
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

const responseSchema = z.object({ versions: z.array(companionVersionSchema) })

export async function getCompanionVersions(
  buildSlug: string
): Promise<{ versions: CompanionVersion[] } | { failure: VersionsFailure }> {
  try {
    const response = await fetch(`/api/companion-versions/${encodeURIComponent(buildSlug)}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      console.error(
        `[companion-version-actions] the versions of ${buildSlug} answered HTTP ${response.status}`
      )
      return { failure: response.status === 401 ? "signed-out" : "unread" }
    }
    return responseSchema.parse(await response.json())
  } catch (err) {
    console.error(`[companion-version-actions] reading the versions of ${buildSlug} failed:`, err)
    return { failure: "unread" }
  }
}
