import {
  PageLayout,
  PageTitle,
  PageTitleBadges,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { completionPageEmptyNoData } from "akasha/temper/web/phrase/pages/completion-page-empty-no-data.temper-web-phrase.ts"
import { completionPageEmptyOwnLink } from "akasha/temper/web/phrase/pages/completion-page-empty-own-link.temper-web-phrase.ts"
import { completionPageEmptySignedInOnly } from "akasha/temper/web/phrase/pages/completion-page-empty-signed-in-only.temper-web-phrase.ts"
import { completionPageEmptyTitle } from "akasha/temper/web/phrase/pages/completion-page-empty-title.temper-web-phrase.ts"
import { Globe } from "lucide-react"

export function CompletionPageEmpty() {
  const phrase = usePhrase()
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <PageTitle>{phrase(completionPageEmptyTitle.slug)}</PageTitle>
          <PageTitleBadges>
            <Globe className="size-4 text-tertiary" />
          </PageTitleBadges>
        </div>
      </PageLayout.Header>
      <PageLayout.Content>
        <Card>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Globe />
                </EmptyMedia>
                <EmptyTitle>{phrase(completionPageEmptyNoData.slug)}</EmptyTitle>
                <EmptyDescription>
                  {phrase(completionPageEmptySignedInOnly.slug)}{" "}
                  {phrase(completionPageEmptyOwnLink.slug)}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </PageLayout.Content>
    </PageLayout>
  )
}
