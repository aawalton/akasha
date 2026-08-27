import { type LayoutLinkProps, LayoutLinkProvider, type LayoutRouter, LayoutRouterProvider } from "@shared/design-layout/router-context"
import { PagesUILinkProvider, PagesUIRouterProvider } from "@shared/pages-ui/router-context"
import type { PagesUILinkProps } from "@shared/pages-ui/router-context"
import { type ReactNode, useMemo } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"

function PagesUILinkAdapter({ href, ...rest }: PagesUILinkProps) {
  return <Link to={href} {...rest} />
}

function LayoutLinkAdapter({ href, ...rest }: LayoutLinkProps) {
  return <Link to={href} {...rest} />
}

export function PagesUINextAdapter({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const value = useMemo(
    () => ({
      pathname,
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [pathname, navigate]
  )
  return (
    <PagesUIRouterProvider value={value}>
      <PagesUILinkProvider component={PagesUILinkAdapter}>{children}</PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
}

export function LayoutNextAdapter({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
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
    <LayoutRouterProvider value={layoutValue}>
      <LayoutLinkProvider component={LayoutLinkAdapter}>{children}</LayoutLinkProvider>
    </LayoutRouterProvider>
  )
}
