import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { simplePageSkeleton } from "@shared/design-layout/components/skeleton-presets"
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
