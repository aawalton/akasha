import { PotMaker as holder } from "../potion-state/potion-state.module.code.ts"

interface PotionGlobalTable {
  PotMaker: typeof holder
}

function asGlobalTable(this: void, value: unknown): PotionGlobalTable {
  return value as PotionGlobalTable
}

asGlobalTable(globalThis).PotMaker = holder
