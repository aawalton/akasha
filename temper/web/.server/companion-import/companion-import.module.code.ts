import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { deletePageById } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionValuesOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import { buildSlug } from "akasha/temper/player/character/build/build-support/modules/build-slug/build-slug.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import type {
  BuildHash,
  BuildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  accountScopedSlug,
  findAccountAddress,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { extractCompanionMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

function noAccountPageWhy(userId: string): string {
  return `no ${ACCOUNT_PAGE_TYPE} page names user ${userId}, so a build imported now would belong to no account`
}

const COMPANION_BUILD = "companion-build"

async function takenBack(buildId: string): Promise<string> {
  try {
    await deletePageById({ pageTypeSlug: COMPANION_BUILD, id: buildId })
    return `; the build ${buildId} written before it was taken away`
  } catch (e) {
    const why = e instanceof Error ? e.message : String(e)
    return `; the build ${buildId} written before it is left behind, as taking it away failed: ${why}`
  }
}

export type ImportCompanionResult =
  | { buildId: BuildId; buildName: string }
  | { error: "not-authenticated" }
  | { error: "invalid-hash" }
  | { error: "no-account"; message: string }
  | { error: "create-failed"; message: string }

export async function importCompanionFromHash(
  request: Request,
  hash: BuildHash
): Promise<{ result: ImportCompanionResult; headers: Headers }> {
  const headers = new Headers()
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  const userId = reached?.ok === true ? reached.account : null
  if (userId === null) {
    return { result: { error: "not-authenticated" }, headers }
  }
  const accountPage = await findAccountAddress(userId)
  if (accountPage === null) {
    return { result: { error: "no-account", message: noAccountPageWhy(userId) }, headers }
  }

  await loadCompanionCatalog()
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

  const slug = buildSlug(buildState.name, `${accountPage}\n${hash}`)
  const { rows: importedBefore } = await getPages({
    pageTypeSlug: COMPANION_BUILD,
    where: [{ key: "slug", eq: slug }],
    limit: 1,
  })
  const { rows: existingBuilds } =
    importedBefore.length > 0
      ? { rows: importedBefore }
      : await getPages({
          pageTypeSlug: COMPANION_BUILD,
          where: [
            { key: "accountPage", eq: accountPage },
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

  const named = companionValuesOf(companionId)
  const { rows: userCompanions } = await getPages({
    pageTypeSlug: "temper-companion-progress",
    where: [
      { key: "accountPage", eq: accountPage },
      { key: "companionId", eq: named.companionId },
    ],
    limit: 1,
  })
  const entity = userCompanions[0]

  let newBuildId = ""
  try {
    const created = await createPage({
      pageTypeSlug: COMPANION_BUILD,
      properties: {
        slug,
        accountPage,
        title: buildState.name,
        description: buildMetadata.description,
        buildHash: hash,
        visibility: "live",
        ...(buildMetadata.baseRoles ? { baseRoles: [...buildMetadata.baseRoles] } : {}),
        ...(buildMetadata.targetCount != null ? { targetCount: buildMetadata.targetCount } : {}),
      },
    })
    newBuildId = typeof created.id === "string" ? created.id : ""

    if (entity) {
      await patchPage({
        pageTypeSlug: "temper-companion-progress",
        where: [
          { key: "accountPage", eq: accountPage },
          { key: "companionId", eq: named.companionId },
        ],
        set: { liveBuildId: newBuildId },
      })
    } else {
      await createPage({
        pageTypeSlug: "temper-companion-progress",
        properties: {
          ...named,
          slug: accountScopedSlug(named.slug, accountPage),
          accountPage,
          liveBuildId: newBuildId,
        },
      })
    }

    return {
      result: { buildId: toBuildId(newBuildId), buildName: buildState.name },
      headers,
    }
  } catch (e) {
    const why = e instanceof Error ? e.message : "Unknown error"
    const undone = newBuildId === "" ? "" : await takenBack(newBuildId)
    return { result: { error: "create-failed", message: `${why}${undone}` }, headers }
  }
}
