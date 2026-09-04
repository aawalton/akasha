import type { Answer } from "@akasha/command-system/calling"
import {
  reorderCategoryRule,
  resolveAnchorIndex,
} from "@akasha/temper-items-rules-core/inventory-rule-settings"
import {
  answering,
  DATA,
  FORCE,
  INPUT,
  lockedOff,
  named,
  readIn,
  refusedAll,
  refusing,
  settingsOf,
  shapeOf,
  toldOf,
  unfound,
  wholeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-reorder"

const TO = "--to"

const BEFORE = "--before"

const AFTER = "--after"

const WHERE = [TO, BEFORE, AFTER]

const SHAPE = shapeOf([...WHERE, FORCE], { alone: [FORCE], whole: [TO], namesARule: true })

async function moved(id: string, held: ReadonlyMap<string, string>): Promise<Answer> {
  const given = WHERE.filter((one) => held.has(one))
  if (given.length === 0) {
    return refusing(`\`${CALLED_AS}\` takes one of ${named(WHERE)}, and it was given none`, INPUT)
  }
  if (given.length > 1) {
    return refusing(
      `\`${CALLED_AS}\` takes one of ${named(WHERE)}, and it was given ${named(given)}`,
      INPUT
    )
  }
  const force = held.has(FORCE)
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const standing = settings.rules.find((one) => one.id === id)
  if (standing === undefined) return unfound("category", id)
  if (standing.locked === true && !force) return lockedOff("category", id)

  const to = wholeOf(held, TO)
  let toIndex: number
  if (to !== undefined) {
    if (to > settings.rules.length) {
      return refusing(
        `\`${TO}\` names the index ${to} and the written rules run to ${settings.rules.length}`,
        INPUT
      )
    }
    toIndex = to
  } else {
    const before = held.get(BEFORE)
    const flag = before !== undefined ? BEFORE : AFTER
    const anchorId = before ?? held.get(AFTER) ?? ""
    if (anchorId === id) {
      return refusing(
        `\`${flag}\` names the rule being moved, and a rule anchors to another`,
        INPUT
      )
    }
    const found = resolveAnchorIndex(
      settings,
      id,
      anchorId,
      before !== undefined ? "before" : "after"
    )
    if (found === undefined) {
      return refusing(
        `\`${flag}\` names \`${anchorId}\`, which is no written category rule — a controlled rule is derived rather than written and anchors nothing`,
        DATA
      )
    }
    toIndex = found
  }
  await settingsAccess.write(reorderCategoryRule(settings, id, toIndex))
  return toldOf({ id, toIndex })
}

export async function temperInventoryRuleReorder(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => moved(id, read.said))
}
