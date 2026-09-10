import { PageLayoutSkeleton } from "akasha/design/layout/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { Suspense } from "react"
import { ImportPageContent } from "../../import-page-content/import-page-content.module.code.tsx"

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
