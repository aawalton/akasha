import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import "akasha/temper/web/look/temper-web-look.stylesheet.styles.css"
import "akasha/temper/web/modules/temper-declared-effects/temper-declared-effects.module.code.ts"
import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { reportError } from "akasha/alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import {
  type HandoverGuardConfig,
  handoverGuard,
} from "akasha/alan/harness/handover-rr/modules/handover-guard/handover-guard.module.code.ts"
import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { fontPreloading } from "akasha/code/router-app/modules/font-preload/font-preload.module.code.ts"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { CommandPalette } from "akasha/design/interface/primitive/modules/command-palette/command-palette.module.code.tsx"
import { ShortcutSheet } from "akasha/design/interface/primitive/modules/shortcut-sheet/shortcut-sheet.module.code.tsx"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { PhrasesSeeded } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import {
  phrasesRead,
  type SeededPhrase,
} from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"

import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { TemperPhrasesSeeded } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { rootDocumentDescription } from "akasha/temper/web/phrase/pages/root-document-description.temper-web-phrase.ts"
import { rootDocumentTitle } from "akasha/temper/web/phrase/pages/root-document-title.temper-web-phrase.ts"
import { rootErrorDetails } from "akasha/temper/web/phrase/pages/root-error-details.temper-web-phrase.ts"
import { rootErrorStatus } from "akasha/temper/web/phrase/pages/root-error-status.temper-web-phrase.ts"
import { rootErrorTitle } from "akasha/temper/web/phrase/pages/root-error-title.temper-web-phrase.ts"
import { rootGoHome } from "akasha/temper/web/phrase/pages/root-go-home.temper-web-phrase.ts"
import { rootNotFoundDetails } from "akasha/temper/web/phrase/pages/root-not-found-details.temper-web-phrase.ts"
import { rootNotFoundTitle } from "akasha/temper/web/phrase/pages/root-not-found-title.temper-web-phrase.ts"
import { temperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.ts"
import { TriangleAlert } from "lucide-react"
import { type ReactNode, useEffect } from "react"
import {
  type AppLoadContext,
  data,
  isRouteErrorResponse,
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const HOME_PATH = "/home"

const GUARD: HandoverGuardConfig = {
  signInPaths: ["/sign-in", "/sign-up"],
  openPaths: [
    /^\/api\//,
    /^\/companion-build\/h\//,
    /^\/character-build\/h\//,
    /^\/$/,
    /^\/handover$/,
    /^\/requests$/,
  ],
  atRoot: { reader: HOME_PATH },
}

export const links: LinksFunction = () => [
  ...fontPreloading(geistSansWoff2),
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
]

export const meta: MetaFunction = () => [
  { title: rootDocumentTitle.title },
  { name: "description", content: rootDocumentDescription.title },
]

export async function loader({ request }: LoaderFunctionArgs<AppLoadContext>) {
  const bounce = await handoverGuard(TEMPER_SITE, request, GUARD)
  if (bounce !== null) return bounce
  const [phrases, temperPhrases] = await Promise.all([
    phrasesRead(),
    phrasesRead(temperWebPhrase.slug),
  ])
  return data({ phrases, temperPhrases })
}

type Seeds = {
  readonly phrases?: readonly SeededPhrase[]
  readonly temperPhrases?: readonly SeededPhrase[]
}

const NO_PHRASES: readonly SeededPhrase[] = []

export function Layout({ children }: { children: ReactNode }) {
  const nonce = useDocumentNonce()
  useEffect(() => {
    setStoreDiagnosticsSink((d) =>
      reportError({
        message: d.message,
        stack: d.detail,
        kind: "error",
        app: "temper",
        errorUserId: null,
      })
    )
    return () => setStoreDiagnosticsSink(null)
  }, [])
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
        <script src="/sidebar-boot.js" nonce={nonce} suppressHydrationWarning />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="temper" />
          <LayoutRouterAdapter>
            <PagesUIRouterAdapter>
              {children}
              <CommandPalette />
              <ShortcutSheet />
            </PagesUIRouterAdapter>
          </LayoutRouterAdapter>
        </SurfaceProvider>
        <Toaster />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function App() {
  const seeds = useLoaderData<Seeds>()
  return (
    <PhrasesSeeded phrases={seeds?.phrases ?? NO_PHRASES}>
      <TemperPhrasesSeeded phrases={seeds?.temperPhrases ?? NO_PHRASES}>
        <Outlet />
      </TemperPhrasesSeeded>
    </PhrasesSeeded>
  )
}

export function ErrorBoundary({ error }: { error: unknown }) {
  useReportRenderError(error, "temper")

  let message: string = rootErrorTitle.title
  let details: string = rootErrorDetails.title
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? rootNotFoundTitle.title : rootErrorStatus.title
    if (error.status === 404) details = rootNotFoundDetails.title
  } else if (import.meta.env.DEV === true && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlert />
          </EmptyMedia>
          <EmptyTitle>{message}</EmptyTitle>
          <EmptyDescription>{details}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <a href="/">{rootGoHome.title}</a>
          </Button>
        </EmptyContent>
      </Empty>
      {stack != null ? (
        <pre className="w-full overflow-x-auto p-4 text-xs">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  )
}
