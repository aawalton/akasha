import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { MethodologyPageContent } from "../methodology-page-content/methodology-page-content.module.code.tsx"
import { tabDefaultFor } from "../tab-defaults/tab-defaults.module.code.ts"

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
