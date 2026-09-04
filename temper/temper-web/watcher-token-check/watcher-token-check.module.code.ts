import { createHash, timingSafeEqual } from "node:crypto"
import { getPage } from "@akasha/pages-access/get"
import { patchPageById } from "@akasha/pages-access/patch"

export const TEMPER_WATCHER_ENROLMENT_SLUG = "temper-watcher-enrolment"

// Every key this module reads off an enrolment row. A key the page type does not
// declare comes back undefined rather than refusing, so the guards below would
// turn every caller away and say nothing. The test walks the page type's
// `extendsSlug` chain and fails on any key here that the chain does not declare.
export const ENROLMENT_KEYS = ["id", "tokenHash", "accountPage"] as const

const TOKEN_SHAPE = /^wt_[0-9a-f]{64}$/
const HASH_SHAPE = /^[0-9a-f]{64}$/

export function watcherTokenHash(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex")
}

function sameHash(stated: unknown, presented: string): boolean {
  if (typeof stated !== "string") return false
  if (!HASH_SHAPE.test(stated) || !HASH_SHAPE.test(presented)) return false
  return timingSafeEqual(Buffer.from(stated, "hex"), Buffer.from(presented, "hex"))
}

export type ValidatedWatcherToken = {
  accountPageId: string
}

export async function validateWatcherToken(
  wtToken: unknown
): Promise<ValidatedWatcherToken | null> {
  if (typeof wtToken !== "string" || !TOKEN_SHAPE.test(wtToken)) return null
  const presented = watcherTokenHash(wtToken)

  const row = await getPage({
    pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG,
    where: [{ key: "tokenHash", eq: presented }],
    select: [...ENROLMENT_KEYS],
  })
  if (!row) return null
  if (!sameHash(row.tokenHash, presented)) return null

  const enrolmentPageId = row.id
  if (typeof enrolmentPageId !== "string") {
    console.error(
      `validateWatcherToken: an enrolment matched the presented digest and carries no \`id\`, so access is refused. \`${TEMPER_WATCHER_ENROLMENT_SLUG}\` takes \`id\` from \`page\`, where it is required, so a row arriving here without one is a fault in the read rather than a caller to turn away.`
    )
    return null
  }

  const accountPageId = row.accountPage
  if (typeof accountPageId !== "string") {
    console.error(
      `validateWatcherToken(${enrolmentPageId}): the enrolment matched the presented digest and carries no \`accountPage\`, so access is refused. \`${TEMPER_WATCHER_ENROLMENT_SLUG}\` declares \`account-page\` required, so an enrolment arriving here without one is a defect rather than a caller to turn away, and every token that enrolment issued is refused until it names an account.`
    )
    return null
  }

  try {
    await patchPageById({
      pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG,
      id: enrolmentPageId,
      set: { tokenLastUsedAt: new Date().toISOString() },
    })
  } catch (cause) {
    console.error(
      `validateWatcherToken(${enrolmentPageId}): recording tokenLastUsedAt failed, so that timestamp is now stale. The presented token matched and access is granted regardless, because a bookkeeping write must not decide authentication.`,
      cause
    )
  }

  return { accountPageId }
}
