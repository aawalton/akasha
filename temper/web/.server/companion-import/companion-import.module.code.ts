import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { fileLiveCompanionBuild } from "akasha/temper/player/character/companion-build/modules/filing/companion-build-filing.module.code.ts"
import type {
  BuildHash,
  BuildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  findAccountAddress,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

function noAccountPageWhy(userId: string): string {
  return `no ${ACCOUNT_PAGE_TYPE} page names user ${userId}, so a build imported now would belong to no account`
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

  const companionName = requireFirst(companions.data[buildState.companion.id].name.split(" "))
  const mainHand = buildState.equipment.weapons["main-hand"]
  const weaponName =
    mainHand.itemType === "weapon" && mainHand.data.type !== "no-type"
      ? companionWeaponTypes.data[mainHand.data.type].name
      : ""
  buildState.name = weaponName !== "" ? `${companionName} ${weaponName}` : companionName

  try {
    const filed = await fileLiveCompanionBuild(accountPage, hash, buildState)
    return { result: { buildId: filed.buildId, buildName: buildState.name }, headers }
  } catch (e) {
    const why = e instanceof Error ? e.message : "Unknown error"
    return { result: { error: "create-failed", message: why }, headers }
  }
}
