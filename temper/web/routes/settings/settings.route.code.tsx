import type { SupabaseUser } from "@akasha/supabase-auth/supabase-user"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { PageLayoutSkeleton } from "akasha/design/layout/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { Suspense } from "react"
import { data, redirect, useSearchParams } from "react-router"
import { SettingsPageContent } from "../../settings-page-content/settings-page-content.module.code.tsx"
import { tabDefaultFor } from "../../tab-defaults/tab-defaults.module.code.ts"

export function meta() {
  return [{ title: "Temper | Settings" }]
}

export async function loader({ request }: { request: Request }) {
  const { user, headers } = await getUser(request)
  if (!user) {
    const target = redirect("/sign-in")
    for (const [k, v] of headers) {
      if (k.toLowerCase() === "set-cookie") target.headers.append("set-cookie", v)
    }
    return target
  }
  return data({ user: { id: user.id, email: user.email } }, { headers })
}

export default function SettingsPage({ loaderData }: { loaderData: { user: SupabaseUser } }) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/settings") ?? "account"
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            initialTab: tab,
            defaultTab: "account",
            tabs: ["account", "inventory", "automation", "notifications"],
            titleWidth: 108,
          })}
        />
      }
    >
      <SettingsPageContent user={loaderData.user} initialTab={tab} />
    </Suspense>
  )
}
