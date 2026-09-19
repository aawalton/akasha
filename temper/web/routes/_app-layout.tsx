import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AuthProviderWrapper } from "akasha/temper/web/modules/auth-provider-wrapper/auth-provider-wrapper.module.code.tsx"
import { usePathTracking } from "akasha/temper/web/modules/path-tracker/path-tracker.module.code.ts"
import { TEMPER_APP_SLUG } from "akasha/temper/web/modules/temper-app-id/temper-app-id.module.code.ts"
import { AppShell } from "akasha/temper/web/modules/temper-app-shell/temper-app-shell.module.code.tsx"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  const signedIn = user !== null || (await signedInAs(TEMPER_SITE, request)) !== null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (signedIn) {
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
