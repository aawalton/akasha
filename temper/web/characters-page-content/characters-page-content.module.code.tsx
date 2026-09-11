"use client"

import { ListContentSkeleton } from "akasha/design/interfaces/layout/list-content-skeleton/list-content-skeleton.module.code.tsx"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { listPageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { QueryErrorBoundary } from "akasha/design/interfaces/patterns/query-error-boundary/query-error-boundary.module.code.tsx"
import type { SortDirection } from "akasha/design/interfaces/patterns/sort-types/sort-types.module.code.ts"
import {
  PageTabsTrigger,
  Tabs,
  TabsList,
} from "akasha/design/interfaces/patterns/tabs/tabs.module.code.tsx"
import { useFilterPersistence } from "akasha/design/interfaces/patterns/use-filter-persistence/use-filter-persistence.module.code.ts"
import { Button } from "akasha/design/interfaces/primitives/button/button.module.code.tsx"
import { PagesUILink as Link } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import {
  isValidTab,
  type TabValue,
} from "akasha/temper/web/build-page-tab/build-page-tab.module.code.ts"
import { CharactersDataContent } from "akasha/temper/web/characters-data-content/characters-data-content.module.code.tsx"
import {
  type FilterValues,
  isValidClass,
  isValidRole,
  isValidSortField,
  type SortField,
} from "akasha/temper/web/characters-filter-types/characters-filter-types.module.code.ts"
import { NewCharacterButton } from "akasha/temper/web/new-character-button/new-character-button.module.code.tsx"
import { isSortDirection } from "akasha/utils/narrow/is-sort-direction/is-sort-direction.module.code.ts"
import { ChevronLeft, Gamepad2, Hammer, Search, Trophy } from "lucide-react"
import { Suspense } from "react"

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
        validate: (raw) => (isSortDirection(raw) ? raw : undefined),
        toParam: (v: SortDirection) => (v === "desc" ? null : v),
      },
    },
  })

  const { tab } = values

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
            if (isValidTab(v)) update({ tab: v })
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
