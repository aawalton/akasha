import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { simplePageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Suspense } from "react"
import { HomePageContent } from "@/components/home/home-page-content"

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
