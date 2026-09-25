import { isJson } from "akasha/code/type/narrowing/modules/is-json/is-json.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { deletePages } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { upsertPages } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { AutomationSettingsShape } from "akasha/temper/items/inventory-automation/modules/automation-settings-shape/automation-settings-shape.module.code.ts"
import type { AutomationSettings } from "akasha/temper/items/inventory-automation/modules/automation-toggles/automation-toggles.module.code.ts"
import {
  BUY_RULE_PAGE_TYPE,
  buyRulesFromRows,
  buyRuleWritesFor,
} from "akasha/temper/items/rules/core/modules/buy-rule-pages/buy-rule-pages.module.code.ts"
import {
  heldFromRows,
  rulesFromPages,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import { createDefaultRuleSettings } from "akasha/temper/items/rules/core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import { InventoryRuleSettingsShape } from "akasha/temper/items/rules/core/modules/inventory-rule-settings-shape/inventory-rule-settings-shape.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  type RuleWrites,
  writesFor,
} from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import {
  ITEM_RULE_PAGE_TYPE,
  itemRulesFromRows,
  itemRuleWritesFor,
  type PageRow,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  accountAddressOf,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { z } from "zod"

const RULE_PAGE_TYPE_SLUG = "temper-inventory-rule"

const SETTINGS_BLOB = z.record(z.string(), z.unknown())

const RULES_AT_MOST = 500

const INDENT = 2

const SETTINGS = "settings"

const INVENTORY_SLICE = "inventory"

const PAGE_KEYS: ReadonlySet<string> = new Set(["rules", "itemRules", "buyRules"])

const ENDING = "json"

type SliceKey = "inventory" | "automation"

interface AccountPage {
  readonly name: string
  readonly settings: Record<string, unknown>
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function extractSliceValue(settings: unknown, sliceKey: SliceKey): unknown {
  if (!isPlainObject(settings)) return undefined
  return settings[sliceKey]
}

export function parseSettings(value: unknown, caller: string): Record<string, unknown> {
  if (isPlainObject(value)) return value
  if (value === undefined || value === null || value === "") return {}
  if (typeof value !== "string") {
    throw new Error(
      `${caller}: \`${SETTINGS}\` came back as a ${typeof value} rather than the body of the ` +
        `file beside the account page, so what is already set went unread and none of it is ` +
        `written back`
    )
  }
  if (value === ENDING) {
    throw new Error(
      `${caller}: \`${SETTINGS}\` came back as the ending \`${ENDING}\` rather than the body of ` +
        `the file beside the account page, so what is already set went unread`
    )
  }
  let held: ReturnType<typeof SETTINGS_BLOB.safeParse>
  try {
    held = SETTINGS_BLOB.safeParse(JSON.parse(value))
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new Error(
      `${caller}: the settings beside the ${ACCOUNT_PAGE_TYPE} page hold ` +
        `${value.length} byte(s) that are not valid JSON, so a write now would go over every ` +
        `other setting, and what is already set stays: ${why}`
    )
  }
  if (!held.success) {
    throw new Error(
      `${caller}: the settings beside the ${ACCOUNT_PAGE_TYPE} page hold no JSON object, so ` +
        `a write now would go over every other setting, and what is already set stays`
    )
  }
  return held.data
}

async function readAccountPage(accountUserId: string, caller: string): Promise<AccountPage> {
  const asked = await askComposed({
    "page-type": ACCOUNT_PAGE_TYPE,
    where: { key: { is: accountUserId } },
    keys: ["slug", SETTINGS],
    files: [SETTINGS],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`${caller}: ${ACCOUNT_PAGE_TYPE} went unread — ${asked.why}`)
  }
  const row = asked.answer.rows[0]
  if (row === undefined) {
    throw new Error(`${caller}: no ${ACCOUNT_PAGE_TYPE} page has the key ${accountUserId}`)
  }
  const name = row.values.slug
  if (typeof name !== "string" || name === "") {
    throw new Error(
      `${caller}: the ${ACCOUNT_PAGE_TYPE} page with the key ${accountUserId} states no name of its own`
    )
  }
  return { name, settings: parseSettings(row.values[SETTINGS], caller) }
}

async function readSettings(
  accountUserId: string,
  caller: string
): Promise<Record<string, unknown>> {
  return (await readAccountPage(accountUserId, caller)).settings
}

async function writeSlice(
  accountUserId: string,
  sliceKey: SliceKey,
  next: unknown,
  caller: string
): Promise<undefined> {
  const account = await readAccountPage(accountUserId, caller)
  const patched = await patchPage({
    pageTypeSlug: ACCOUNT_PAGE_TYPE,
    where: [{ key: "slug", eq: account.name }],
    set: { [SETTINGS]: ENDING },
    bodies: {
      [SETTINGS]: JSON.stringify({ ...account.settings, [sliceKey]: next }, null, INDENT),
    },
  })
  if (patched === null) {
    throw new Error(
      `${caller}: the ${ACCOUNT_PAGE_TYPE} page ${account.name} went between reading and writing, so nothing was written`
    )
  }
  return undefined
}

async function rowsOf(pageTypeSlug: string, accountPage: string): Promise<readonly PageRow[]> {
  const { rows } = await getPages({
    pageTypeSlug,
    where: [{ key: "accountPage", eq: accountPage }],
    limit: RULES_AT_MOST,
  })
  return rows.map((row) => ({ ...row }))
}

async function landWrites(pageTypeSlug: string, writes: RuleWrites): Promise<undefined> {
  if (writes.upserts.length > 0) {
    await upsertPages({
      pageTypeSlug,
      items: writes.upserts.map((one) => ({
        where: [{ key: "slug", eq: one.slug }],
        set: one.values as Record<string, Json>,
        clears: one.clears,
      })),
    })
  }
  if (writes.deletes.length > 0) {
    await deletePages({
      pageTypeSlug,
      where: [{ key: "slug", in: [...writes.deletes] }],
    })
  }
  return undefined
}

export function inventorySliceIn(
  settings: Record<string, unknown>,
  caller: string
): Record<string, unknown> {
  const slice = extractSliceValue(settings, INVENTORY_SLICE)
  if (slice === undefined || slice === null) return {}
  if (!isPlainObject(slice)) {
    throw new Error(
      `${caller}: the \`${INVENTORY_SLICE}\` settings beside the ${ACCOUNT_PAGE_TYPE} page ` +
        `are a ${typeof slice} rather than an object, so a write now would go over what they ` +
        `hold, and what is already set stays`
    )
  }
  return slice
}

async function readInventorySlice(
  accountUserId: string,
  caller: string
): Promise<Record<string, unknown>> {
  return inventorySliceIn(await readSettings(accountUserId, caller), caller)
}

export async function readInventoryRuleSettings(
  accountUserId: string
): Promise<InventoryRuleSettings> {
  const slice = await readInventorySlice(accountUserId, "readInventoryRuleSettings")
  const accountPage = await accountAddressOf(accountUserId)
  const [ruleRows, itemRows, buyRows] = await Promise.all([
    rowsOf(RULE_PAGE_TYPE_SLUG, accountPage),
    rowsOf(ITEM_RULE_PAGE_TYPE, accountPage),
    rowsOf(BUY_RULE_PAGE_TYPE, accountPage),
  ])
  return InventoryRuleSettingsShape.parse({
    ...createDefaultRuleSettings(),
    ...besidePages(slice, { version: 2, rules: [] }),
    rules: rulesFromPages(heldFromRows(ruleRows)),
    itemRules: itemRulesFromRows(itemRows),
    buyRules: buyRulesFromRows(buyRows),
  })
}

export function besidePages(
  kept: Record<string, unknown>,
  next: InventoryRuleSettings
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(kept)) {
    if (!PAGE_KEYS.has(key)) out[key] = value
  }
  for (const [key, value] of Object.entries(next)) {
    if (PAGE_KEYS.has(key)) continue
    if (value !== undefined) out[key] = value
  }
  return out
}

export async function writeInventoryRuleSettings(
  accountUserId: string,
  next: InventoryRuleSettings
): Promise<undefined> {
  if (!isJson(next)) {
    throw new Error("writeInventoryRuleSettings: next is not JSON-serializable")
  }
  const accountPage = await accountAddressOf(accountUserId)
  const writtenAt = Date.now()
  const [ruleRows, itemRows, buyRows] = await Promise.all([
    rowsOf(RULE_PAGE_TYPE_SLUG, accountPage),
    rowsOf(ITEM_RULE_PAGE_TYPE, accountPage),
    rowsOf(BUY_RULE_PAGE_TYPE, accountPage),
  ])
  const ruleWrites = writesFor(next.rules, heldFromRows(ruleRows), accountPage, writtenAt)
  const itemWrites =
    next.itemRules === undefined
      ? undefined
      : itemRuleWritesFor(next.itemRules, itemRows, accountPage, writtenAt)
  const buyWrites =
    next.buyRules === undefined
      ? undefined
      : buyRuleWritesFor(next.buyRules, buyRows, accountPage, writtenAt)
  await landWrites(RULE_PAGE_TYPE_SLUG, ruleWrites)
  if (itemWrites !== undefined) await landWrites(ITEM_RULE_PAGE_TYPE, itemWrites)
  if (buyWrites !== undefined) await landWrites(BUY_RULE_PAGE_TYPE, buyWrites)
  const kept = await readInventorySlice(accountUserId, "writeInventoryRuleSettings")
  await writeSlice(
    accountUserId,
    INVENTORY_SLICE,
    besidePages(kept, next),
    "writeInventoryRuleSettings"
  )
  return undefined
}

export async function readAutomationSettings(accountUserId: string): Promise<AutomationSettings> {
  const settings = await readSettings(accountUserId, "readAutomationSettings")
  const sliceValue = extractSliceValue(settings, "automation")
  if (sliceValue === undefined) {
    return { characters: {}, companions: {} }
  }
  return AutomationSettingsShape.parse(sliceValue)
}

export async function writeAutomationSettings(
  accountUserId: string,
  next: AutomationSettings
): Promise<undefined> {
  if (!isJson(next)) {
    throw new Error("writeAutomationSettings: next is not JSON-serializable")
  }
  await writeSlice(accountUserId, "automation", next, "writeAutomationSettings")
}
