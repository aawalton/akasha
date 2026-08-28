"use client"

import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Input } from "@shared/design-primitives/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Switch } from "@shared/design-primitives/components/switch"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type {
  InventoryLoggingLevel,
  InventoryPerfTracingLevel,
} from "@temper/game-items-core/inventory-logging-types"
import {
  DESTRUCTIVE_ACTIONS,
  type DestructiveAction,
} from "@temper/game-items-core/inventory-safety-types"
import { useBackpackSettings } from "@temper/player-inventory-management-ui/hooks-inventory-settings"
import { useEffect, useMemo, useState } from "react"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"
import { useLoggingSettings, useSafetySettings } from "@/hooks/hooks-settings"

type ConfirmActionItem = BadgeToggleGroupItem & { value: DestructiveAction }
const CONFIRM_ACTION_ITEMS: ConfirmActionItem[] = DESTRUCTIVE_ACTIONS.map((a) => ({
  value: a.value,
  label: a.label,
}))

function isDestructiveAction(value: string): value is DestructiveAction {
  return CONFIRM_ACTION_ITEMS.some((c) => c.value === value)
}

interface NotificationsTabProps {
  active: boolean
}

export function NotificationsTab({ active }: NotificationsTabProps) {
  const surface = useSurface()
  const { loggingSettings, updateLoggingSettings } = useLoggingSettings()
  const { safetySettings, updateSafetySettings } = useSafetySettings()
  const { backpackSettings, updateBackpackSettings } = useBackpackSettings()
  const [draftBuffer, setDraftBuffer] = useState<string>(String(backpackSettings.bufferSlots))

  useEffect(() => {
    setDraftBuffer(String(backpackSettings.bufferSlots))
  }, [backpackSettings.bufferSlots])

  const selectedItems = useMemo(
    () => CONFIRM_ACTION_ITEMS.filter((item) => safetySettings.confirmActions.includes(item.value)),
    [safetySettings.confirmActions]
  )

  if (!active) return null

  return (
    <ResponsiveColumns>
      <InputPanelCard id="logging" title="Addon Logging">
        <InputPanelCard.Row
          label="Action Reports"
          description="Controls how verbose inventory rule action reports are in your addon console."
        >
          <Select<InventoryLoggingLevel>
            value={loggingSettings.actionReports}
            onValueChange={(value) => updateLoggingSettings({ actionReports: value })}
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem<InventoryLoggingLevel> value="none">None</SelectItem>
              <SelectItem<InventoryLoggingLevel> value="minimal">Minimal</SelectItem>
              <SelectItem<InventoryLoggingLevel> value="verbose">Verbose</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label="Performance Tracing"
          description="Outputs load time and saved variable size for each Temper addon when it finishes loading."
        >
          <Select<InventoryPerfTracingLevel>
            value={loggingSettings.perfTracing}
            onValueChange={(value) => updateLoggingSettings({ perfTracing: value })}
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem<InventoryPerfTracingLevel> value="none">None</SelectItem>
              <SelectItem<InventoryPerfTracingLevel> value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      </InputPanelCard>

      <InputPanelCard id="safety" title="Addon Safety">
        <InputPanelCard.Row
          label="Confirm Before Action"
          description="Show an in-game confirmation dialog before the addon automatically executes these actions."
        >
          <BadgeToggleGroup
            items={CONFIRM_ACTION_ITEMS}
            value={selectedItems}
            onSelect={(items) =>
              updateSafetySettings({
                confirmActions: items.flatMap((i) =>
                  isDestructiveAction(i.value) ? [i.value] : []
                ),
              })
            }
            wrap
          />
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label="Container Cooldown Protection"
          description="Skip auto-opening containers when a boosted reward (e.g. transmutation geode) was received recently."
        >
          <div className="flex h-9 items-center">
            <Switch
              checked={safetySettings.openCooldownProtection}
              onCheckedChange={(checked) =>
                updateSafetySettings({ openCooldownProtection: checked })
              }
            />
          </div>
        </InputPanelCard.Row>
      </InputPanelCard>

      <InputPanelCard id="addon-notifications" title="Addon Notifications">
        <InputPanelCard.Row
          label="Backpack Buffer"
          description="Reserve this many backpack slots when managing inventory."
        >
          <Input
            type="number"
            min={0}
            max={100}
            value={draftBuffer}
            onChange={(e) => setDraftBuffer(e.target.value)}
            onBlur={() => {
              const parsed = Number.parseInt(draftBuffer, 10)
              const clamped = Number.isNaN(parsed)
                ? backpackSettings.bufferSlots
                : Math.max(0, Math.min(100, parsed))
              setDraftBuffer(String(clamped))
              if (clamped !== backpackSettings.bufferSlots) {
                updateBackpackSettings({ bufferSlots: clamped })
              }
            }}
            className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          />
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label="Auto-Stack on Load"
          description="Automatically consolidate partial stacks when logging in."
        >
          <div className="flex h-9 items-center">
            <Switch
              checked={backpackSettings.autoStack}
              onCheckedChange={(checked) => updateBackpackSettings({ autoStack: checked })}
            />
          </div>
        </InputPanelCard.Row>
      </InputPanelCard>
    </ResponsiveColumns>
  )
}
