"use client"

import { ListContentSkeleton } from "@akasha/design-layout/list-content-skeleton"
import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { QueryErrorBoundary } from "@akasha/design-patterns/query-error-boundary"
import { Button } from "@akasha/design-primitives/button"
import { PagesUILink as Link, usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { decodeBuild } from "@akasha/temper-build-codec/build-codec"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import { useCharacterList } from "@akasha/temper-characters-character-ui/use-characters"
import { decodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import { useCompanionList } from "@akasha/temper-companions-ui/use-companions"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import { groupInventoryByType } from "@akasha/temper-items-core/inventory-grouping"
import { partitionUnmanagedGuildBanks } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import { useCompletionCharacters } from "@akasha/temper-player-completion-ui/use-completion"
import { useInventory } from "@akasha/temper-player-inventory-management-ui/hooks-inventory"
import { useManagedGuildBanks } from "@akasha/temper-player-inventory-management-ui/hooks-inventory-settings"
import { InventoryScopeNote } from "@akasha/temper-player-inventory-management-ui/inventory-scope-note"
import { InventoryTypeSummaryPanelCard } from "@akasha/temper-player-inventory-management-ui/inventory-summary-panel-card"
import { Gamepad2 } from "lucide-react"
import { Suspense, useMemo } from "react"
import { OverallSummaryPanelCard } from "../overall-summary-panel-card/overall-summary-panel-card.module.code.tsx"
import { RecentCharactersCard } from "../recent-characters-card/recent-characters-card.module.code.tsx"
import { RecentCompanionsCard } from "../recent-companions-card/recent-companions-card.module.code.tsx"
import { useCompletionProgress } from "../use-completion-progress/use-completion-progress.module.code.ts"

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
  const userId = useUserId()
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
      const decoded = build.buildHash !== "" ? decodeBuild(toBuildHash(build.buildHash)) : null
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
      const decoded = build.buildHash !== "" ? decodeCompanion(toBuildHash(build.buildHash)) : null
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
    </ResponsiveColumns>
  )
}
