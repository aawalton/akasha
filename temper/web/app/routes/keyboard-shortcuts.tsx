import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { simplePageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Suspense } from "react"
import { KeyboardShortcutsPageContent } from "@/components/keyboard-shortcuts/keyboard-shortcuts-page-content"

export function meta() {
  return [{ title: "Temper | Keyboard Shortcuts" }]
}

export default function KeyboardShortcutsPage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 224 })} />}>
      <KeyboardShortcutsPageContent />
    </Suspense>
  )
}
