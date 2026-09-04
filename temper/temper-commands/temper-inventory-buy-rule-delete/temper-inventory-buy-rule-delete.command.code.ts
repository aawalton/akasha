import type { Answer } from "@akasha/command-system/calling"
import {
  answering,
  droppedRule,
  FORCE,
  readIn,
  refusedAll,
  shapeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-buy-rule-delete"

const SHAPE = shapeOf([FORCE], { alone: [FORCE], namesARule: true })

export async function temperInventoryBuyRuleDelete(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => droppedRule("buy", id, read.said.has(FORCE)))
}
