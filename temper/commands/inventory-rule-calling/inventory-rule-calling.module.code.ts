import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import {
  type Commanding,
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { force as forceArgument } from "akasha/commands/arguments/pages/force.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  emitJson,
  emitTsv,
} from "akasha/temper/commands/format-output/format-output.module.code.ts"
import {
  BUY_RULE_COLUMNS,
  ITEM_RULE_COLUMNS,
  itemRuleRow,
  RULE_SHOW_COLUMNS,
} from "akasha/temper/commands/inventory-rule-rows/inventory-rule-rows.module.code.ts"
import { inventorySettings } from "akasha/temper/commands/inventory-settings-handle/inventory-settings-handle.module.code.ts"
import {
  duplicateBuyRule,
  lockBuyRule,
  removeBuyRule,
} from "akasha/temper/items-rules-core/buy-rule-settings/buy-rule-settings.module.code.ts"
import type { BuyRule } from "akasha/temper/items-rules-core/buy-rule-types/buy-rule-types.module.code.ts"
import { buildAllControlledRules } from "akasha/temper/items-rules-core/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import {
  duplicateCategoryRule,
  duplicateItemRule,
  lockCategoryRule,
  lockItemRule,
  removeCategoryRule,
  removeItemRule,
} from "akasha/temper/items-rules-core/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type {
  CategoryRule,
  InventoryRuleSettings,
  ItemRule,
} from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

export type Kind = "category" | "item" | "buy"

export type Held = { readonly id: string; readonly locked?: boolean }

type Kindly = {
  readonly named: string
  readonly heldIn: (settings: InventoryRuleSettings) => readonly Held[]
  readonly locking: (
    settings: InventoryRuleSettings,
    id: string,
    locked: boolean
  ) => InventoryRuleSettings
  readonly dropping: (settings: InventoryRuleSettings, id: string) => InventoryRuleSettings
  readonly copying: (settings: InventoryRuleSettings, id: string) => InventoryRuleSettings
  readonly rowOf: (rule: Held) => Record<string, unknown>
  readonly columns: readonly string[]
}

export function categoryRow(rule: CategoryRule): Record<string, unknown> {
  return {
    id: rule.id,
    categoryId: rule.categoryId,
    action: rule.action,
    active: rule.active,
    locked: rule.locked,
    destination: rule.destination,
  }
}

export function buyRuleRow(rule: BuyRule): Record<string, unknown> {
  return {
    id: rule.id,
    itemId: rule.itemId,
    itemName: rule.itemName,
    targetQuantity: rule.targetQuantity,
    source: rule.source,
    active: rule.active,
    locked: rule.locked,
  }
}

const KINDLY: Record<Kind, Kindly> = {
  category: {
    named: "category rule",
    heldIn: (settings) => settings.rules,
    locking: lockCategoryRule,
    dropping: removeCategoryRule,
    copying: duplicateCategoryRule,
    rowOf: (rule) => categoryRow(rule as CategoryRule),
    columns: RULE_SHOW_COLUMNS,
  },
  item: {
    named: "item rule",
    heldIn: (settings) => settings.itemRules ?? [],
    locking: lockItemRule,
    dropping: removeItemRule,
    copying: duplicateItemRule,
    rowOf: (rule) => itemRuleRow(rule as ItemRule),
    columns: ITEM_RULE_COLUMNS,
  },
  buy: {
    named: "buy rule",
    heldIn: (settings) => settings.buyRules ?? [],
    locking: lockBuyRule,
    dropping: removeBuyRule,
    copying: duplicateBuyRule,
    rowOf: (rule) => buyRuleRow(rule as BuyRule),
    columns: BUY_RULE_COLUMNS,
  },
}

export function named(every: readonly string[]): string {
  return `\`${every.join("`, `")}\``
}

export function toldRows(
  rows: ReadonlyArray<Record<string, unknown>>,
  columns: readonly string[]
): Answer {
  return told(emitTsv(rows, columns).split("\n"))
}

export function refusedAll(why: readonly string[]): Answer {
  return refusedBy(why)
}

export function refusing(why: string, code: number): Answer {
  return refused(why, code)
}

export type Webbed = {
  readonly title?: string
  readonly notes?: string
  readonly goal?: string
  readonly active?: boolean
}

export function webOf(taken: Webbed): Record<string, unknown> {
  const { title, notes, goal, active } = taken
  return {
    ...(title !== undefined ? { title } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(active !== undefined ? { active } : {}),
  }
}

export function unfound(kind: Kind, id: string): Answer {
  return refused(`no ${KINDLY[kind].named} carries the id \`${id}\``, DATA)
}

export function lockedOff(kind: Kind, id: string): Answer {
  return refused(
    `the ${KINDLY[kind].named} \`${id}\` is locked — say \`${forceArgument.said}\` to act on it anyway, or unlock it first`,
    INPUT
  )
}

export function settingsOf(): ReturnType<typeof inventorySettings> {
  return inventorySettings()
}

export async function shownRule(kind: Kind, id: string, asTsv: boolean): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  let found = kindly.heldIn(settings).find((one) => one.id === id)
  if (found === undefined && kind === "category") {
    const derived = buildAllControlledRules(await access.readAutomation())
    found = [...derived.characterRules, ...derived.companionRules].find((one) => one.id === id)
  }
  if (found === undefined) return unfound(kind, id)
  if (asTsv) return toldRows([kindly.rowOf(found)], kindly.columns)
  return told(emitJson(found).split("\n"))
}

export async function lockedRule(kind: Kind, id: string, on: boolean): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  const found = kindly.heldIn(settings).find((one) => one.id === id)
  if (found === undefined) return unfound(kind, id)
  const next = kindly.locking(settings, id, on)
  await access.write(next)
  return told(emitJson(kindly.heldIn(next).find((one) => one.id === id) ?? found).split("\n"))
}

export async function droppedRule(kind: Kind, id: string, force: boolean): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  const found = kindly.heldIn(settings).find((one) => one.id === id)
  if (found === undefined) return unfound(kind, id)
  if (found.locked === true && !force) return lockedOff(kind, id)
  const unlocked = found.locked === true && force ? kindly.locking(settings, id, false) : settings
  await access.write(kindly.dropping(unlocked, id))
  return told(emitJson(found).split("\n"))
}

export async function copiedRule(kind: Kind, id: string): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  const at = kindly.heldIn(settings).findIndex((one) => one.id === id)
  if (at === -1) return unfound(kind, id)
  const next = kindly.copying(settings, id)
  const clone = kindly.heldIn(next)[at + 1]
  if (clone === undefined) {
    return refused(
      `the ${kindly.named} \`${id}\` was copied and no clone is after it, so the settings are wrong`,
      DATA
    )
  }
  await access.write(next)
  return told(emitJson(clone).split("\n"))
}

export async function answeredByPage<Page extends Commanding, Pages extends readonly Argument[]>(
  argv: readonly string[],
  calledAs: string,
  page: Page,
  pages: Pages,
  act: (taken: TakenFor<Page, Pages[number]>) => Promise<Answer>
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, pages)
  if ("refused" in read) return refusedAll(read.refused)
  const taken = read.taken
  return await answering(() => act(taken))
}
