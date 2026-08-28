"use client"

import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { LayoutLink } from "@shared/design-layout/router-context"
import { Button } from "@shared/design-primitives/components/button"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { FolderOpen } from "lucide-react"

export function CompletionPageOwnEmpty() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <PageTitle>Completion</PageTitle>
        </div>
      </PageLayout.Header>
      <PageLayout.Content>
        <Card>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderOpen />
                </EmptyMedia>
                <EmptyTitle>No completion data yet</EmptyTitle>
                <EmptyDescription>
                  Bring in your ESO progress and it fills in here across every character and
                  companion. Install the Watcher to sync automatically on Windows, or import a save
                  manually on any OS.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="accent" asChild>
                  <LayoutLink href="/watcher">Install the Watcher</LayoutLink>
                </Button>
                <Button variant="secondary" asChild>
                  <LayoutLink href="/import">Import manually</LayoutLink>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      </PageLayout.Content>
    </PageLayout>
  )
}
