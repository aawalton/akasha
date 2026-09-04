"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { PageTabsTrigger, Tabs, TabsContent, TabsList } from "@akasha/design-patterns/tabs"
import { Button } from "@akasha/design-primitives/button"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { ChevronLeft, FlaskConical, TriangleAlert } from "lucide-react"
import { COMPANION_ENGINE_METHODOLOGY_PANELS } from "../companion-engine-methodology/companion-engine-methodology.module.code.tsx"
import { KNOWN_ISSUES_METHODOLOGY_PANELS } from "../known-issues-methodology/known-issues-methodology.module.code.tsx"

interface MethodologyPageContentProps {
  initialTab?: string
}

export function MethodologyPageContent({ initialTab }: MethodologyPageContentProps) {
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
          <PageTitle>Methodology</PageTitle>
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
              label="Companion Engine"
            />
            <PageTabsTrigger value="known-issues" icon={<TriangleAlert />} label="Known Issues" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <TabsContent value="companion-engine">
            <div className="flex flex-col gap-6">
              <PageTabHeader title="Companion Engine" />
              <ResponsiveColumns>{COMPANION_ENGINE_METHODOLOGY_PANELS}</ResponsiveColumns>
            </div>
          </TabsContent>
          <TabsContent value="known-issues">
            <div className="flex flex-col gap-6">
              <PageTabHeader title="Known Issues" />
              {KNOWN_ISSUES_METHODOLOGY_PANELS.length > 0 ? (
                <ResponsiveColumns>{KNOWN_ISSUES_METHODOLOGY_PANELS}</ResponsiveColumns>
              ) : (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <TriangleAlert />
                    </EmptyMedia>
                    <EmptyTitle>Temper does not publish a known-issues list yet</EmptyTitle>
                    <EmptyDescription>
                      This tab is empty because nothing has been written into it, not because Temper
                      checked and found nothing. Read the blank list as "not published here" rather
                      than "nothing is wrong."
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
