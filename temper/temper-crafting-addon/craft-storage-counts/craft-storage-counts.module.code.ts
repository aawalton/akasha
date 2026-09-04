import type {
  StorageMap,
  StorageSlot,
} from "../craft-storage-prune/craft-storage-prune.module.code.ts"

export function applyStorageCounts(
  storage: StorageMap,
  link: string,
  counts: ReadonlyArray<readonly [string, number]>
): StorageSlot | undefined {
  const slot = storage[link]
  if (slot === undefined) {
    return undefined
  }
  for (const entry of counts) {
    const name = entry[0]
    const count = entry[1]
    if (count === 0) {
      slot[name] = undefined
    } else {
      slot[name] = count
    }
  }
  return slot
}
