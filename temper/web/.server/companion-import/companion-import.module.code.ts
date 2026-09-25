import { createHash } from "node:crypto"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { slugStem } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionValuesOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import type {
  BuildHash,
  BuildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  findAccountAddress,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { extractCompanionMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

function noAccountPageWhy(userId: string): string {
  return `no ${ACCOUNT_PAGE_TYPE} page names user ${userId}, so a build imported now would belong to no account`
}

const SLUG_TAG_LENGTH = 12

export function importedBuildSlug(title: string, accountPage: string, hash: string): string {
  const tag = createHash("sha256")
    .update(`${accountPage}\n${hash}`)
    .digest("hex")
    .slice(0, SLUG_TAG_LENGTH)
  const stem = slugStem(title)
  return stem === "" || !/^[a-z]/.test(stem) ? `companion-build-${tag}` : `${stem}-${tag}`
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

  const { rows: existingBuilds } = await getPages({
    pageTypeSlug: "companion-build",
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

  try {
    const created = await createPage({
      pageTypeSlug: "companion-build",
      properties: {
        slug: importedBuildSlug(buildState.name, accountPage, hash),
        accountPage,
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
        where: [
          { key: "accountPage", eq: accountPage },
          { key: "companionId", eq: named.companionId },
        ],
        set: { liveBuildId: newBuildId },
      })
    } else {
      await createPage({
        pageTypeSlug: "temper-companion-progress",
        properties: { ...named, accountPage, liveBuildId: newBuildId },
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
