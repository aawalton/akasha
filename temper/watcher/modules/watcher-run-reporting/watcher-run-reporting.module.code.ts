import { getPage } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPageById } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { accountAddressOf } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { logError } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  mergeOperations,
  type RunOutcome,
  type StoredOperation,
  type SyncOperation,
} from "akasha/temper/watcher/modules/watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { WATCHER_VERSION } from "akasha/temper/watcher/modules/watcher-version/watcher-version.module.code.ts"
import { z } from "zod"

export const ENROLMENT_PAGE_TYPE_SLUG = "temper-watcher-enrolment"

export const ACCOUNT_KEY = "accountPage"

export const OUTCOME_KEY = "lastRunOutcome"

export const NO_ACCOUNT_MESSAGE =
  "Run outcome not reported — this session has no signed-in user to scope it to"

export const NO_ENROLMENT_MESSAGE =
  "Run outcome not reported — this account has no temper-watcher-enrolment page"

export type AccountIdRead = () => Promise<string | null>

export type EnrolmentRead = typeof getPage

export type EnrolmentWrite = typeof patchPageById

export type ClockRead = () => Date

export type NoteWrite = (message: string) => void

export type AccountAddressOf = (userId: string) => Promise<string>

export type RunReportingSeams = {
  readonly accountId: AccountIdRead
  readonly addressOf?: AccountAddressOf
  readonly readEnrolment?: EnrolmentRead
  readonly writeEnrolment?: EnrolmentWrite
  readonly now?: ClockRead
  readonly note?: NoteWrite
}

const realClock: ClockRead = () => new Date()

const HELD_OUTCOME = z.object({ operations: z.array(z.unknown()) })

const KEPT_OPERATION = z.looseObject({ name: z.string() })

export type KeptOperation = StoredOperation & Record<string, unknown>

function parseHeldOperations(outcome: unknown): readonly unknown[] {
  const read = HELD_OUTCOME.safeParse(outcome)
  return read.success ? read.data.operations : []
}

function heldOperationsOf(value: unknown): readonly unknown[] {
  if (typeof value !== "string") return parseHeldOperations(value)
  try {
    return parseHeldOperations(JSON.parse(value))
  } catch {
    return []
  }
}

export function storedOperations(value: unknown): readonly KeptOperation[] {
  return heldOperationsOf(value).flatMap((entry) => {
    const kept = KEPT_OPERATION.safeParse(entry)
    return kept.success ? [kept.data] : []
  })
}

export async function reportRunOutcome(
  operations: readonly SyncOperation[],
  seams: RunReportingSeams
): Promise<void> {
  const readEnrolment = seams.readEnrolment ?? getPage
  const writeEnrolment = seams.writeEnrolment ?? patchPageById
  const now = seams.now ?? realClock
  const note = seams.note ?? logError
  try {
    const accountId = await seams.accountId()
    if (accountId === null || accountId === "") {
      note(NO_ACCOUNT_MESSAGE)
      return
    }
    const accountPage = await (seams.addressOf ?? accountAddressOf)(accountId)
    const enrolment = await readEnrolment({
      pageTypeSlug: ENROLMENT_PAGE_TYPE_SLUG,
      where: [{ key: ACCOUNT_KEY, eq: accountPage }],
      select: ["id", OUTCOME_KEY],
    })
    if (enrolment === null || typeof enrolment.id !== "string") {
      note(NO_ENROLMENT_MESSAGE)
      return
    }
    const lastRunOutcome: RunOutcome = {
      watcherVersion: WATCHER_VERSION,
      reportedAt: now().toISOString(),
      operations: mergeOperations(storedOperations(enrolment[OUTCOME_KEY]), operations),
    }
    await writeEnrolment({
      pageTypeSlug: ENROLMENT_PAGE_TYPE_SLUG,
      id: enrolment.id,
      set: { [OUTCOME_KEY]: JSON.stringify(lastRunOutcome) },
    })
  } catch (err) {
    note(`Run outcome not reported: ${err instanceof Error ? err.message : String(err)}`)
  }
}
