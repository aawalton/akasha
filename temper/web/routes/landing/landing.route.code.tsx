import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { temperWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/temper-web.web-app.ts"
import {
  type DocumentData,
  loaderAt,
  metaFor,
  SITE_DOCUMENT,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import type { Components } from "react-markdown"
import { Link } from "react-router"

const WEB_APP = namedAs("web-app", temperWeb.slug, null)

const READ = [SITE_DOCUMENT]

const CARDED: Components = {
  p: ({ children }) => <p className="text-secondary text-sm">{children}</p>,
  ul: ({ children }) => <ul className="space-y-2 text-secondary text-sm">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
}

export const loader = loaderAt(WEB_APP, "")

export const meta = metaFor(null)

export default function LandingRoute({ loaderData }: { loaderData: DocumentData }) {
  useLoaderFollowing(READ)
  const { document } = loaderData
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>{document.title}</PageTitle>
          {document.lead === null ? null : (
            <Heading variant="subsection-accent" as="h2">
              {document.lead}
            </Heading>
          )}
          {document.description === null ? null : (
            <p className="text-secondary text-sm">{document.description}</p>
          )}
        </header>

        {document.sections.map((section) => (
          <Card key={section.anchor} id={section.anchor}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.text === null ? null : (
                <MarkdownRenderer
                  content={section.text}
                  components={CARDED}
                  className="space-y-3"
                />
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button asChild variant="accent">
            <Link to="/sign-up">Create an account</Link>
          </Button>
          <p className="text-secondary text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-accent underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
