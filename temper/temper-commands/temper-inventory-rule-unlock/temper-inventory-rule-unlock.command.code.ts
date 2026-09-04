import type { Answer } from "@akasha/command-system/calling"
import {
  answering,
  lockedRule,
  readIn,
  refusedAll,
  shapeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-unlock"

const SHAPE = shapeOf([], { namesARule: true })

export async function temperInventoryRuleUnlock(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => lockedRule("category", id, false))
}
