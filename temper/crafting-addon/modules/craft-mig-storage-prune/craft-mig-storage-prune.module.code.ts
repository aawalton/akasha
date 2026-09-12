import { STATE } from "akasha/temper/crafting-addon/crafting-state/crafting-state.module.code.ts"
import { pruneEmptyStorage } from "akasha/temper/crafting-addon/modules/craft-storage-prune/craft-storage-prune.module.code.ts"

export function migrateStoragePrune(): undefined {
  pruneEmptyStorage(STATE.Account.storage)
}
