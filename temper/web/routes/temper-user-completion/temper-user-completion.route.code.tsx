import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { CompanionCatalogGate } from "akasha/temper/web/modules/companion-catalog-gate/companion-catalog-gate.module.code.tsx"
import { CompletionPageContent } from "akasha/temper/web/modules/completion-page-content/completion-page-content.module.code.tsx"
import { RecipeCatalogGate } from "akasha/temper/web/modules/recipe-catalog-gate/recipe-catalog-gate.module.code.tsx"
import { SetCatalogGate } from "akasha/temper/web/modules/set-catalog-gate/set-catalog-gate.module.code.tsx"
import { tabDefaultFor } from "akasha/temper/web/modules/tab-defaults/tab-defaults.module.code.ts"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Completion" }]
}

export default function CompletionPublicPage({ params }: { params: { userId: string } }) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/completion") ?? "summary"
  const skeleton = (
    <PageLayoutSkeleton
      config={tabbedPageSkeleton({
        initialTab: tab,
        defaultTab: "summary",
        tabs: ["summary", "account", "characters", "companions"],
        titleWidth: 140,
      })}
    />
  )
  return (
    <Suspense fallback={skeleton}>
      <CompanionCatalogGate fallback={skeleton}>
        <RecipeCatalogGate fallback={skeleton}>
          <SetCatalogGate fallback={skeleton}>
            {() => (
              <CompletionPageContent
                viewUserId={params.userId}
                initialTab={tab}
                initialCharacter={searchParams.get("character") ?? undefined}
                initialCompanion={searchParams.get("companion") ?? undefined}
                initialActivityMode={searchParams.get("activity-mode") ?? undefined}
                initialScrollTo={searchParams.get("scrollTo") ?? undefined}
              />
            )}
          </SetCatalogGate>
        </RecipeCatalogGate>
      </CompanionCatalogGate>
    </Suspense>
  )
}
