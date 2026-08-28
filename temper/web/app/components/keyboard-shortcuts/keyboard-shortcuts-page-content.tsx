"use client"

import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Button } from "@shared/design-primitives/components/button"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { shortcutGroups } from "@/components/keyboard-shortcuts/keyboard-shortcuts-data"
import { ShortcutSectionCard } from "@/components/keyboard-shortcuts/shortcut-section-card"

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
          {shortcutGroups.map((group) => (
            <ShortcutSectionCard key={group.title} group={group} isMac={isMac} />
          ))}
        </ResponsiveColumns>
      </PageLayout.Content>
    </PageLayout>
  )
}
