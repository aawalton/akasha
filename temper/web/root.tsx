import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import "akasha/temper/web/look/temper-web-look.stylesheet.styles.css"
import "akasha/temper/web/modules/temper-declared-effects/temper-declared-effects.module.code.ts"
import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { reportError } from "akasha/alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import {
  bouncedToSignIn,
  passingOn,
} from "akasha/alan/harness/handover-rr/modules/handover-bounce/handover-bounce.module.code.ts"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import {
  type AuthRouteConfig,
  authGuard,
} from "akasha/alan/harness/supabase-rr/modules/auth-guard/auth-guard.module.code.ts"
import { SupabaseProvider } from "akasha/alan/harness/supabase-rr/modules/supabase-provider/supabase-provider.module.code.tsx"
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
  redirect,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router"

const HOME_PATH = "/home"

const AUTH_CONFIG: AuthRouteConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up"],
  internalApiPaths: ["/api/", "/companion-build/h/", "/character-build/h/", /^\/$/, /^\/handover$/],
  rootRedirects: { authenticated: HOME_PATH },
  signInOnInvalidSession: true,
}

export const links: LinksFunction = () => fontPreloading(geistSansWoff2)

export const meta: MetaFunction = () => [
  { title: "Temper | The Ultimate ESO Build Editor & Optimizer" },
  { name: "description", content: "The Elder Scrolls Online Build Planner" },
]

export async function loader({ request, context }: LoaderFunctionArgs<AppLoadContext>) {
  const nonce = typeof context.nonce === "string" ? context.nonce : undefined
  const guard = await authGuard(request, AUTH_CONFIG)
  if (!(guard instanceof Response)) {
    const atRoot = new URL(request.url).pathname === "/"
    if (atRoot && (await signedInAs(TEMPER_SITE, request)) !== null) {
      return redirect(HOME_PATH, { headers: guard.headers })
    }
    return data({ nonce }, { headers: guard.headers })
  }
  if (!bouncedToSignIn(guard, AUTH_CONFIG.signInPath)) return guard
  if ((await signedInAs(TEMPER_SITE, request)) === null) return guard
  return data({ nonce }, { headers: passingOn(guard) })
}

export function Layout({ children }: { children: ReactNode }) {
  const nonce = useRouteLoaderData<typeof loader>("root")?.nonce
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
        <script src="/sidebar-boot.js" nonce={nonce} />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="temper" />
          <SupabaseProvider>
            <LayoutRouterAdapter>
              <PagesUIRouterAdapter>
                {children}
                <CommandPalette />
                <ShortcutSheet />
              </PagesUIRouterAdapter>
            </LayoutRouterAdapter>
          </SupabaseProvider>
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
