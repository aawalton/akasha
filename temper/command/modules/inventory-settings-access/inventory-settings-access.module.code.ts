import { isJson } from "akasha/code/type/narrowing/modules/is-json/is-json.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { deletePages } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { upsertPage, upsertPages } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { AutomationSettingsShape } from "akasha/temper/items/inventory-automation/modules/automation-settings-shape/automation-settings-shape.module.code.ts"
import type { AutomationSettings } from "akasha/temper/items/inventory-automation/modules/automation-toggles/automation-toggles.module.code.ts"
import type { HeldRule } from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import {
  heldFromRows,
  rulesFromPages,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import { createDefaultRuleSettings } from "akasha/temper/items/rules/core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import { InventoryRuleSettingsShape } from "akasha/temper/items/rules/core/modules/inventory-rule-settings-shape/inventory-rule-settings-shape.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { writesFor } from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import { accountAddressOf } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

const RULE_PAGE_TYPE_SLUG = "temper-inventory-rule"

const RULES_AT_MOST = 500

const INDENT = 2

const SETTINGS = "settings"

const INVENTORY_SLICE = "inventory"

const RULES = "rules"

const ENDING = "json"

type SliceKey = "inventory" | "automation"

interface PlayerPage {
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
        `file beside the player page, so what is already set went unread and none of it is ` +
        `written back`
    )
  }
  if (value === ENDING) {
    throw new Error(
      `${caller}: \`${SETTINGS}\` came back as the ending \`${ENDING}\` rather than the body of ` +
        `the file beside the player page, so what is already set went unread`
    )
  }
  let held: unknown
  try {
    held = JSON.parse(value)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new Error(
      `${caller}: the settings beside the ${PLAYER_PAGE_TYPE_SLUG} page hold ` +
        `${value.length} byte(s) that are not valid JSON, so a write now would go over every ` +
        `other setting, and what is already set stays: ${why}`
    )
  }
  if (!isPlainObject(held)) {
    throw new Error(
      `${caller}: the settings beside the ${PLAYER_PAGE_TYPE_SLUG} page hold no JSON object, so ` +
        `a write now would go over every other setting, and what is already set stays`
    )
  }
  return held
}

async function readPlayerPage(accountUserId: string, caller: string): Promise<PlayerPage> {
  const asked = await askComposed({
    "page-type": PLAYER_PAGE_TYPE_SLUG,
    where: { title: { is: accountUserId } },
    keys: ["slug", SETTINGS],
    files: [SETTINGS],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`${caller}: ${PLAYER_PAGE_TYPE_SLUG} went unread — ${asked.why}`)
  }
  const row = asked.answer.rows[0]
  if (row === undefined) {
    throw new Error(`${caller}: no ${PLAYER_PAGE_TYPE_SLUG} page carries title='${accountUserId}'`)
  }
  const name = row.values.slug
  if (typeof name !== "string" || name === "") {
    throw new Error(
      `${caller}: the ${PLAYER_PAGE_TYPE_SLUG} page carrying title='${accountUserId}' states no name of its own`
    )
  }
  return { name, settings: parseSettings(row.values[SETTINGS], caller) }
}

async function readSettings(
  accountUserId: string,
  caller: string
): Promise<Record<string, unknown>> {
  return (await readPlayerPage(accountUserId, caller)).settings
}

async function writeSlice(
  accountUserId: string,
  sliceKey: SliceKey,
  next: unknown,
  caller: string
): Promise<undefined> {
  const player = await readPlayerPage(accountUserId, caller)
  await upsertPage({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: accountUserId }],
    set: { title: accountUserId, [SETTINGS]: ENDING },
    bodies: {
      [SETTINGS]: JSON.stringify({ ...player.settings, [sliceKey]: next }, null, INDENT),
    },
  })
  return undefined
}

async function readHeldRules(accountPage: string): Promise<readonly HeldRule[]> {
  const { rows } = await getPages({
    pageTypeSlug: RULE_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: accountPage }],
    limit: RULES_AT_MOST,
  })
  return heldFromRows(rows.map((row) => ({ ...row })))
}

export function inventorySliceIn(
  settings: Record<string, unknown>,
  caller: string
): Record<string, unknown> {
  const slice = extractSliceValue(settings, INVENTORY_SLICE)
  if (slice === undefined || slice === null) return {}
  if (!isPlainObject(slice)) {
    throw new Error(
      `${caller}: the \`${INVENTORY_SLICE}\` settings beside the ${PLAYER_PAGE_TYPE_SLUG} page ` +
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
  const rules = rulesFromPages(await readHeldRules(await accountAddressOf(accountUserId)))
  return InventoryRuleSettingsShape.parse({ ...createDefaultRuleSettings(), ...slice, rules })
}

export function besidePages(
  kept: Record<string, unknown>,
  next: InventoryRuleSettings
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(kept)) {
    if (key !== RULES) out[key] = value
  }
  for (const [key, value] of Object.entries(next)) {
    if (key === RULES) continue
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
  const held = await readHeldRules(accountPage)
  const { upserts, deletes } = writesFor(next.rules, held, accountPage)
  if (upserts.length > 0) {
    await upsertPages({
      pageTypeSlug: RULE_PAGE_TYPE_SLUG,
      items: upserts.map((one) => ({
        where: [{ key: "slug", eq: one.slug }],
        set: one.values as Record<string, Json>,
      })),
    })
  }
  if (deletes.length > 0) {
    await deletePages({
      pageTypeSlug: RULE_PAGE_TYPE_SLUG,
      where: [{ key: "slug", in: [...deletes] }],
    })
  }
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
