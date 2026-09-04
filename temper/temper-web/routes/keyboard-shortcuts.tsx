import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { Suspense } from "react"
import { KeyboardShortcutsPageContent } from "../keyboard-shortcuts-page-content/keyboard-shortcuts-page-content.module.code.tsx"

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
