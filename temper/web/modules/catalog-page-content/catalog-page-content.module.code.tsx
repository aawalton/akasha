"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  PageTabsTrigger,
  Tabs,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { useFilterPersistence } from "akasha/design/interface/pattern/modules/use-filter-persistence/use-filter-persistence.module.code.ts"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import {
  DungeonsTab,
  useDungeonListings,
} from "akasha/temper/web/modules/dungeons-tab/dungeons-tab.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { catalogPageContentDungeons } from "akasha/temper/web/phrase/pages/catalog-page-content-dungeons.temper-web-phrase.ts"
import { catalogPageContentTitle } from "akasha/temper/web/phrase/pages/catalog-page-content-title.temper-web-phrase.ts"
import { ChevronLeft, Swords } from "lucide-react"

const VALID_TABS = new Set(["dungeons"])

type FilterValues = {
  tab: string
}

interface CatalogPageContentProps {
  initialTab?: string
}

export function CatalogPageContent({ initialTab }: CatalogPageContentProps) {
  const { values, update } = useFilterPersistence<FilterValues>({
    storageKey: "temper:catalog:filters",
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: "dungeons",
        initial: initialTab,
        validate: (raw) => (typeof raw === "string" && VALID_TABS.has(raw) ? raw : undefined),
        toParam: (v) => (v === "dungeons" ? null : v),
      },
    },
  })
  const { givers, dungeons, isLoading } = useDungeonListings()
  const phrase = usePhrase()

  return (
    <PageLayout
      loading={isLoading}
      skeleton={tabbedPageSkeleton({
        titleWidth: 108,
        initialTab,
        defaultTab: "dungeons",
        tabs: ["dungeons"],
      })}
    >
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
            <Link href="/home">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <PageTitle>{phrase(catalogPageContentTitle.slug)}</PageTitle>
        </div>
      </PageLayout.Header>

      <Tabs value={values.tab} onValueChange={(v) => update({ tab: v })}>
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-1 grid-cols-1 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger
              value="dungeons"
              icon={<Swords />}
              label={phrase(catalogPageContentDungeons.slug)}
            />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <DungeonsTab givers={givers} dungeons={dungeons} />
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
