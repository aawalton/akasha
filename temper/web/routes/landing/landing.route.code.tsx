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
  metaFor,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import {
  loadedPhrase,
  loadWebPhrases,
} from "akasha/temper/web/.server/web-phrase-loading/web-phrase-loading.module.code.ts"
import { landingCreateAccount } from "akasha/temper/web/phrase/pages/landing-create-account.temper-web-phrase.ts"
import { landingHaveAccount } from "akasha/temper/web/phrase/pages/landing-have-account.temper-web-phrase.ts"
import { landingSignIn } from "akasha/temper/web/phrase/pages/landing-sign-in.temper-web-phrase.ts"
import { temperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.ts"
import type { Components } from "react-markdown"
import { Link } from "react-router"

const WEB_APP = namedAs("web-app", temperWeb.slug, null)

const READ = [SITE_DOCUMENT, temperWebPhrase.slug]

const PHRASES = [landingCreateAccount.slug, landingHaveAccount.slug, landingSignIn.slug]

const CARDED: Components = {
  p: ({ children }) => <p className="text-secondary text-sm">{children}</p>,
  ul: ({ children }) => <ul className="space-y-2 text-secondary text-sm">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
}

export async function loader() {
  const [document, phrases] = await Promise.all([
    siteDocumentAt(WEB_APP, ""),
    loadWebPhrases(PHRASES),
  ])
  return {
    document,
    createAccount: loadedPhrase(phrases, landingCreateAccount.slug),
    haveAccount: loadedPhrase(phrases, landingHaveAccount.slug),
    signIn: loadedPhrase(phrases, landingSignIn.slug),
  }
}

type LandingLoaderData = Awaited<ReturnType<typeof loader>>

export const meta = metaFor(null)

export default function LandingRoute({ loaderData }: { loaderData: LandingLoaderData }) {
  useLoaderFollowing(READ)
  const { document, createAccount, haveAccount, signIn } = loaderData
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
            <Link to="/sign-up">{createAccount}</Link>
          </Button>
          <p className="text-secondary text-sm">
            {haveAccount}{" "}
            <Link to="/sign-in" className="text-accent underline underline-offset-4">
              {signIn}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
