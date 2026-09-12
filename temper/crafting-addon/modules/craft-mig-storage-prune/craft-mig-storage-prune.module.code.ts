import { pruneEmptyStorage } from "akasha/temper/crafting-addon/craft-storage-prune/craft-storage-prune.module.code.ts"
import { STATE } from "akasha/temper/crafting-addon/crafting-state/crafting-state.module.code.ts"

export function migrateStoragePrune(): undefined {
  pruneEmptyStorage(STATE.Account.storage)
}
