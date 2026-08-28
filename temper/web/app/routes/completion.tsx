import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { CompletionPageContent } from "@/components/completion/completion-page-content"
import { tabDefaultFor } from "~/lib/tab-defaults"

export function meta() {
  return [{ title: "Temper | Completion" }]
}

export default function CompletionPage() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/completion") ?? "summary"
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            initialTab: tab,
            defaultTab: "summary",
            tabs: ["summary", "account", "characters", "companions"],
            titleWidth: 140,
          })}
        />
      }
    >
      <CompletionPageContent
        initialTab={tab}
        initialCharacter={searchParams.get("character") ?? undefined}
        initialCompanion={searchParams.get("companion") ?? undefined}
        initialActivityMode={searchParams.get("activity-mode") ?? undefined}
        initialScrollTo={searchParams.get("scrollTo") ?? undefined}
      />
    </Suspense>
  )
}
