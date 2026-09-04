import type { Answer } from "@akasha/command-system/calling"
import { bulkUpdateBuyRules } from "@akasha/temper-items-rules-core/buy-rule-settings"
import type { BuyRule, BuySource } from "@akasha/temper-items-rules-core/buy-rule-types"
import {
  ACTIVE,
  answering,
  FORCE,
  GOAL,
  INPUT,
  lockedOff,
  NOTES,
  named,
  readIn,
  refusedAll,
  refusing,
  settingsOf,
  shapeOf,
  TITLE,
  toldOf,
  unfound,
  webIn,
  wholeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { BUY_SOURCE_VALUES } from "../inventory-rule-flags/inventory-rule-flags.module.code.ts"

const CALLED_AS = "akasha temper-inventory-buy-rule-update"

const TARGET = "--target"

const SOURCE = "--source"

const CHANGES = [TARGET, SOURCE, TITLE, NOTES, GOAL, ACTIVE]

const SHAPE = shapeOf([...CHANGES, FORCE], {
  alone: [FORCE],
  whole: [TARGET],
  yesNo: [ACTIVE],
  namesARule: true,
})

async function changed(id: string, held: ReadonlyMap<string, string>): Promise<Answer> {
  const said = held.get(SOURCE)
  let source: BuySource | undefined
  if (said !== undefined) {
    source = BUY_SOURCE_VALUES.find((one) => one === said)
    if (source === undefined) {
      return refusing(
        `\`${SOURCE}\` names \`${said}\`, which is no source a buy rule buys at`,
        INPUT
      )
    }
  }
  const targetQuantity = wholeOf(held, TARGET)
  const patch: Partial<
    Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
  > = {
    ...(targetQuantity !== undefined ? { targetQuantity } : {}),
    ...(source !== undefined ? { source } : {}),
    ...webIn(held),
  }
  if (Object.keys(patch).length === 0) {
    return refusing(
      `\`${CALLED_AS}\` names no field to change — it changes ${named(CHANGES)}`,
      INPUT
    )
  }
  const force = held.has(FORCE)
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const standing = (settings.buyRules ?? []).find((one) => one.id === id)
  if (standing === undefined) return unfound("buy", id)
  if (standing.locked === true && !force) return lockedOff("buy", id)
  const next = bulkUpdateBuyRules(settings, [id], patch, { force })
  await settingsAccess.write(next)
  return toldOf((next.buyRules ?? []).find((one) => one.id === id) ?? standing)
}

export async function temperInventoryBuyRuleUpdate(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => changed(id, read.said))
}
