import { getPages } from "@shared/pages-access/get"
import { getUser } from "@shared/supabase-rr/auth/server"
import { Suspense } from "react"
import { data, Outlet } from "react-router"
import { AuthProviderWrapper } from "@/components/providers/auth-provider-wrapper"
import { AppShell } from "@/components/ui/app-shell"
import { PathTracker } from "@/components/utils/path-tracker"
import { TEMPER_APP_ID } from "@/lib/app-id"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (user) {
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: TEMPER_APP_ID }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[temper/web/_app-layout] nav SSR fetch failed:", err)
    }
  }

  return data({ navItems }, { headers })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProviderWrapper>
      <AppShell ssrNavItems={loaderData.navItems}>
        <Suspense fallback={null}>
          <PathTracker />
        </Suspense>
        <Outlet />
      </AppShell>
    </AuthProviderWrapper>
  )
}
