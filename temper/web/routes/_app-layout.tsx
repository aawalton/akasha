import { getPages } from "@akasha/pages-access/get"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { data, Outlet } from "react-router"
import { AuthProviderWrapper } from "../auth-provider-wrapper/auth-provider-wrapper.module.code.tsx"
import { usePathTracking } from "../path-tracker/path-tracker.module.code.ts"
import { TEMPER_APP_SLUG } from "../temper-app-id/temper-app-id.module.code.ts"
import { AppShell } from "../temper-app-shell/temper-app-shell.module.code.tsx"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (user) {
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "appSlug", eq: TEMPER_APP_SLUG }],
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
  usePathTracking()
  return (
    <AuthProviderWrapper>
      <AppShell ssrNavItems={loaderData.navItems}>
        <Outlet />
      </AppShell>
    </AuthProviderWrapper>
  )
}
