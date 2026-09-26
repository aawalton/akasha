import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { CompletionPageContent } from "akasha/temper/web/modules/completion-page-content/completion-page-content.module.code.tsx"
import { SetCatalogGate } from "akasha/temper/web/modules/set-catalog-gate/set-catalog-gate.module.code.tsx"
import { tabDefaultFor } from "akasha/temper/web/modules/tab-defaults/tab-defaults.module.code.ts"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Completion" }]
}

export default function CompletionPage() {
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
      <SetCatalogGate fallback={skeleton}>
        {() => (
          <CompletionPageContent
            initialTab={tab}
            initialCharacter={searchParams.get("character") ?? undefined}
            initialCompanion={searchParams.get("companion") ?? undefined}
            initialActivityMode={searchParams.get("activity-mode") ?? undefined}
            initialScrollTo={searchParams.get("scrollTo") ?? undefined}
          />
        )}
      </SetCatalogGate>
    </Suspense>
  )
}
