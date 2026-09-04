import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { Suspense } from "react"
import { HomePageContent } from "../home-page-content/home-page-content.module.code.tsx"

export function meta() {
  return [{ title: "Temper | Home" }]
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 80 })} />}>
      <HomePageContent />
    </Suspense>
  )
}
