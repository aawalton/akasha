import { PageLayoutSkeleton } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { ImportPageContent } from "akasha/temper/web/import-page-content/import-page-content.module.code.tsx"
import { Suspense } from "react"

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
