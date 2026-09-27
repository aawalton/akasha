"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Switch } from "akasha/design/interface/primitive/modules/switch-control/switch-control.module.code.tsx"
import type {
  InventoryLoggingLevel,
  InventoryPerfTracingLevel,
} from "akasha/temper/items/core/modules/inventory-logging-types/inventory-logging-types.module.code.ts"
import {
  DESTRUCTIVE_ACTIONS,
  type DestructiveAction,
} from "akasha/temper/items/core/modules/inventory-safety-types/inventory-safety-types.module.code.ts"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { temperBuyAction } from "akasha/temper/player/progress/temper-buy-action/temper-buy-action.page-type.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"
import {
  useLoggingSettings,
  useSafetySettings,
} from "akasha/temper/web/modules/player-settings/player-settings.module.code.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { useBackpackSettings } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { useEffect, useMemo, useState } from "react"

type ConfirmActionItem = BadgeToggleGroupItem & { value: DestructiveAction }

function isDestructiveAction(value: string): value is DestructiveAction {
  return DESTRUCTIVE_ACTIONS.some((c) => c.value === value)
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

  const actionTitles = useKeyedTitles(temperItemAction.slug)
  const buyTitles = useKeyedTitles(temperBuyAction.slug)
  const confirmActionItems = useMemo<ConfirmActionItem[]>(
    () =>
      DESTRUCTIVE_ACTIONS.map((a) => ({
        value: a.value,
        label: titleIn(a.titledBy === temperBuyAction.slug ? buyTitles : actionTitles, a.value),
      })),
    [actionTitles, buyTitles]
  )

  const selectedItems = useMemo(
    () => confirmActionItems.filter((item) => safetySettings.confirmActions.includes(item.value)),
    [confirmActionItems, safetySettings.confirmActions]
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
            items={confirmActionItems}
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
          label="Auto-Stack"
          description="Automatically consolidate partial stacks when logging in and at a banker."
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
