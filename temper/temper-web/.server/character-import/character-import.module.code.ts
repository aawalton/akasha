import { createPage } from "@akasha/pages-access/create"
import { getPages } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { decodeBuild } from "@akasha/temper-build-codec/build-codec"
import { extractCharacterMetadata } from "@akasha/temper-build-metadata/build-metadata"
import { classes } from "@akasha/temper-classes/character-class"
import type {
  BuildHash,
  BuildId,
  EsoCharacterId,
} from "@akasha/temper-formula-framework/branded-id"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import { races } from "@akasha/temper-races/races"
import type { Json } from "@akasha/utils-narrow/json-value"

function asJson(value: Record<string, unknown>): Json {
  return value as Json
}

export type ImportCharacterResult =
  | { buildId: BuildId; buildName: string }
  | { error: "not-authenticated" }
  | { error: "invalid-hash" }
  | { error: "create-failed"; message: string }

export async function importCharacterFromHash(
  request: Request,
  hash: BuildHash,
  esoCharacterId?: EsoCharacterId
): Promise<{ result: ImportCharacterResult; headers: Headers }> {
  const { user, headers: authHeaders } = await getUser(request)
  if (!user) {
    return { result: { error: "not-authenticated" }, headers: authHeaders }
  }

  const userId = user.id
  const { headers } = createServerClient(request)
  for (const value of authHeaders.getSetCookie()) {
    headers.append("Set-Cookie", value)
  }

  const buildState = decodeBuild(hash)
  if (!buildState) {
    return { result: { error: "invalid-hash" }, headers }
  }

  const raceName = races.data[buildState.character.race]?.name ?? "Unknown"
  const className = classes.data[buildState.character.class]?.name ?? "Unknown"
  buildState.name = `${raceName} ${className}`

  const buildMetadata = extractCharacterMetadata(buildState)

  const { rows: existingBuilds } = await getPages({
    pageTypeSlug: "character-build",
    where: [
      { key: "userId", eq: userId },
      { key: "buildHash", eq: hash },
    ],
    limit: 1,
  })
  const firstExistingBuild = existingBuilds[0]
  if (firstExistingBuild && typeof firstExistingBuild.id === "string") {
    return {
      result: { buildId: toBuildId(firstExistingBuild.id), buildName: buildState.name },
      headers,
    }
  }

  if (esoCharacterId) {
    const { rows: existingEntities } = await getPages({
      pageTypeSlug: "temper-account-character",
      where: [
        { key: "accountPage", eq: userId },
        { key: "esoCharacterId", eq: esoCharacterId },
      ],
      limit: 1,
    })

    let liveBuildId: string | undefined
    const entity = existingEntities[0]
    if (entity) {
      liveBuildId = typeof entity.liveBuildId === "string" ? entity.liveBuildId : undefined
    }

    try {
      const created = await createPage({
        pageTypeSlug: "character-build",
        properties: {
          userId,
          accountPage: userId,
          buildName: buildState.name,
          buildHash: hash,
          buildMetadata: asJson({ ...buildMetadata }),
          visibility: "live",
        },
      })
      const newBuildId = typeof created.id === "string" ? created.id : ""

      if (entity) {
        await patchPage({
          pageTypeSlug: "temper-account-character",
          where: [{ key: "esoCharacterId", eq: esoCharacterId }],
          set: { liveBuildId: newBuildId },
        })
      } else {
        await createPage({
          pageTypeSlug: "temper-account-character",
          properties: {
            userId,
            accountPage: userId,
            esoCharacterId,
            liveBuildId: newBuildId,
          },
        })
      }

      return {
        result: {
          buildId: toBuildId(newBuildId !== "" ? newBuildId : (liveBuildId ?? "")),
          buildName: buildState.name,
        },
        headers,
      }
    } catch (e) {
      return {
        result: {
          error: "create-failed",
          message: e instanceof Error ? e.message : "Unknown error",
        },
        headers,
      }
    }
  }

  try {
    const created = await createPage({
      pageTypeSlug: "character-build",
      properties: {
        userId,
        accountPage: userId,
        buildName: buildState.name,
        buildHash: hash,
        buildMetadata: asJson({ ...buildMetadata }),
        visibility: "private",
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : ""
    return {
      result: { buildId: toBuildId(newBuildId), buildName: buildState.name },
      headers,
    }
  } catch (e) {
    return {
      result: { error: "create-failed", message: e instanceof Error ? e.message : "Unknown error" },
      headers,
    }
  }
}
