import type { Answer } from "@akasha/command-system/calling"
import { addBuyRule, bulkUpdateBuyRules } from "@akasha/temper-items-rules-core/buy-rule-settings"
import type { BuyRule, BuySource } from "@akasha/temper-items-rules-core/buy-rule-types"
import {
  ACTIVE,
  answering,
  DATA,
  GOAL,
  INPUT,
  NOTES,
  readIn,
  refusedAll,
  refusing,
  settingsOf,
  shapeOf,
  TITLE,
  told,
  webIn,
  wholeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { BUY_SOURCE_VALUES } from "../inventory-rule-flags/inventory-rule-flags.module.code.ts"

const CALLED_AS = "akasha temper-inventory-buy-rule-create"

const ITEM_ID = "--item-id"

const ITEM_NAME = "--item-name"

const TARGET = "--target"

const SOURCE = "--source"

const MERCHANT = "merchant"

const SPACES = 2

const SHAPE = shapeOf([ITEM_ID, ITEM_NAME, TARGET, SOURCE, TITLE, NOTES, GOAL, ACTIVE], {
  whole: [ITEM_ID, TARGET],
  yesNo: [ACTIVE],
  required: [ITEM_ID, ITEM_NAME, TARGET],
})

async function made(held: ReadonlyMap<string, string>): Promise<Answer> {
  const said = held.get(SOURCE) ?? MERCHANT
  const source: BuySource | undefined = BUY_SOURCE_VALUES.find((one) => one === said)
  if (source === undefined) {
    return refusing(`\`${SOURCE}\` names \`${said}\`, which is no source a buy rule buys at`, INPUT)
  }
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const added = addBuyRule(settings, {
    itemId: wholeOf(held, ITEM_ID) ?? 0,
    itemName: held.get(ITEM_NAME) ?? "",
    targetQuantity: wholeOf(held, TARGET) ?? 0,
    source,
  })
  const created = (added.buyRules ?? [])[0]
  if (created === undefined) {
    return refusing("a buy rule was added and none stands at the front of the list", DATA)
  }
  const patch: Partial<Pick<BuyRule, "active" | "goal" | "title" | "notes">> = webIn(held)
  const next =
    Object.keys(patch).length > 0 ? bulkUpdateBuyRules(added, [created.id], patch) : added
  await settingsAccess.write(next)
  const after = (next.buyRules ?? []).find((one) => one.id === created.id) ?? created
  const answer = told(JSON.stringify(after, null, SPACES))
  if (after.active === true) return answer
  return {
    report: [
      ...answer.report,
      `this buy rule stands inactive — say \`akasha temper-inventory-buy-rule-update ${created.id} ${ACTIVE} true\` to start it`,
    ],
    refusals: [],
    code: 0,
  }
}

export async function temperInventoryBuyRuleCreate(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => made(read.said))
}
