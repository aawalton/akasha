import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { WatcherFileModifiedAt } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-file-modified-at.instant-property.types.ts"
import type { WatcherOperationDetail } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-detail.text-property.types.ts"
import type { WatcherOperationKind } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-kind.select-property.types.ts"
import type { WatcherOperationName } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-name.text-property.types.ts"
import type { WatcherOperationPath } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-path.text-property.types.ts"
import type { WatcherOperationRanAt } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-ran-at.instant-property.types.ts"
import type { WatcherOperationState } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-state.select-property.types.ts"

export type WatcherOperations = "jsonl"

export type WatcherOperationsRow = {
  id: Id
  name: WatcherOperationName
  kind: WatcherOperationKind
  path: WatcherOperationPath
  state: WatcherOperationState
  ranAt: WatcherOperationRanAt
  detail?: WatcherOperationDetail
  fileModifiedAt?: WatcherFileModifiedAt
}
