import { patchPage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { isJson } from "@shared/utils-narrow/is-json"
import type { InventoryRuleSettings } from "@temper/game-items-rules-core/inventory-rule-types"
import { AutomationSettingsSchema } from "./automation-settings-schema.ts"
import type { AutomationSettings } from "./automation-types.ts"
import { createDefaultRuleSettings } from "./game-code.ts"
import { InventoryRuleSettingsSchema } from "./rule-settings-schema.ts"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

const WRITER = "ops-temper-inventory"

const INDENT = 2

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

function parseSettings(value: unknown): Record<string, unknown> {
  if (isPlainObject(value)) return value
  if (typeof value !== "string" || value === "") return {}
  try {
    const held: unknown = JSON.parse(value)
    return isPlainObject(held) ? held : {}
  } catch {
    return {}
  }
}

async function readPlayerPage(accountUserId: string, caller: string): Promise<PlayerPage> {
  const asked = await askComposed({
    "page-type": PLAYER_PAGE_TYPE_SLUG,
    where: { title: { is: accountUserId } },
    keys: ["slug", "settings"],
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
  return { name, settings: parseSettings(row.values.settings) }
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
  const landed = await patchPage(
    PLAYER_PAGE_TYPE_SLUG,
    player.name,
    { settings: JSON.stringify({ ...player.settings, [sliceKey]: next }, null, INDENT) },
    WRITER
  )
  if (!landed.ok) throw new Error(`${caller}: ${landed.why}`)
  return undefined
}

export async function readInventoryRuleSettings(
  accountUserId: string
): Promise<InventoryRuleSettings> {
  const settings = await readSettings(accountUserId, "readInventoryRuleSettings")
  const sliceValue = extractSliceValue(settings, "inventory")
  if (sliceValue === undefined) {
    return createDefaultRuleSettings()
  }
  return InventoryRuleSettingsSchema.parse(sliceValue)
}

export async function writeInventoryRuleSettings(
  accountUserId: string,
  next: InventoryRuleSettings
): Promise<undefined> {
  if (!isJson(next)) {
    throw new Error("writeInventoryRuleSettings: next is not JSON-serializable")
  }
  await writeSlice(accountUserId, "inventory", next, "writeInventoryRuleSettings")
}

export async function readAutomationSettings(accountUserId: string): Promise<AutomationSettings> {
  const settings = await readSettings(accountUserId, "readAutomationSettings")
  const sliceValue = extractSliceValue(settings, "automation")
  if (sliceValue === undefined) {
    return { characters: {}, companions: {} }
  }
  return AutomationSettingsSchema.parse(sliceValue)
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
