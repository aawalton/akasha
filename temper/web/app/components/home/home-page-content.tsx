"use client"

import { useAuth } from "@shared/auth/use-auth"
import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Button } from "@shared/design-primitives/components/button"
import { simplePageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { QueryErrorBoundary } from "@shared/design-patterns/components/query-error-boundary"
import { StatRow } from "@shared/design-patterns/components/stat-row"
import { PagesUILink as Link, usePagesUIRouter } from "@shared/pages-ui/router-context"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "@temper/game-characters/build-metadata"
import { useCharacterList } from "@temper/game-characters-character-ui/use-characters"
import { decodeBuild } from "@temper/game-codec/character/build-codec"
import { decodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { useCompanionList } from "@temper/game-companions-ui/use-companions"
import { groupInventoryByType } from "@temper/game-items-core/inventory-grouping"
import { partitionUnmanagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-filter"
import { useCompletionCharacters } from "@temper/player-completion-ui/use-completion"
import { useInventory, useNetWorthHistory } from "@temper/player-inventory-management-ui/hooks-inventory"
import { useManagedGuildBanks } from "@temper/player-inventory-management-ui/hooks-inventory-settings"
import { InventoryScopeNote } from "@temper/player-inventory-management-ui/inventory-scope-note"
import { InventoryTypeSummaryPanelCard } from "@temper/player-inventory-management-ui/inventory-summary-panel-card"
import { NetWorthBasisNote } from "@temper/player-inventory-management-ui/net-worth-basis-note"
import { formatPeriodAmount, formatPeriodComparedAt, formatPeriodPercent, NET_WORTH_PERIOD_UNMEASURED_TEXT, type NetWorthPeriodReading, readNetWorthPeriods } from "@temper/player-inventory-management-ui/net-worth-periods"
import { NetWorthPricingNote } from "@temper/player-inventory-management-ui/net-worth-pricing-note"
import { resolvePricingSourceNote } from "@temper/player-inventory-management-ui/pricing-source"
import { PricingSourceNote } from "@temper/player-inventory-management-ui/pricing-source-note"
import { BuildHash } from "@temper/shared-formula-framework/branded"
import { Gamepad2 } from "lucide-react"
import { type ReactNode, Suspense, useMemo } from "react"
import { OverallSummaryPanelCard } from "@/components/completion/overall-summary-panel-card"
import { useCompletionProgress } from "@/components/completion/use-completion-progress"
import { RecentCharactersCard } from "@/components/home/recent-characters-card"
import { RecentCompanionsCard } from "@/components/home/recent-companions-card"

const RECENT_BUILD_COUNT = 5

function HomeCompletionCard() {
  const router = usePagesUIRouter()
  const { accountSummary, characterSummary, companionSummary } = useCompletionProgress(undefined)
  return (
    <OverallSummaryPanelCard
      title={
        <Link href="/completion" className="hover:text-accent">
          Completion
        </Link>
      }
      accountSummary={accountSummary}
      characterSummary={characterSummary}
      companionSummary={companionSummary}
      onItemClick={(key) => router.push(key === "total" ? "/completion" : `/completion?tab=${key}`)}
      subdued
    />
  )
}

function HomeInventoryCard() {
  const { userId } = useAuth()
  const { inventory: rawInventory, isLoading } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()
  const { inventory, excluded } = useMemo(
    () =>
      rawInventory
        ? partitionUnmanagedGuildBanks(rawInventory, managedSet)
        : { inventory: null, excluded: [] },
    [rawInventory, managedSet]
  )
  const typeSummary = useMemo(
    () => (inventory ? groupInventoryByType(inventory) : null),
    [inventory]
  )
  const router = usePagesUIRouter()
  if (isLoading) return <ListContentSkeleton showTabTitle={false} />
  if (!typeSummary) return null
  return (
    <InventoryTypeSummaryPanelCard
      title={
        <Link href="/inventory" className="hover:text-accent">
          Inventory
        </Link>
      }
      summary={typeSummary}
      onItemClick={() => router.push("/inventory?tab=type")}
      scopeNote={<InventoryScopeNote excluded={excluded} includesCurrencies={false} />}
      subdued
    />
  )
}

function netWorthToneClass(diff: number): string {
  if (diff > 0) return "text-jade"
  if (diff < 0) return "text-orange"
  return "text-secondary"
}

function periodLabel(reading: NetWorthPeriodReading): ReactNode {
  if (reading.state === "unmeasured") return reading.label
  const percent = formatPeriodPercent(reading.percent)
  return (
    <span>
      {reading.label}
      {percent !== null && (
        <span className={`font-mono ${netWorthToneClass(reading.diff)}`}> {percent}</span>
      )}
      {!reading.onHorizon && (
        <span className="text-tertiary"> {formatPeriodComparedAt(reading.comparedAt)}</span>
      )}
    </span>
  )
}

function periodValue(reading: NetWorthPeriodReading): ReactNode {
  if (reading.state === "unmeasured") {
    return <span className="text-tertiary">{NET_WORTH_PERIOD_UNMEASURED_TEXT}</span>
  }
  return <span className={netWorthToneClass(reading.diff)}>{formatPeriodAmount(reading.diff)}</span>
}

function HomeNetWorthCard() {
  const { userId } = useAuth()
  const { history, guildBankBasisChange, isLoading } = useNetWorthHistory(userId)
  const { inventory, isLoading: inventoryLoading } = useInventory(userId)
  const router = usePagesUIRouter()

  const periods = useMemo(() => readNetWorthPeriods(history), [history])
  const latest = history.at(-1)

  if (isLoading) return <ListContentSkeleton showTabTitle={false} />
  if (!latest) return null

  return (
    <PanelCard
      id="home-net-worth"
      collapsible
      title={
        <Link href="/inventory?tab=trends" className="hover:text-accent">
          Net Worth
        </Link>
      }
    >
      <div className="flex flex-col gap-1.5">
        <StatRow
          label="Net Worth"
          value={formatGold(latest.netWorth)}
          useAccentColor
          onClick={() => router.push("/inventory?tab=trends")}
        />
        {periods.map((reading) => (
          <StatRow
            key={reading.label}
            label={periodLabel(reading)}
            value={periodValue(reading)}
            onClick={() => router.push("/inventory?tab=trends")}
          />
        ))}
        {guildBankBasisChange && <NetWorthBasisNote change={guildBankBasisChange} />}
        <NetWorthPricingNote />
        <PricingSourceNote
          kind={resolvePricingSourceNote({
            inventory: inventory ?? null,
            isSettled: !inventoryLoading,
          })}
        />
      </div>
    </PanelCard>
  )
}

export function HomePageContent() {
  return (
    <PageLayout skeleton={simplePageSkeleton({ titleWidth: 80 })}>
      <PageLayout.Header>
        <PageTitle>Home</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <QueryErrorBoundary>
          <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
            <HomeDataContent />
          </Suspense>
        </QueryErrorBoundary>
      </PageLayout.Content>
    </PageLayout>
  )
}

function HomeGetStartedCard() {
  return (
    <PanelCard id="home-get-started" title="Get Started">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Gamepad2 />
          </EmptyMedia>
          <EmptyTitle>Bring your ESO characters in</EmptyTitle>
          <EmptyDescription>
            Temper plans around your own characters, gear, and inventory. Start here to see what
            connecting them involves.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/watcher">Get Started</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </PanelCard>
  )
}

function HomeDataContent() {
  const { builds: characters, isLoading: charactersLoading } = useCharacterList()
  const { builds: companions, isLoading: companionsLoading } = useCompanionList()
  const { characters: importedCharacters, isLoading: importedLoading } = useCompletionCharacters()

  const decodedCharacters = useMemo(() => {
    return characters.slice(0, RECENT_BUILD_COUNT).map((build) => {
      const metadata = build.buildMetadata
      const decoded = build.buildHash !== "" ? decodeBuild(BuildHash(build.buildHash)) : null
      const buildData = decoded && metadata ? applyCharacterMetadata(decoded, metadata) : null
      return {
        id: build.id,
        name: metadata?.name ?? "",
        buildData,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt,
      }
    })
  }, [characters])

  const decodedCompanions = useMemo(() => {
    return companions.slice(0, RECENT_BUILD_COUNT).map((build) => {
      const metadata = build.buildMetadata
      const decoded = build.buildHash !== "" ? decodeCompanion(BuildHash(build.buildHash)) : null
      const buildData = decoded && metadata ? applyCompanionMetadata(decoded, metadata) : null
      return {
        id: build.id,
        name: metadata?.name ?? "",
        buildData,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt,
      }
    })
  }, [companions])

  if (charactersLoading || companionsLoading || importedLoading) {
    return <ListContentSkeleton showTabTitle={false} />
  }

  return (
    <ResponsiveColumns>
      {importedCharacters.length === 0 && <HomeGetStartedCard />}
      <RecentCharactersCard builds={decodedCharacters} />
      <RecentCompanionsCard builds={decodedCompanions} />
      <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
        <HomeCompletionCard />
      </Suspense>
      <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
        <HomeInventoryCard />
      </Suspense>
      <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
        <HomeNetWorthCard />
      </Suspense>
    </ResponsiveColumns>
  )
}
