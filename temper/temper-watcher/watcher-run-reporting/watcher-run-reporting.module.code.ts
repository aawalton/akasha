import { getPage } from "@akasha/pages-access/get"
import { patchPageById } from "@akasha/pages-access/patch"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { logError } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  mergeOperations,
  type RunOutcome,
  type StoredOperation,
  type SyncOperation,
} from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { WATCHER_VERSION } from "../watcher-version/watcher-version.module.code.ts"

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

export type RunReportingSeams = {
  readonly accountId: AccountIdRead
  readonly readEnrolment?: EnrolmentRead
  readonly writeEnrolment?: EnrolmentWrite
  readonly now?: ClockRead
  readonly note?: NoteWrite
}

const realClock: ClockRead = () => new Date()

function decoded(value: unknown): unknown {
  if (typeof value !== "string") return value
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export type KeptOperation = StoredOperation & Record<string, unknown>

export function storedOperations(value: unknown): readonly KeptOperation[] {
  const outcome = decoded(value)
  if (!isRecord(outcome)) return []
  const held = outcome.operations
  if (!Array.isArray(held)) return []
  const entries: readonly unknown[] = held
  return entries.flatMap((entry) => {
    if (!isRecord(entry)) return []
    const name = entry.name
    if (typeof name !== "string") return []
    return [{ ...entry, name }]
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
    const enrolment = await readEnrolment({
      pageTypeSlug: ENROLMENT_PAGE_TYPE_SLUG,
      where: [{ key: ACCOUNT_KEY, eq: accountId }],
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
