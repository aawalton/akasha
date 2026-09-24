import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { AuthProviderWrapper } from "akasha/temper/web/modules/auth-provider-wrapper/auth-provider-wrapper.module.code.tsx"

import { TEMPER_APP } from "akasha/temper/web/modules/temper-app-id/temper-app-id.module.code.ts"
import { AppShell } from "akasha/temper/web/modules/temper-app-shell/temper-app-shell.module.code.tsx"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (reader !== null) {
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: TEMPER_APP }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[temper/web/_app-layout] nav SSR fetch failed:", err)
    }
  }

  return data({ reader, accountId, navItems })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProviderWrapper reader={loaderData.reader} accountId={loaderData.accountId}>
      <AppShell ssrNavItems={loaderData.navItems}>
        <Outlet />
      </AppShell>
    </AuthProviderWrapper>
  )
}
