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
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { notificationsTabActionReports } from "akasha/temper/web/phrase/pages/notifications-tab-action-reports.temper-web-phrase.ts"
import { notificationsTabActionReportsAbout } from "akasha/temper/web/phrase/pages/notifications-tab-action-reports-about.temper-web-phrase.ts"
import { notificationsTabAutoStack } from "akasha/temper/web/phrase/pages/notifications-tab-auto-stack.temper-web-phrase.ts"
import { notificationsTabAutoStackAbout } from "akasha/temper/web/phrase/pages/notifications-tab-auto-stack-about.temper-web-phrase.ts"
import { notificationsTabBackpackBuffer } from "akasha/temper/web/phrase/pages/notifications-tab-backpack-buffer.temper-web-phrase.ts"
import { notificationsTabBackpackBufferAbout } from "akasha/temper/web/phrase/pages/notifications-tab-backpack-buffer-about.temper-web-phrase.ts"
import { notificationsTabConfirmActions } from "akasha/temper/web/phrase/pages/notifications-tab-confirm-actions.temper-web-phrase.ts"
import { notificationsTabConfirmActionsAbout } from "akasha/temper/web/phrase/pages/notifications-tab-confirm-actions-about.temper-web-phrase.ts"
import { notificationsTabCooldownProtection } from "akasha/temper/web/phrase/pages/notifications-tab-cooldown-protection.temper-web-phrase.ts"
import { notificationsTabCooldownProtectionAbout } from "akasha/temper/web/phrase/pages/notifications-tab-cooldown-protection-about.temper-web-phrase.ts"
import { notificationsTabLevelMinimal } from "akasha/temper/web/phrase/pages/notifications-tab-level-minimal.temper-web-phrase.ts"
import { notificationsTabLevelNone } from "akasha/temper/web/phrase/pages/notifications-tab-level-none.temper-web-phrase.ts"
import { notificationsTabLevelVerbose } from "akasha/temper/web/phrase/pages/notifications-tab-level-verbose.temper-web-phrase.ts"
import { notificationsTabLogging } from "akasha/temper/web/phrase/pages/notifications-tab-logging.temper-web-phrase.ts"
import { notificationsTabNotifications } from "akasha/temper/web/phrase/pages/notifications-tab-notifications.temper-web-phrase.ts"
import { notificationsTabPerfTracing } from "akasha/temper/web/phrase/pages/notifications-tab-perf-tracing.temper-web-phrase.ts"
import { notificationsTabPerfTracingAbout } from "akasha/temper/web/phrase/pages/notifications-tab-perf-tracing-about.temper-web-phrase.ts"
import { notificationsTabSafety } from "akasha/temper/web/phrase/pages/notifications-tab-safety.temper-web-phrase.ts"
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
  const phrase = usePhrase()
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
      <InputPanelCard id="logging" title={phrase(notificationsTabLogging.slug)}>
        <InputPanelCard.Row
          label={phrase(notificationsTabActionReports.slug)}
          description={phrase(notificationsTabActionReportsAbout.slug)}
        >
          <Select<InventoryLoggingLevel>
            value={loggingSettings.actionReports}
            onValueChange={(value) => updateLoggingSettings({ actionReports: value })}
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem<InventoryLoggingLevel> value="none">
                {phrase(notificationsTabLevelNone.slug)}
              </SelectItem>
              <SelectItem<InventoryLoggingLevel> value="minimal">
                {phrase(notificationsTabLevelMinimal.slug)}
              </SelectItem>
              <SelectItem<InventoryLoggingLevel> value="verbose">
                {phrase(notificationsTabLevelVerbose.slug)}
              </SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label={phrase(notificationsTabPerfTracing.slug)}
          description={phrase(notificationsTabPerfTracingAbout.slug)}
        >
          <Select<InventoryPerfTracingLevel>
            value={loggingSettings.perfTracing}
            onValueChange={(value) => updateLoggingSettings({ perfTracing: value })}
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem<InventoryPerfTracingLevel> value="none">
                {phrase(notificationsTabLevelNone.slug)}
              </SelectItem>
              <SelectItem<InventoryPerfTracingLevel> value="minimal">
                {phrase(notificationsTabLevelMinimal.slug)}
              </SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      </InputPanelCard>

      <InputPanelCard id="safety" title={phrase(notificationsTabSafety.slug)}>
        <InputPanelCard.Row
          label={phrase(notificationsTabConfirmActions.slug)}
          description={phrase(notificationsTabConfirmActionsAbout.slug)}
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
          label={phrase(notificationsTabCooldownProtection.slug)}
          description={phrase(notificationsTabCooldownProtectionAbout.slug)}
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

      <InputPanelCard id="addon-notifications" title={phrase(notificationsTabNotifications.slug)}>
        <InputPanelCard.Row
          label={phrase(notificationsTabBackpackBuffer.slug)}
          description={phrase(notificationsTabBackpackBufferAbout.slug)}
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
          label={phrase(notificationsTabAutoStack.slug)}
          description={phrase(notificationsTabAutoStackAbout.slug)}
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
