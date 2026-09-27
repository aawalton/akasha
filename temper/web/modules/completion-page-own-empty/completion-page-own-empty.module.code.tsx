"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { completionPageEmptyTitle } from "akasha/temper/web/phrase/pages/completion-page-empty-title.temper-web-phrase.ts"
import { completionPageOwnEmptyDescription } from "akasha/temper/web/phrase/pages/completion-page-own-empty-description.temper-web-phrase.ts"
import { completionPageOwnEmptyImportManually } from "akasha/temper/web/phrase/pages/completion-page-own-empty-import-manually.temper-web-phrase.ts"
import { completionPageOwnEmptyInstallWatcher } from "akasha/temper/web/phrase/pages/completion-page-own-empty-install-watcher.temper-web-phrase.ts"
import { completionPageOwnEmptyNoData } from "akasha/temper/web/phrase/pages/completion-page-own-empty-no-data.temper-web-phrase.ts"
import { FolderOpen } from "lucide-react"

export function CompletionPageOwnEmpty() {
  return <CompletionPageOwnEmptyView phrase={usePhrase()} />
}

export function CompletionPageOwnEmptyView({ phrase }: { readonly phrase: Phrase }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <PageTitle>{phrase(completionPageEmptyTitle.slug)}</PageTitle>
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
                <EmptyTitle>{phrase(completionPageOwnEmptyNoData.slug)}</EmptyTitle>
                <EmptyDescription>
                  {phrase(completionPageOwnEmptyDescription.slug)}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="accent" asChild>
                  <LayoutLink href="/watcher">
                    {phrase(completionPageOwnEmptyInstallWatcher.slug)}
                  </LayoutLink>
                </Button>
                <Button variant="secondary" asChild>
                  <LayoutLink href="/import">
                    {phrase(completionPageOwnEmptyImportManually.slug)}
                  </LayoutLink>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      </PageLayout.Content>
    </PageLayout>
  )
}
