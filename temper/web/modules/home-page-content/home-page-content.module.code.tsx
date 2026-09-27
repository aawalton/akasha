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
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { heldSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { buildHash as toBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { heldSkillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { useCharacterList } from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { useCompanionList } from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
} from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { CompanionCatalogGate } from "akasha/temper/web/modules/companion-catalog-gate/companion-catalog-gate.module.code.tsx"
import { RecentCharactersCard } from "akasha/temper/web/modules/recent-characters-card/recent-characters-card.module.code.tsx"
import { RecentCompanionsCard } from "akasha/temper/web/modules/recent-companions-card/recent-companions-card.module.code.tsx"
import { SetCatalogGate } from "akasha/temper/web/modules/set-catalog-gate/set-catalog-gate.module.code.tsx"
import { SkillCatalogGate } from "akasha/temper/web/modules/skill-catalog-gate/skill-catalog-gate.module.code.tsx"
import { TemperQueryErrorBoundary } from "akasha/temper/web/modules/temper-query-error-boundary/temper-query-error-boundary.module.code.tsx"
import { useHeldCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { homePageContentBringCharacters } from "akasha/temper/web/phrase/pages/home-page-content-bring-characters.temper-web-phrase.ts"
import { homePageContentGetStarted } from "akasha/temper/web/phrase/pages/home-page-content-get-started.temper-web-phrase.ts"
import { homePageContentPlansAround } from "akasha/temper/web/phrase/pages/home-page-content-plans-around.temper-web-phrase.ts"
import { homePageContentTitle } from "akasha/temper/web/phrase/pages/home-page-content-title.temper-web-phrase.ts"
import { useCompletionCharacters } from "akasha/temper/web/player-completion-ui/modules/use-completion/use-completion.module.code.ts"
import { Gamepad2 } from "lucide-react"
import { Suspense, useMemo } from "react"

const RECENT_BUILD_COUNT = 5

export function HomePageContent() {
  const phrase = usePhrase()
  return (
    <PageLayout skeleton={simplePageSkeleton({ titleWidth: 80 })}>
      <PageLayout.Header>
        <PageTitle>{phrase(homePageContentTitle.slug)}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <TemperQueryErrorBoundary>
          <Suspense fallback={<ListContentSkeleton showTabTitle={false} />}>
            <CompanionCatalogGate fallback={<ListContentSkeleton showTabTitle={false} />}>
              {() => (
                <SkillCatalogGate fallback={<ListContentSkeleton showTabTitle={false} />}>
                  {() => (
                    <SetCatalogGate fallback={<ListContentSkeleton showTabTitle={false} />}>
                      {() => <HomeDataContent />}
                    </SetCatalogGate>
                  )}
                </SkillCatalogGate>
              )}
            </CompanionCatalogGate>
          </Suspense>
        </TemperQueryErrorBoundary>
      </PageLayout.Content>
    </PageLayout>
  )
}

function HomeGetStartedCard() {
  const phrase = usePhrase()
  return (
    <PanelCard id="home-get-started" title={phrase(homePageContentGetStarted.slug)}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Gamepad2 />
          </EmptyMedia>
          <EmptyTitle>{phrase(homePageContentBringCharacters.slug)}</EmptyTitle>
          <EmptyDescription>{phrase(homePageContentPlansAround.slug)}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/watcher">{phrase(homePageContentGetStarted.slug)}</Link>
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
  const skillCatalogRead = heldSkillCatalog()
  const setCatalogRead = heldSetCatalog()
  const companionCatalogRead = useHeldCompanionCatalog()

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
  }, [characters, skillCatalogRead, setCatalogRead])

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
  }, [companions, companionCatalogRead])

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
