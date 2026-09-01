import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { Suspense } from "react"
import { ImportPageContent } from "@/components/import/import-page-content"

export function meta() {
  return [{ title: "Temper | Import" }]
}

export default function ImportPage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 96 })} />}>
      <ImportPageContent />
    </Suspense>
  )
}
