"use client"

import { useSingleFlight } from "@akasha/design-primitives/use-single-flight"
import { deletePages } from "@akasha/pages-access/delete"
import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import { upsertPage, upsertPages } from "@akasha/pages-access/upsert"
import { useOptimisticUpsertPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "@akasha/temper-build-support/automation-settings"
import {
  type BackpackSettings,
  DEFAULT_BACKPACK_SETTINGS,
} from "@akasha/temper-items-core/backpack-settings-types"
import type { CraftBagAccessSettings } from "@akasha/temper-items-core/inventory-craft-bag-types"
import {
  type ManagedGuildBankSettings,
  readManagedGuildBanks,
} from "@akasha/temper-items-core/inventory-guild-bank-types"
import {
  heldFromRows,
  rulesFromPages,
} from "@akasha/temper-items-rules-core/inventory-rule-from-pages"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { writesFor } from "@akasha/temper-items-rules-core/inventory-rule-writes"
import { isRecord } from "@akasha/utils-narrow/is-record"
import type { Json } from "@akasha/utils-narrow/json-value"
import { useCallback, useMemo } from "react"

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

function asJson(value: SettingsBlob): Json {
  return value as Json
}

function useSettingsBlob() {
  const userId = useUserId()
  const { rows } = usePagesSupabase({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "title", eq: userId }] : [{ key: "title", eq: NEVER_MATCH_VALUE }],
    limit: 1,
  })
  const playerRow = rows[0]
  const settings = useMemo<SettingsBlob>(
    () => asSettingsBlob(playerRow?.settings),
    [playerRow?.settings]
  )
  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))

  const rawWrite = useCallback(
    async (next: SettingsBlob) => {
      if (userId == null) return
      await runUpsert({
        pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
        where: [{ key: "title", eq: userId }],
        set: {
          title: userId,
          settings: asJson(next),
        },
      })
    },
    [runUpsert, userId]
  )

  const write = useSingleFlight(rawWrite)
  return { settings, write, userId }
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
  const { rows } = usePagesSupabase({
    pageTypeSlug: RULE_PAGE_TYPE_SLUG,
    where:
      userId != null
        ? [{ key: "accountPage", eq: userId }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    limit: RULES_AT_MOST,
  })
  const held = useMemo(
    () => heldFromRows(rows as unknown as readonly Record<string, unknown>[]),
    [rows]
  )
  const blob = settings.inventory

  const inventorySettings = useMemo<InventoryRuleSettings>(
    () => ({
      version: 2,
      rules: rulesFromPages(held),
      ...(blob?.itemRules === undefined ? {} : { itemRules: blob.itemRules }),
      ...(blob?.buyRules === undefined ? {} : { buyRules: blob.buyRules }),
    }),
    [held, blob?.itemRules, blob?.buyRules]
  )

  const updateInventorySettings = useCallback(
    async (next: InventoryRuleSettings) => {
      if (userId == null) return
      const { upserts, deletes } = writesFor(next.rules, held, userId)
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
    },
    [held, userId]
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
