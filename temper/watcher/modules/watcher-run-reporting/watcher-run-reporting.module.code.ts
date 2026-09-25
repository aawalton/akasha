import { getPage } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPageById } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { accountAddressOf } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { watcherOperationDetail } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-detail.text-property.ts"
import { watcherOperationKind } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-kind.select-property.ts"
import { watcherOperationName } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-name.text-property.ts"
import { watcherOperationPath } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-path.text-property.ts"
import { watcherOperationState } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-state.select-property.ts"
import { watcherVersion } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-version.text-property.ts"
import { logError } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  mergeOperations,
  type StoredOperation,
  type SyncOperation,
} from "akasha/temper/watcher/modules/watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { WATCHER_VERSION } from "akasha/temper/watcher/modules/watcher-version/watcher-version.module.code.ts"
import { z } from "zod"

export const ENROLMENT_PAGE_TYPE_SLUG = "temper-watcher-enrolment"

export const ACCOUNT_KEY = "accountPage"

const VERSION_KEY = "watcherVersion"

const REPORTED_AT_KEY = "reportedAt"

export const OPERATIONS_KEY = "operations"

export const NO_ACCOUNT_MESSAGE =
  "Run outcome not reported — this session has no signed-in user to scope it to"

export const NO_ENROLMENT_MESSAGE =
  "Run outcome not reported — this account has no temper-watcher-enrolment page"

type AccountIdRead = () => Promise<string | null>

export type EnrolmentRead = typeof getPage

export type EnrolmentWrite = typeof patchPageById

type ClockRead = () => Date

type NoteWrite = (message: string) => void

type AccountAddressOf = (userId: string) => Promise<string>

export type RunReportingSeams = {
  readonly accountId: AccountIdRead
  readonly addressOf?: AccountAddressOf
  readonly readEnrolment?: EnrolmentRead
  readonly writeEnrolment?: EnrolmentWrite
  readonly now?: ClockRead
  readonly note?: NoteWrite
}

const realClock: ClockRead = () => new Date()

const INSTANT = z.iso.datetime()

const OPERATION = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1).max(watcherOperationName.maxLength),
  kind: z.enum(watcherOperationKind.values),
  path: z.string().min(1).max(watcherOperationPath.maxLength),
  state: z.enum(watcherOperationState.values),
  ranAt: INSTANT,
  detail: z.string().max(watcherOperationDetail.maxLength).optional(),
  fileModifiedAt: INSTANT.optional(),
})

const REPORT = z.object({
  [VERSION_KEY]: z.string().min(1).max(watcherVersion.maxLength),
  [REPORTED_AT_KEY]: INSTANT,
  [OPERATIONS_KEY]: z.array(OPERATION),
})

export type Report = z.infer<typeof REPORT>

export function storedOperations(value: unknown): readonly StoredOperation[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((row) => {
    const read = OPERATION.safeParse(row)
    return read.success ? [read.data] : []
  })
}

function fitted(operation: SyncOperation): SyncOperation {
  const most = watcherOperationDetail.maxLength
  const { detail } = operation
  if (detail === undefined || detail.length <= most) return operation
  return { ...operation, detail: detail.slice(0, most) }
}

function reportFor(stored: unknown, operations: readonly SyncOperation[], at: Date): Report {
  return REPORT.parse({
    [VERSION_KEY]: WATCHER_VERSION,
    [REPORTED_AT_KEY]: at.toISOString(),
    [OPERATIONS_KEY]: mergeOperations(storedOperations(stored), operations.map(fitted)),
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
      select: ["id", OPERATIONS_KEY],
    })
    if (enrolment === null || typeof enrolment.id !== "string") {
      note(NO_ENROLMENT_MESSAGE)
      return
    }
    await writeEnrolment({
      pageTypeSlug: ENROLMENT_PAGE_TYPE_SLUG,
      id: enrolment.id,
      set: reportFor(enrolment[OPERATIONS_KEY], operations, now()),
    })
  } catch (err) {
    note(`Run outcome not reported: ${err instanceof Error ? err.message : String(err)}`)
  }
}
