import { deletePages } from "@akasha/pages-access/delete"
import { getPages } from "@akasha/pages-access/get"
import { upsertPages } from "@akasha/pages-access/upsert"
import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { AutomationSettingsShape } from "@akasha/temper-inventory-automation/automation-settings-shape"
import type { AutomationSettings } from "@akasha/temper-inventory-automation/automation-toggles"
import type { HeldRule } from "@akasha/temper-items-rules-core/inventory-rule-from-pages"
import {
  heldFromRows,
  rulesFromPages,
} from "@akasha/temper-items-rules-core/inventory-rule-from-pages"
import { createDefaultRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { writesFor } from "@akasha/temper-items-rules-core/inventory-rule-writes"
import { isJson } from "@akasha/utils-narrow/is-json"
import type { Json } from "@akasha/utils-narrow/json-value"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

const RULE_PAGE_TYPE_SLUG = "temper-inventory-rule"

const RULES_AT_MOST = 500

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

const NO_KEYED_WRITE = "the page store refuses every keyed write"

async function writeSlice(
  accountUserId: string,
  sliceKey: SliceKey,
  next: unknown,
  caller: string
): Promise<undefined> {
  const player = await readPlayerPage(accountUserId, caller)
  const settings = JSON.stringify({ ...player.settings, [sliceKey]: next }, null, INDENT)
  throw new Error(
    `${caller}: the \`${sliceKey}\` settings of \`${PLAYER_PAGE_TYPE_SLUG}/${player.name}\` were ` +
      `not patched — ${NO_KEYED_WRITE}. ${settings.length} character(s) of settings were built ` +
      `and dropped, and every read of these rules still answers with what was there before`
  )
}

async function readHeldRules(accountUserId: string): Promise<readonly HeldRule[]> {
  const { rows } = await getPages({
    pageTypeSlug: RULE_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: accountUserId }],
    limit: RULES_AT_MOST,
  })
  return heldFromRows(rows as unknown as readonly Record<string, unknown>[])
}

export async function readInventoryRuleSettings(
  accountUserId: string
): Promise<InventoryRuleSettings> {
  const rules = rulesFromPages(await readHeldRules(accountUserId))
  return { ...createDefaultRuleSettings(), rules }
}

function blobKindsIn(next: InventoryRuleSettings): readonly string[] {
  const named: string[] = []
  if ((next.itemRules ?? []).length > 0) named.push(`${(next.itemRules ?? []).length} item rule(s)`)
  if ((next.buyRules ?? []).length > 0) named.push(`${(next.buyRules ?? []).length} buy rule(s)`)
  return named
}

export async function writeInventoryRuleSettings(
  accountUserId: string,
  next: InventoryRuleSettings
): Promise<undefined> {
  if (!isJson(next)) {
    throw new Error("writeInventoryRuleSettings: next is not JSON-serializable")
  }
  const blobbed = blobKindsIn(next)
  if (blobbed.length > 0) {
    throw new Error(
      `writeInventoryRuleSettings: ${blobbed.join(" and ")} are kept in the settings file beside ` +
        `\`${PLAYER_PAGE_TYPE_SLUG}\`, and only a rule is a page yet, so those went unkept`
    )
  }
  const held = await readHeldRules(accountUserId)
  const { upserts, deletes } = writesFor(next.rules, held, accountUserId)
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
