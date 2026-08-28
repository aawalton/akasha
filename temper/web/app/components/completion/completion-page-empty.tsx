import { PageLayout, PageTitle, PageTitleBadges } from "@shared/design-layout/components/page-layout"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { Globe } from "lucide-react"

export function CompletionPageEmpty() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <PageTitle>Completion</PageTitle>
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
                <EmptyTitle>No completion data loaded</EmptyTitle>
                <EmptyDescription>
                  Temper only loads the completion data of the account you are signed in as, so a
                  link to another player&apos;s completion shows nothing here even when that player
                  has data of their own. If this is your own link, import your ESO data or reload
                  the page.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </PageLayout.Content>
    </PageLayout>
  )
}
