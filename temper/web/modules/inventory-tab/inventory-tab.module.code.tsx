"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Skeleton } from "akasha/design/interface/primitive/modules/skeleton/skeleton.module.code.tsx"
import { Switch } from "akasha/design/interface/primitive/modules/switch-control/switch-control.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { extractGuildBankKeys } from "akasha/temper/items/core/modules/inventory-guild-bank-filter/inventory-guild-bank-filter.module.code.ts"
import {
  type GuildBankListState,
  resolveGuildBankListState,
} from "akasha/temper/web/modules/guild-bank-list-state/guild-bank-list-state.module.code.ts"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryTabDataUnreadable } from "akasha/temper/web/phrase/pages/inventory-tab-data-unreadable.temper-web-phrase.ts"
import { inventoryTabLoadFailed } from "akasha/temper/web/phrase/pages/inventory-tab-load-failed.temper-web-phrase.ts"
import { inventoryTabManagedGuildBanks } from "akasha/temper/web/phrase/pages/inventory-tab-managed-guild-banks.temper-web-phrase.ts"
import { inventoryTabNoGuildBanks } from "akasha/temper/web/phrase/pages/inventory-tab-no-guild-banks.temper-web-phrase.ts"
import { inventoryTabNoInventoryData } from "akasha/temper/web/phrase/pages/inventory-tab-no-inventory-data.temper-web-phrase.ts"
import { inventoryTabWatcher } from "akasha/temper/web/phrase/pages/inventory-tab-watcher.temper-web-phrase.ts"
import { useInventory } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { AlertCircle, Package } from "lucide-react"
import { useMemo } from "react"

interface InventoryTabProps {
  active: boolean
}

export function InventoryTab({ active }: InventoryTabProps) {
  const phrase = usePhrase()
  const userId = useUserId()
  const { inventory, isLoading, isError, capturedAt } = useInventory(userId)
  const { managedSet, updateManagedGuildBanks } = useManagedGuildBanks()

  const guildBanks = useMemo(() => (inventory ? extractGuildBankKeys(inventory) : []), [inventory])

  const state = resolveGuildBankListState({
    isLoading,
    isError,
    hasReading: capturedAt !== null,
    hasInventory: inventory !== null,
    guildBankCount: guildBanks.length,
  })

  if (!active) return null

  function handleToggle(key: string, checked: boolean) {
    const next = checked ? [...managedSet, key] : [...managedSet].filter((k) => k !== key)
    updateManagedGuildBanks(next)
  }

  return (
    <ResponsiveColumns>
      <InputPanelCard id="managed-guild-banks" title={phrase(inventoryTabManagedGuildBanks.slug)}>
        {state === "ready" ? (
          guildBanks.map((gb) => (
            <InputPanelCard.Row key={gb.key} label={gb.displayName}>
              <div className="flex h-9 items-center">
                <Switch
                  checked={managedSet.has(gb.key)}
                  onCheckedChange={(checked) => handleToggle(gb.key, checked)}
                />
              </div>
            </InputPanelCard.Row>
          ))
        ) : (
          <GuildBankListPlaceholder state={state} />
        )}
      </InputPanelCard>
    </ResponsiveColumns>
  )
}

function GuildBankListPlaceholder({ state }: { state: Exclude<GuildBankListState, "ready"> }) {
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  switch (state) {
    case "loading":
      return (
        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )
    case "load-failed":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>{phrase(inventoryTabLoadFailed.slug)}</EmptyTitle>
            <EmptyDescription>{phraseDescription(inventoryTabLoadFailed.slug)}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    case "data-unreadable":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>{phrase(inventoryTabDataUnreadable.slug)}</EmptyTitle>
            <EmptyDescription>
              {phraseDescription(inventoryTabDataUnreadable.slug)}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    case "no-inventory-data":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>{phrase(inventoryTabNoInventoryData.slug)}</EmptyTitle>
            <EmptyDescription>
              {phraseDescription(inventoryTabNoInventoryData.slug)}{" "}
              <LayoutLink href="/watcher" className="text-accent hover:underline">
                {phrase(inventoryTabWatcher.slug)}
              </LayoutLink>
              .
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    case "no-guild-banks":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>{phrase(inventoryTabNoGuildBanks.slug)}</EmptyTitle>
            <EmptyDescription>{phraseDescription(inventoryTabNoGuildBanks.slug)}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    default:
      return assertNever(state)
  }
}
