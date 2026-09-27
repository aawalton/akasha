import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { CompanionCatalogGate } from "akasha/temper/web/modules/companion-catalog-gate/companion-catalog-gate.module.code.tsx"
import { ImportPageContent } from "akasha/temper/web/modules/import-page-content/import-page-content.module.code.tsx"
import { dataImportDocumentTitle } from "akasha/temper/web/phrase/pages/data-import-document-title.temper-web-phrase.ts"
import { Suspense } from "react"

export function meta() {
  return [{ title: dataImportDocumentTitle.title }]
}

export default function ImportPage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 96 })} />}>
      <CompanionCatalogGate
        fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 96 })} />}
      >
        {() => <ImportPageContent />}
      </CompanionCatalogGate>
    </Suspense>
  )
}
