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
import { extractGuildBankKeys } from "akasha/temper/items-core/modules/inventory-guild-bank-filter/inventory-guild-bank-filter.module.code.ts"
import { useInventory } from "akasha/temper/player-inventory-management-ui/modules/hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "akasha/temper/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import {
  type GuildBankListState,
  resolveGuildBankListState,
} from "akasha/temper/web/modules/guild-bank-list-state/guild-bank-list-state.module.code.ts"
import { AlertCircle, Package } from "lucide-react"
import { useMemo } from "react"

interface InventoryTabProps {
  active: boolean
}

export function InventoryTab({ active }: InventoryTabProps) {
  const userId = useUserId()
  const { inventory, isLoading, isError, capturedAt } = useInventory(userId)
  const { managedSet, updateManagedGuildBanks } = useManagedGuildBanks()

  const guildBanks = useMemo(() => (inventory ? extractGuildBankKeys(inventory) : []), [inventory])

  const state = resolveGuildBankListState({
    isLoading,
    isError,
    hasSnapshot: capturedAt !== null,
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
      <InputPanelCard id="managed-guild-banks" title="Managed Guild Banks">
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
            <EmptyTitle>Couldn't load your inventory</EmptyTitle>
            <EmptyDescription>
              Temper could not read your inventory data just now, so it cannot tell which guild
              banks you have. This is a fault on Temper's side — not your game, and not your
              add-ons. Reloading the page will try again.
            </EmptyDescription>
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
            <EmptyTitle>Your inventory data could not be read</EmptyTitle>
            <EmptyDescription>
              Temper has an inventory snapshot for this account but could not reassemble it, so it
              cannot tell which guild banks are in it. The data arrived — reading it is what failed,
              which is Temper's fault rather than your game's. A fresh sync will replace the
              snapshot.
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
            <EmptyTitle>No inventory data yet</EmptyTitle>
            <EmptyDescription>
              Temper has not received any inventory data for this account, so it has nothing to list
              here yet. Inventory reaches Temper through the{" "}
              <LayoutLink href="/watcher" className="text-accent hover:underline">
                Watcher
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
            <EmptyTitle>No guild banks in your inventory data</EmptyTitle>
            <EmptyDescription>
              Your inventory data reached Temper and contains no guild banks. TemperInventory can
              only record a guild bank once you have opened it in game, so a bank you have not
              opened since installing the add-on will not be here yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    default:
      return assertNever(state)
  }
}
