"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import {
  PageTabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import type { DrawnSection } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { methodologyPanels } from "akasha/temper/web/modules/companion-engine-methodology/companion-engine-methodology.module.code.tsx"
import { KNOWN_ISSUES_METHODOLOGY_PANELS } from "akasha/temper/web/modules/known-issues-methodology/known-issues-methodology.module.code.tsx"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { methodologyPageContentCompanionEngine } from "akasha/temper/web/phrase/pages/methodology-page-content-companion-engine.temper-web-phrase.ts"
import { methodologyPageContentKnownIssues } from "akasha/temper/web/phrase/pages/methodology-page-content-known-issues.temper-web-phrase.ts"
import { methodologyPageContentNoKnownIssues } from "akasha/temper/web/phrase/pages/methodology-page-content-no-known-issues.temper-web-phrase.ts"
import { methodologyPageContentTitle } from "akasha/temper/web/phrase/pages/methodology-page-content-title.temper-web-phrase.ts"
import { ChevronLeft, FlaskConical, TriangleAlert } from "lucide-react"

interface MethodologyPageContentProps {
  initialTab?: string
  sections: readonly DrawnSection[]
}

export function MethodologyPageContent({ initialTab, sections }: MethodologyPageContentProps) {
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  const companionEngine = phrase(methodologyPageContentCompanionEngine.slug)
  const knownIssues = phrase(methodologyPageContentKnownIssues.slug)
  return (
    <PageLayout
      skeleton={tabbedPageSkeleton({
        titleWidth: 160,
        initialTab,
        defaultTab: "companion-engine",
        tabs: ["companion-engine", "known-issues"],
      })}
    >
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
            <Link href="/home">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <PageTitle>{phrase(methodologyPageContentTitle.slug)}</PageTitle>
        </div>
      </PageLayout.Header>

      <Tabs
        defaultValue={initialTab ?? "companion-engine"}
        syncUrl
        syncStorage="temper:methodology:tab"
      >
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-2 grid-cols-2 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger
              value="companion-engine"
              icon={<FlaskConical />}
              label={companionEngine}
            />
            <PageTabsTrigger value="known-issues" icon={<TriangleAlert />} label={knownIssues} />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <TabsContent value="companion-engine">
            <div className="flex flex-col gap-6">
              <PageTabHeader title={companionEngine} />
              <ResponsiveColumns>{methodologyPanels(sections)}</ResponsiveColumns>
            </div>
          </TabsContent>
          <TabsContent value="known-issues">
            <div className="flex flex-col gap-6">
              <PageTabHeader title={knownIssues} />
              {KNOWN_ISSUES_METHODOLOGY_PANELS.length > 0 ? (
                <ResponsiveColumns>{KNOWN_ISSUES_METHODOLOGY_PANELS}</ResponsiveColumns>
              ) : (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <TriangleAlert />
                    </EmptyMedia>
                    <EmptyTitle>{phrase(methodologyPageContentNoKnownIssues.slug)}</EmptyTitle>
                    <EmptyDescription>
                      {phraseDescription(methodologyPageContentNoKnownIssues.slug)}
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </div>
          </TabsContent>
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
