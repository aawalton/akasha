import { pruneEmptyStorage } from "../core/storage-prune"
import { state } from "../state"

export function MigrateStoragePrune(): undefined {
  pruneEmptyStorage(state.Account.storage)
}
