"use client"

import {
  patchCraftBagDestination,
  patchFurnitureVaultDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { InventoryRules } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  isRulesUnreadWrite,
  useCraftBagAccess,
} from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { useInventoryRulesHandlers } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import {
  rulesFingerprint,
  useInventoryRuleSettings,
  usePersistSettings,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-rules-state/inventory-rules-state.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface InventoryRulesSettingsState {
  localSettings: InventoryRules
  handlers: ReturnType<typeof useInventoryRulesHandlers>
  rulesUnread: string | null
}

export function useInventoryRulesSettingsState(): InventoryRulesSettingsState {
  const { settings, rulesUnread } = useInventoryRuleSettings()
  const { craftBagAccess } = useCraftBagAccess()
  const persistServer = usePersistSettings()

  const [localSettings, setLocalSettings] = useState<InventoryRules>(settings)
  const dirtyRef = useRef(false)
  const localFingerprintRef = useRef(rulesFingerprint(settings))

  useEffect(() => {
    if (dirtyRef.current) {
      if (rulesFingerprint(settings) === localFingerprintRef.current) {
        dirtyRef.current = false
      }
      return
    }
    setLocalSettings(settings)
  }, [settings])

  const settingsRef = useRef(localSettings)
  settingsRef.current = localSettings

  const serverSettingsRef = useRef(settings)
  serverSettingsRef.current = settings

  const applyChange = useCallback(
    (next: InventoryRules) => {
      const revertTo = serverSettingsRef.current
      dirtyRef.current = true
      localFingerprintRef.current = rulesFingerprint(next)
      setLocalSettings(next)
      persistServer(next, (err) => {
        if (isRulesUnreadWrite(err)) {
          toast.warning("Nothing was saved, and nothing was lost.", {
            description:
              "One of your rules stopped being readable while this change was on its way, so it was not written. The rules panel says which rule.",
          })
        } else {
          console.error("[inventory-rules] settings persist failed:", err)
          toast.error("Couldn't save your rule change — reverting to the last saved version.")
        }
        dirtyRef.current = false
        localFingerprintRef.current = rulesFingerprint(revertTo)
        setLocalSettings(revertTo)
      })
    },
    [persistServer]
  )

  useEffect(() => {
    if (rulesUnread !== null) return
    if (craftBagAccess == null) return
    const rules = settingsRef.current.rules
    const needsPatch = craftBagAccess
      ? rules.some(
          (r) => r.id === "crafting-craft-bag" && r.action === "move-to" && r.destination === "bank"
        )
      : rules.some((r) => r.action === "move-to" && r.destination === "craft-bag")
    if (!needsPatch) return
    applyChange(patchCraftBagDestination(settingsRef.current, craftBagAccess))
  }, [craftBagAccess, applyChange, settingsRef, rulesUnread])

  useEffect(() => {
    if (rulesUnread !== null) return
    if (craftBagAccess == null) return
    const rules = settingsRef.current.rules
    const needsPatch = craftBagAccess
      ? rules.some(
          (r) =>
            r.id === "furnishings-house-storage" &&
            r.action === "move-to" &&
            r.destination === "bank"
        )
      : rules.some((r) => r.action === "move-to" && r.destination === "furniture-vault")
    if (!needsPatch) return
    applyChange(patchFurnitureVaultDestination(settingsRef.current, craftBagAccess))
  }, [craftBagAccess, applyChange, settingsRef, rulesUnread])

  const handlers = useInventoryRulesHandlers(settingsRef, applyChange, craftBagAccess)

  return { localSettings, handlers, rulesUnread }
}
