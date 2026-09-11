import { PageLayoutSkeleton } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { MethodologyPageContent } from "akasha/temper/web/methodology-page-content/methodology-page-content.module.code.tsx"
import { tabDefaultFor } from "akasha/temper/web/tab-defaults/tab-defaults.module.code.ts"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Methodology" }]
}

export default function MethodologyPage() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/methodology") ?? "companion-engine"
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            titleWidth: 160,
            initialTab: tab,
            defaultTab: "companion-engine",
            tabs: ["companion-engine", "known-issues"],
          })}
        />
      }
    >
      <MethodologyPageContent initialTab={tab} />
    </Suspense>
  )
}
