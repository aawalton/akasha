"use client"

import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { Button } from "@shared/design-primitives/components/button"
import { listPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { QueryErrorBoundary } from "@shared/design-patterns/components/query-error-boundary"
import { PageTabsTrigger, Tabs, TabsList } from "@shared/design-patterns/components/tabs"
import { useFilterPersistence } from "@shared/design-patterns/hooks/use-filter-persistence"
import { type SortDirection } from "@shared/design-patterns/utils/sort-types"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import { ChevronLeft, Gamepad2, Hammer, Search, Trophy } from "lucide-react"
import { Suspense } from "react"
import { CharactersDataContent } from "@/components/characters/characters-data-content"
import {
  type FilterValues,
  isValidClass,
  isValidRole,
  isValidSortDirection,
  isValidSortField,
  isValidTab,
  type SortField,
  type TabValue,
} from "@/components/characters/characters-filter-types"
import { NewCharacterButton } from "@/components/characters/new-character-button"

interface CharactersPageContentProps {
  userId: string | null
  initialTab?: string
  initialSearch?: string
  initialRole?: string
  initialClass?: string
  initialSort?: string
  initialSortDirection?: string
}

export function CharactersPageContent({
  userId,
  initialTab,
  initialSearch,
  initialRole,
  initialClass,
  initialSort,
  initialSortDirection,
}: CharactersPageContentProps) {
  const isAuthenticated = userId !== null
  const defaultTab: TabValue = isAuthenticated ? "build" : "browse"

  const { values, deferred, update } = useFilterPersistence<FilterValues>({
    storageKey: "temper:characters:filters",
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: defaultTab,
        initial: initialTab,
        validate: (raw) => (isValidTab(raw) ? raw : undefined),
        toParam: (v: TabValue) => (v === defaultTab ? null : v),
      },
      search: {
        urlParam: "q",
        defaultValue: "",
        initial: initialSearch,
        validate: (raw) => (typeof raw === "string" ? raw : undefined),
      },
      role: {
        urlParam: "role",
        defaultValue: null,
        initial: initialRole,
        validate: (raw) => (isValidRole(raw) ? raw : undefined),
      },
      class: {
        urlParam: "class",
        defaultValue: null,
        initial: initialClass,
        validate: (raw) => (isValidClass(raw) ? raw : undefined),
      },
      sortBy: {
        urlParam: "sort",
        defaultValue: "updated" satisfies SortField,
        initial: initialSort,
        validate: (raw) => (isValidSortField(raw) ? raw : undefined),
        toParam: (v: SortField) => (v === "updated" ? null : v),
      },
      sortDirection: {
        urlParam: "dir",
        defaultValue: "desc" satisfies SortDirection,
        initial: initialSortDirection,
        validate: (raw) => (isValidSortDirection(raw) ? raw : undefined),
        toParam: (v: SortDirection) => (v === "desc" ? null : v),
      },
    },
  })

  const { tab } = values

  const handleTabChange = (value: TabValue) => update({ tab: value })

  return (
    <PageLayout skeleton={listPageSkeleton({ titleWidth: 112, initialTab })}>
      <PageLayout.Header>
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
              <Link href="/home">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <PageTitle>Character Builds</PageTitle>
          </div>
          {isAuthenticated && <NewCharacterButton />}
        </div>
      </PageLayout.Header>

      <PageLayout.Tabs>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            if (isValidTab(v)) handleTabChange(v)
          }}
        >
          <TabsList className="grid h-18 w-full grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="plan" icon={<Gamepad2 />} label="Plan" />
            <PageTabsTrigger value="build" icon={<Hammer />} label="Build" />
            <PageTabsTrigger value="browse" icon={<Search />} label="Browse" />
            <PageTabsTrigger value="leaderboard" icon={<Trophy />} label="Rank" />
          </TabsList>
        </Tabs>
      </PageLayout.Tabs>

      <PageLayout.Content>
        <QueryErrorBoundary>
          <Suspense fallback={<ListContentSkeleton />}>
            <CharactersDataContent
              userId={userId}
              isAuthenticated={isAuthenticated}
              tab={tab}
              search={values.search}
              selectedRole={values.role}
              selectedClass={values.class}
              sortBy={values.sortBy}
              sortDirection={values.sortDirection}
              update={update}
              deferred={deferred}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageLayout.Content>
    </PageLayout>
  )
}
