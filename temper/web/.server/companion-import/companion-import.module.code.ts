import { createPage } from "@akasha/pages-access/create"
import { getPages } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { requireFirst } from "@akasha/utils/narrow/require-first"
import { extractCompanionMetadata } from "akasha/temper/build-metadata/build-metadata/build-metadata.module.code.ts"
import { decodeCompanion } from "akasha/temper/companion-codec/companion-codec/companion-codec.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/companions-core/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/companions-core/companions/companions.module.code.ts"
import type {
  BuildHash,
  BuildId,
} from "../../../formula-framework/branded-id/branded-id.module.code.ts"
import { buildId as toBuildId } from "../../../formula-framework/branded-id/branded-id.module.code.ts"

export type ImportCompanionResult =
  | { buildId: BuildId; buildName: string }
  | { error: "not-authenticated" }
  | { error: "invalid-hash" }
  | { error: "create-failed"; message: string }

export async function importCompanionFromHash(
  request: Request,
  hash: BuildHash
): Promise<{ result: ImportCompanionResult; headers: Headers }> {
  const { user, headers: authHeaders } = await getUser(request)
  if (!user) {
    return { result: { error: "not-authenticated" }, headers: authHeaders }
  }

  const userId = user.id
  const { headers } = createServerClient(request)
  for (const value of authHeaders.getSetCookie()) {
    headers.append("Set-Cookie", value)
  }

  const buildState = decodeCompanion(hash)
  if (!buildState) {
    return { result: { error: "invalid-hash" }, headers }
  }

  const companionId = buildState.companion.id

  const companionName = requireFirst(companions.data[companionId].name.split(" "))
  const mainHand = buildState.equipment.weapons["main-hand"]
  const weaponName =
    mainHand.itemType === "weapon" && mainHand.data.type !== "no-type"
      ? companionWeaponTypes.data[mainHand.data.type].name
      : ""
  buildState.name = weaponName !== "" ? `${companionName} ${weaponName}` : companionName

  const buildMetadata = extractCompanionMetadata(buildState)

  const { rows: existingBuilds } = await getPages({
    pageTypeSlug: "companion-build",
    where: [
      { key: "accountPage", eq: userId },
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

  const { rows: userCompanions } = await getPages({
    pageTypeSlug: "temper-companion-progress",
    where: [
      { key: "accountPage", eq: userId },
      { key: "companionId", eq: companionId },
    ],
    limit: 1,
  })
  const entity = userCompanions[0]

  try {
    const created = await createPage({
      pageTypeSlug: "companion-build",
      properties: {
        accountPage: userId,
        title: buildState.name,
        description: buildMetadata.description,
        buildHash: hash,
        visibility: "live",
        ...(buildMetadata.baseRoles ? { baseRoles: [...buildMetadata.baseRoles] } : {}),
        ...(buildMetadata.targetCount != null ? { targetCount: buildMetadata.targetCount } : {}),
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : ""

    if (entity) {
      await patchPage({
        pageTypeSlug: "temper-companion-progress",
        where: [{ key: "companionId", eq: companionId }],
        set: { liveBuildId: newBuildId },
      })
    } else {
      await createPage({
        pageTypeSlug: "temper-companion-progress",
        properties: {
          accountPage: userId,
          companionId,
          liveBuildId: newBuildId,
        },
      })
    }

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
