import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { KeyboardShortcutsPageContent } from "akasha/temper/web/modules/keyboard-shortcuts-page-content/keyboard-shortcuts-page-content.module.code.tsx"
import { keyboardShortcutsDocumentTitle } from "akasha/temper/web/phrase/pages/keyboard-shortcuts-document-title.temper-web-phrase.ts"
import { Suspense } from "react"

export function meta() {
  return [{ title: keyboardShortcutsDocumentTitle.title }]
}

export default function KeyboardShortcutsPage() {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 224 })} />}>
      <KeyboardShortcutsPageContent />
    </Suspense>
  )
}
