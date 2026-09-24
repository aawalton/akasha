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
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
import {
  catalogOf,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
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
  useRouteLoaderData,
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

export const links: LinksFunction = () => fontPreloading(geistSansWoff2)

export const meta: MetaFunction = () => [
  { title: "Temper | The Ultimate ESO Build Editor & Optimizer" },
  { name: "description", content: "The Elder Scrolls Online Build Planner" },
]

export async function loader({ request }: LoaderFunctionArgs<AppLoadContext>) {
  const bounce = await handoverGuard(TEMPER_SITE, request, GUARD)
  if (bounce !== null) return bounce
  const catalog = await loadCompanionCatalog()
  return data({ skills: catalog.skills, skillLines: catalog.skillLines, traits: catalog.traits })
}

export function Layout({ children }: { children: ReactNode }) {
  const rooted = useRouteLoaderData<typeof loader>("root")
  const nonce = useDocumentNonce()
  if (
    rooted?.skills !== undefined &&
    rooted.skillLines !== undefined &&
    rooted.traits !== undefined
  ) {
    holdCompanionCatalog(catalogOf(rooted.skills, rooted.skillLines, rooted.traits))
  }
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
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: unknown }) {
  useReportRenderError(error, "temper")

  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText !== ""
          ? error.statusText
          : details
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
            <a href="/">Go to Home</a>
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
