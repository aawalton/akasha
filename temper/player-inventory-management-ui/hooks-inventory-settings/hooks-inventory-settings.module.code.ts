"use client"

import { listenerSet } from "@akasha/design-primitives/listener-set"
import { useSingleFlight } from "@akasha/design-primitives/use-single-flight"
import { askComposed } from "@akasha/pages/query/store-spelled-asking"
import { deletePages } from "@akasha/pages-access/delete"
import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import { upsertPage, upsertPages } from "@akasha/pages-access/upsert"
import { useOptimisticDeletePages } from "@akasha/pages-ui/supabase/mutations/use-optimistic-delete-pages"
import { useOptimisticUpsertPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { useOptimisticUpsertPages } from "@akasha/pages-ui/supabase/mutations/use-optimistic-upsert-pages"
import { usePages } from "@akasha/pages-ui/supabase/use-pages"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { isRecord } from "@akasha/utils/narrow/is-record"
import type { Json } from "@akasha/utils/narrow/json-value"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "akasha/temper/build-support/automation-settings/automation-settings.module.code.ts"
import {
  type BackpackSettings,
  DEFAULT_BACKPACK_SETTINGS,
} from "akasha/temper/items-core/backpack-settings-types/backpack-settings-types.module.code.ts"
import type { CraftBagAccessSettings } from "akasha/temper/items-core/inventory-craft-bag-types/inventory-craft-bag-types.module.code.ts"
import {
  type ManagedGuildBankSettings,
  readManagedGuildBanks,
} from "akasha/temper/items-core/inventory-guild-bank-types/inventory-guild-bank-types.module.code.ts"
import {
  heldFromRows,
  rulesFromPages,
} from "akasha/temper/items-rules-core/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { writesFor } from "akasha/temper/items-rules-core/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

const RULE_PAGE_TYPE_SLUG = "temper-inventory-rule"

const RULES_AT_MOST = 500

interface SettingsBlob {
  "craft-bag-access"?: CraftBagAccessSettings
  "managed-guild-banks"?: ManagedGuildBankSettings
  inventory?: InventoryRuleSettings
  automation?: AutomationSettings
  backpack?: BackpackSettings
  [key: string]: unknown
}

function asSettingsBlob(value: unknown): SettingsBlob {
  return (isRecord(value) ? value : {}) as SettingsBlob
}

const SETTINGS = "settings"

const ENDING = "json"

async function settingsBodyOf(userId: string): Promise<SettingsBlob> {
  const asked = await askComposed({
    "page-type": PLAYER_PAGE_TYPE_SLUG,
    where: { title: { is: userId } },
    keys: ["slug", SETTINGS],
    files: [SETTINGS],
  })
  if (!asked.ok) throw new Error(asked.why)
  const held = asked.answer.rows[0]?.values[SETTINGS]
  if (held === undefined || held === "") return {}
  if (typeof held !== "string") {
    throw new Error(`\`${SETTINGS}\` came back as a ${typeof held} rather than the file's body.`)
  }
  if (held === ENDING) {
    throw new Error(
      `\`${SETTINGS}\` came back as the ending \`${ENDING}\` rather than the body of the file beside the player page, so what is already set went unread. Nothing has been written.`
    )
  }
  return asSettingsBlob(JSON.parse(held))
}

interface SettingsHeld {
  readonly blob: SettingsBlob
  readonly isRead: boolean
  readonly error: Error | null
}

const UNREAD: SettingsHeld = { blob: {}, isRead: false, error: null }

let heldFor: string | null = null
let held: SettingsHeld = UNREAD
const settingsListeners = listenerSet()

function holdSettings(next: SettingsHeld): undefined {
  held = next
  settingsListeners.tell()
}

function readSettings(): SettingsHeld {
  return held
}

export function useSettingsBlob() {
  const userId = useUserId()
  const state = useSyncExternalStore(settingsListeners.subscribe, readSettings, readSettings)

  useEffect(() => {
    if (userId == null) {
      heldFor = null
      holdSettings(UNREAD)
      return
    }
    if (heldFor === userId) return
    heldFor = userId
    holdSettings(UNREAD)
    void (async () => {
      try {
        const blob = await settingsBodyOf(userId)
        if (heldFor !== userId) return
        holdSettings({ blob, isRead: true, error: null })
      } catch (thrown) {
        if (heldFor !== userId) return
        holdSettings({
          blob: {},
          isRead: false,
          error: thrown instanceof Error ? thrown : new Error(String(thrown)),
        })
      }
    })()
  }, [userId])

  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))

  const rawWrite = useCallback(
    async (next: SettingsBlob) => {
      if (userId == null) return
      if (!state.isRead) {
        throw new Error(
          "the settings beside the player page have not been read yet, so writing now would put this over them"
        )
      }
      await runUpsert({
        pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
        where: [{ key: "title", eq: userId }],
        set: { title: userId, [SETTINGS]: ENDING },
        bodies: { [SETTINGS]: JSON.stringify(next) },
      })
      holdSettings({ blob: next, isRead: true, error: null })
    },
    [runUpsert, userId, state.isRead]
  )

  const write = useSingleFlight(rawWrite)
  return { settings: state.blob, write, userId }
}

export function useCraftBagAccess() {
  const { settings, write } = useSettingsBlob()

  const updateCraftBagAccess = useCallback(
    async (craftBagAccess: boolean | undefined) => {
      const next: SettingsBlob = { ...settings }
      if (craftBagAccess === undefined) {
        delete next["craft-bag-access"]
      } else {
        next["craft-bag-access"] = { craftBagAccess }
      }
      await write(next)
    },
    [settings, write]
  )

  return {
    craftBagAccess: settings["craft-bag-access"]?.craftBagAccess,
    updateCraftBagAccess,
  }
}

export function useManagedGuildBanks() {
  const { settings, write } = useSettingsBlob()

  const managedSet = useMemo(() => readManagedGuildBanks(settings), [settings])

  const updateManagedGuildBanks = useCallback(
    async (managedGuildBanks: readonly string[]) => {
      await write({ ...settings, "managed-guild-banks": { managedGuildBanks } })
    },
    [settings, write]
  )

  return {
    managedSet,
    updateManagedGuildBanks,
  }
}

export function useInventorySettings() {
  const { settings, userId } = useSettingsBlob()
  const { rows } = usePages({
    pageTypeSlug: RULE_PAGE_TYPE_SLUG,
    where:
      userId != null
        ? [{ key: "accountPage", eq: userId }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    limit: RULES_AT_MOST,
  })
  const heldRules = useMemo(() => heldFromRows(rows.map((row) => ({ ...row }))), [rows])
  const blob = settings.inventory

  const inventorySettings = useMemo<InventoryRuleSettings>(
    () => ({
      version: 2,
      rules: rulesFromPages(heldRules),
      ...(blob?.itemRules === undefined ? {} : { itemRules: blob.itemRules }),
      ...(blob?.buyRules === undefined ? {} : { buyRules: blob.buyRules }),
    }),
    [heldRules, blob?.itemRules, blob?.buyRules]
  )

  const runUpserts = useOptimisticUpsertPages((args) => upsertPages(args))
  const runDeletes = useOptimisticDeletePages((args) => deletePages(args))

  const updateInventorySettings = useCallback(
    async (next: InventoryRuleSettings) => {
      if (userId == null) return
      const { upserts, deletes } = writesFor(next.rules, heldRules, userId)
      if (upserts.length > 0) {
        await runUpserts({
          pageTypeSlug: RULE_PAGE_TYPE_SLUG,
          items: upserts.map((one) => ({
            where: [{ key: "slug", eq: one.slug }],
            set: one.values as Record<string, Json>,
          })),
        })
      }
      if (deletes.length > 0) {
        await runDeletes({
          pageTypeSlug: RULE_PAGE_TYPE_SLUG,
          where: [{ key: "slug", in: [...deletes] }],
        })
      }
    },
    [heldRules, userId, runUpserts, runDeletes]
  )

  return {
    inventorySettings,
    updateInventorySettings,
  }
}

export function useBackpackSettings() {
  const { settings, write } = useSettingsBlob()
  const backpackSettings = settings.backpack ?? DEFAULT_BACKPACK_SETTINGS

  const updateBackpackSettings = useCallback(
    async (partial: Partial<BackpackSettings>) => {
      await write({ ...settings, backpack: { ...backpackSettings, ...partial } })
    },
    [settings, backpackSettings, write]
  )

  return {
    backpackSettings,
    updateBackpackSettings,
  }
}

const DEFAULT_AUTOMATION_SETTINGS: AutomationSettings = {
  characters: {},
  companions: {},
}

export function useAutomationSettings() {
  const { settings, write } = useSettingsBlob()
  const automationSettings = settings.automation ?? DEFAULT_AUTOMATION_SETTINGS

  const writeAutomation = useCallback(
    async (next: AutomationSettings) => {
      await write({ ...settings, automation: next })
    },
    [settings, write]
  )

  const updateCharacterToggle = useCallback(
    async (
      esoCharId: string,
      section: keyof CharacterAutomationToggles,
      enabled: boolean | undefined
    ) => {
      const existing = automationSettings.characters[esoCharId] ?? {}
      const updated: CharacterAutomationToggles = { ...existing }
      if (enabled === undefined) {
        delete updated[section]
      } else {
        updated[section] = enabled
      }
      await writeAutomation({
        ...automationSettings,
        characters: { ...automationSettings.characters, [esoCharId]: updated },
      })
    },
    [automationSettings, writeAutomation]
  )

  const updateCompanionToggle = useCallback(
    async (
      companionId: string,
      section: keyof CompanionAutomationToggles,
      enabled: boolean | undefined
    ) => {
      const existing = automationSettings.companions[companionId] ?? {}
      const updated: CompanionAutomationToggles = { ...existing }
      if (enabled === undefined) {
        delete updated[section]
      } else {
        updated[section] = enabled
      }
      await writeAutomation({
        ...automationSettings,
        companions: { ...automationSettings.companions, [companionId]: updated },
      })
    },
    [automationSettings, writeAutomation]
  )

  const updateGlobalCharacterToggle = useCallback(
    async (section: keyof CharacterAutomationToggles, enabled: boolean) => {
      await writeAutomation({
        ...automationSettings,
        global: {
          ...automationSettings.global,
          characters: {
            ...automationSettings.global?.characters,
            [section]: enabled,
          },
        },
      })
    },
    [automationSettings, writeAutomation]
  )

  const updateGlobalCompanionToggle = useCallback(
    async (section: keyof CompanionAutomationToggles, enabled: boolean) => {
      await writeAutomation({
        ...automationSettings,
        global: {
          ...automationSettings.global,
          companions: {
            ...automationSettings.global?.companions,
            [section]: enabled,
          },
        },
      })
    },
    [automationSettings, writeAutomation]
  )

  return {
    automationSettings,
    updateCharacterToggle,
    updateCompanionToggle,
    updateGlobalCharacterToggle,
    updateGlobalCompanionToggle,
  }
}
