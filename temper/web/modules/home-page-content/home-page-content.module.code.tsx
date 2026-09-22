"use client"

import { ListContentSkeleton } from "akasha/design/interface/layout/modules/list-content-skeleton/list-content-skeleton.module.code.tsx"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { QueryErrorBoundary } from "akasha/design/interface/pattern/modules/query-error-boundary/query-error-boundary.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { buildHash as toBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { useCharacterList } from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { useCompanionList } from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { RecentCharactersCard } from "akasha/temper/web/modules/recent-characters-card/recent-characters-card.module.code.tsx"
import { RecentCompanionsCard } from "akasha/temper/web/modules/recent-companions-card/recent-companions-card.module.code.tsx"
import { useCompletionCharacters } from "akasha/temper/web/player-completion-ui/modules/use-completion/use-completion.module.code.ts"
import { Gamepad2 } from "lucide-react"
import { Suspense, useMemo } from "react"

const RECENT_BUILD_COUNT = 5

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
    </ResponsiveColumns>
  )
}
