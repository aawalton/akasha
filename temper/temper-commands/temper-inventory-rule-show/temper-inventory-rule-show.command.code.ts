import type { Answer } from "@akasha/command-system/calling"
import {
  answering,
  JSON_FLAG,
  readIn,
  refusedAll,
  shapeOf,
  shownRule,
  TSV,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-show"

const SHAPE = shapeOf([JSON_FLAG, TSV], { alone: [JSON_FLAG, TSV], namesARule: true })

export async function temperInventoryRuleShow(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => shownRule("category", id, read.said))
}
