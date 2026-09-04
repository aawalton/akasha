"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { Button } from "@akasha/design-primitives/button"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { SHORTCUT_GROUPS } from "../keyboard-shortcuts-data/keyboard-shortcuts-data.module.code.ts"
import { ShortcutSectionCard } from "../shortcut-section-card/shortcut-section-card.module.code.tsx"

export function KeyboardShortcutsPageContent() {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform))
  }, [])

  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex items-center gap-4">
          <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
            <Link href="/home">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <PageTitle>Keyboard Shortcuts</PageTitle>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        <ResponsiveColumns>
          {SHORTCUT_GROUPS.map((group) => (
            <ShortcutSectionCard key={group.title} group={group} isMac={isMac} />
          ))}
        </ResponsiveColumns>
      </PageLayout.Content>
    </PageLayout>
  )
}
