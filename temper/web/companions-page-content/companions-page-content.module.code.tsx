"use client"

import { ListContentSkeleton } from "@akasha/design-layout/list-content-skeleton"
import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { listPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { QueryErrorBoundary } from "@akasha/design-patterns/query-error-boundary"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { PageTabsTrigger, Tabs, TabsList } from "@akasha/design-patterns/tabs"
import { useFilterPersistence } from "@akasha/design-patterns/use-filter-persistence"
import { Button } from "@akasha/design-primitives/button"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { ChevronLeft, Gamepad2, Hammer, Search, Trophy } from "lucide-react"
import { Suspense } from "react"
import { CompanionsDataContent } from "../companions-data-content/companions-data-content.module.code.tsx"
import type { SortField } from "../companions-filter-bar/companions-filter-bar.module.code.tsx"
import {
  BASE_ROLES,
  type FilterValues,
  isValidCompanion,
  isValidRoles,
  isValidSortDirection,
  isValidSortField,
  isValidTab,
  isValidTargetArmor,
  isValidTargetCount,
  isValidTargetHealth,
  type TabValue,
} from "../companions-filter-types/companions-filter-types.module.code.ts"
import { NewCompanionButton } from "../new-companion-button/new-companion-button.module.code.tsx"

interface CompanionsPageContentProps {
  userId: string | null
  initialTab?: string
  initialSearch?: string
  initialRole?: string
  initialCompanion?: string
  initialTargetArmor?: string
  initialTargetCount?: string
  initialTargetHealth?: string
  initialSort?: string
  initialSortDirection?: string
  initialRankArmor?: string
  initialRankTargets?: string
  initialRankHealth?: string
}

export function CompanionsPageContent({
  userId,
  initialTab,
  initialSearch,
  initialRole,
  initialCompanion,
  initialTargetArmor,
  initialTargetCount,
  initialTargetHealth,
  initialSort,
  initialSortDirection,
  initialRankArmor,
  initialRankTargets,
  initialRankHealth,
}: CompanionsPageContentProps) {
  const isAuthenticated = userId !== null
  const defaultTab: TabValue = isAuthenticated ? "build" : "browse"

  const { values, deferred, update } = useFilterPersistence<FilterValues>({
    storageKey: "temper:companions:filters",
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
      roles: {
        urlParam: "role",
        defaultValue: [],
        initial: initialRole,
        validate: (raw) => {
          if (typeof raw === "string") {
            const arr = raw.split(",").filter((r) => BASE_ROLES.some((role) => role === r))
            return arr.length > 0 ? arr : undefined
          }
          return isValidRoles(raw) ? raw : undefined
        },
        toParam: (v: readonly string[]) => (v.length > 0 ? v.join(",") : null),
      },
      companion: {
        urlParam: "companion",
        defaultValue: null,
        initial: initialCompanion,
        validate: (raw) => (isValidCompanion(raw) ? raw : undefined),
      },
      targetArmor: {
        urlParam: "armor",
        defaultValue: null,
        initial: initialTargetArmor,
        validate: (raw) => (isValidTargetArmor(raw) ? raw : undefined),
      },
      targetCount: {
        urlParam: "targets",
        defaultValue: null,
        initial: initialTargetCount,
        validate: (raw) => (isValidTargetCount(raw) ? raw : undefined),
      },
      targetHealth: {
        urlParam: "health",
        defaultValue: null,
        initial: initialTargetHealth,
        validate: (raw) => (isValidTargetHealth(raw) ? raw : undefined),
      },
      sortBy: {
        urlParam: "sort",
        defaultValue: "score" satisfies SortField,
        initial: initialSort,
        validate: (raw) => (isValidSortField(raw) ? raw : undefined),
        toParam: (v: SortField) => (v === "score" ? null : v),
      },
      sortDirection: {
        urlParam: "dir",
        defaultValue: "desc" satisfies SortDirection,
        initial: initialSortDirection,
        validate: (raw) => (isValidSortDirection(raw) ? raw : undefined),
        toParam: (v: SortDirection) => (v === "desc" ? null : v),
      },
      leaderboardTargetArmor: {
        urlParam: "rank-armor",
        defaultValue: null,
        initial: initialRankArmor,
        validate: (raw) => (isValidTargetArmor(raw) ? raw : undefined),
      },
      leaderboardTargetCount: {
        urlParam: "rank-targets",
        defaultValue: null,
        initial: initialRankTargets,
        validate: (raw) => (isValidTargetCount(raw) ? raw : undefined),
      },
      leaderboardTargetHealth: {
        urlParam: "rank-health",
        defaultValue: null,
        initial: initialRankHealth,
        validate: (raw) => (isValidTargetHealth(raw) ? raw : undefined),
      },
    },
  })

  const { tab } = values
  const handleTabChange = (value: TabValue) => update({ tab: value })

  return (
    <PageLayout skeleton={listPageSkeleton({ titleWidth: 208, initialTab })}>
      <PageLayout.Header>
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
              <Link href="/home">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <PageTitle>Companion Builds</PageTitle>
          </div>
          {isAuthenticated && <NewCompanionButton />}
        </div>
      </PageLayout.Header>

      <Tabs
        value={tab}
        onValueChange={(v) => {
          if (isValidTab(v)) handleTabChange(v)
        }}
      >
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-4 grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="plan" icon={<Gamepad2 />} label="Plan" />
            <PageTabsTrigger value="build" icon={<Hammer />} label="Build" />
            <PageTabsTrigger value="browse" icon={<Search />} label="Browse" />
            <PageTabsTrigger value="leaderboard" icon={<Trophy />} label="Rank" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <QueryErrorBoundary>
            <Suspense fallback={<ListContentSkeleton />}>
              <CompanionsDataContent
                userId={userId}
                isAuthenticated={isAuthenticated}
                values={values}
                update={update}
                deferred={deferred}
              />
            </Suspense>
          </QueryErrorBoundary>
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
