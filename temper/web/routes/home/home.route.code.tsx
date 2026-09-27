import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { HomePageContent } from "akasha/temper/web/modules/home-page-content/home-page-content.module.code.tsx"
import { homeDocumentTitle } from "akasha/temper/web/phrase/pages/home-document-title.temper-web-phrase.ts"
import { Suspense } from "react"

export function meta() {
  return [{ title: homeDocumentTitle.title }]
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 80 })} />}>
      <HomePageContent />
    </Suspense>
  )
}
