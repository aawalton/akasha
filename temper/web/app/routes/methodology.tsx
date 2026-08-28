import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { MethodologyPageContent } from "@/components/methodology/methodology-page-content"
import { tabDefaultFor } from "~/lib/tab-defaults"

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
