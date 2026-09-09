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
import { decodeBuild } from "akasha/temper/build-codec/build-codec/build-codec.module.code.ts"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "akasha/temper/build-metadata/build-metadata/build-metadata.module.code.ts"
import { decodeCompanion } from "akasha/temper/companion-codec/companion-codec/companion-codec.module.code.ts"
import { useCharacterList } from "akasha/temper/temper-characters-character-ui/use-characters/use-characters.module.code.ts"
import { useCompanionList } from "akasha/temper/temper-companions-ui/use-companions/use-companions.module.code.ts"
import { groupInventoryByType } from "akasha/temper/temper-items-core/inventory-grouping/inventory-grouping.module.code.ts"
import { partitionUnmanagedGuildBanks } from "akasha/temper/temper-items-core/inventory-guild-bank-filter/inventory-guild-bank-filter.module.code.ts"
import { useCompletionCharacters } from "akasha/temper/temper-player-completion-ui/use-completion/use-completion.module.code.ts"
import { useInventory } from "akasha/temper/temper-player-inventory-management-ui/hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "akasha/temper/temper-player-inventory-management-ui/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { InventoryScopeNote } from "akasha/temper/temper-player-inventory-management-ui/inventory-scope-note/inventory-scope-note.module.code.tsx"
import { InventoryTypeSummaryPanelCard } from "akasha/temper/temper-player-inventory-management-ui/inventory-summary-panel-card/inventory-summary-panel-card.module.code.tsx"
import { Gamepad2 } from "lucide-react"
import { Suspense, useMemo } from "react"
import { buildHash as toBuildHash } from "../../formula-framework/branded-id/branded-id.module.code.ts"
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
