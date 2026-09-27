import { z } from "zod"

export type VersionsFailure = "signed-out" | "unread"

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

const responseSchema = z.object({ versions: z.array(characterVersionSchema) })

export async function getCharacterVersions(
  buildSlug: string
): Promise<{ versions: CharacterVersion[] } | { failure: VersionsFailure }> {
  try {
    const response = await fetch(`/api/character-versions/${encodeURIComponent(buildSlug)}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      console.error(
        `[version-actions] the versions of ${buildSlug} answered HTTP ${response.status}`
      )
      return { failure: response.status === 401 ? "signed-out" : "unread" }
    }
    return responseSchema.parse(await response.json())
  } catch (err) {
    console.error(`[version-actions] reading the versions of ${buildSlug} failed:`, err)
    return { failure: "unread" }
  }
}
