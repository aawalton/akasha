import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import "./temper-web-look/temper-web-look.stylesheet.styles.css"
import "./temper-declared-effects/temper-declared-effects.module.code.ts"
import {
  type LayoutLinkProps,
  LayoutLinkProvider,
  type LayoutRouter,
  LayoutRouterProvider,
} from "@akasha/design-layout/router-context"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { Button } from "@akasha/design-primitives/button"
import { CommandPalette } from "@akasha/design-primitives/command-palette"
import { ShortcutSheet } from "@akasha/design-primitives/shortcut-sheet"
import { Toaster } from "@akasha/design-primitives/sonner"
import { SurfaceProvider } from "@akasha/design-primitives/surface-provider"
import { ErrorCaptureInstaller } from "@akasha/errors-client/error-capture-installer"
import { reportError } from "@akasha/errors-client/error-reporting"
import { useReportRenderError } from "@akasha/errors-client/use-report-render-error"
import {
  type PagesUILinkProps,
  PagesUILinkProvider,
  PagesUIRouterProvider,
} from "@akasha/pages-ui/navigation-context"
import { setStoreDiagnosticsSink } from "@akasha/pages-ui-store/diagnostics"
import { type AuthRouteConfig, authGuard } from "@akasha/supabase-rr/auth-guard"
import { SupabaseProvider } from "@akasha/supabase-rr/supabase-provider"
import { TriangleAlert } from "lucide-react"
import { type ReactNode, useEffect, useMemo } from "react"
import {
  type AppLoadContext,
  data,
  isRouteErrorResponse,
  Link,
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router"

const AUTH_CONFIG: AuthRouteConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up"],
  internalApiPaths: ["/api/", "/companion-build/h/", "/character-build/h/", /^\/$/],
  rootRedirects: { authenticated: "/home" },
  signInOnInvalidSession: true,
}

const SHOWING_STACK = process.env.NODE_ENV !== "production"

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: geistSansWoff2,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
]

export const meta: MetaFunction = () => [
  { title: "Temper | The Ultimate ESO Build Editor & Optimizer" },
  { name: "description", content: "The Elder Scrolls Online Build Planner" },
]

export async function loader({ request, context }: LoaderFunctionArgs<AppLoadContext>) {
  const guard = await authGuard(request, AUTH_CONFIG)
  if (guard instanceof Response) return guard

  const nonce = typeof context.nonce === "string" ? context.nonce : undefined
  return data({ nonce }, { headers: guard.headers })
}

function PagesUILinkAdapter({ href, ...rest }: PagesUILinkProps) {
  return <Link to={href} {...rest} />
}

function LayoutLinkAdapter({ href, ...rest }: LayoutLinkProps) {
  return <Link to={href} {...rest} />
}

function SeamAdapters({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const pagesUIValue = useMemo(
    () => ({
      pathname,
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [pathname, navigate]
  )
  const layoutValue = useMemo<LayoutRouter>(
    () => ({
      pathname,
      searchParams: {
        get: (name: string) => searchParams.get(name),
        toString: () => searchParams.toString(),
      },
    }),
    [pathname, searchParams]
  )
  return (
    <PagesUIRouterProvider value={pagesUIValue}>
      <PagesUILinkProvider component={PagesUILinkAdapter}>
        <LayoutRouterProvider value={layoutValue}>
          <LayoutLinkProvider component={LayoutLinkAdapter}>{children}</LayoutLinkProvider>
        </LayoutRouterProvider>
      </PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
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
            <SeamAdapters>
              {children}
              <CommandPalette />
              <ShortcutSheet />
            </SeamAdapters>
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
  } else if (SHOWING_STACK && error instanceof Error) {
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
