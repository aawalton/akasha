import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { getUser } from "@shared/supabase-rr/auth/server"
import { Suspense } from "react"
import { data, redirect, useSearchParams } from "react-router"
import { SettingsPageContent } from "@/components/settings/settings-page-content"
import { tabDefaultFor } from "~/lib/tab-defaults"
import type { Route } from "./+types/settings"

export function meta() {
  return [{ title: "Temper | Settings" }]
}

export async function loader({ request }: Route.LoaderArgs) {
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

export default function SettingsPage({ loaderData }: Route.ComponentProps) {
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
