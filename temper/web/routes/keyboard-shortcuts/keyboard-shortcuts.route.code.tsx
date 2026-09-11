import { PageLayoutSkeleton } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { KeyboardShortcutsPageContent } from "akasha/temper/web/keyboard-shortcuts-page-content/keyboard-shortcuts-page-content.module.code.tsx"
import { Suspense } from "react"

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
