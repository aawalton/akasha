import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { SettingsPageContent } from "akasha/temper/web/modules/settings-page-content/settings-page-content.module.code.tsx"
import { tabDefaultFor } from "akasha/temper/web/modules/tab-defaults/tab-defaults.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { Suspense } from "react"
import { data, redirect, useSearchParams } from "react-router"

type SettingsReader = { id: string; email: string | null }

const READ = ["person"]

export function meta() {
  return [{ title: "Temper | Settings" }]
}

export async function loader({ request }: { request: Request }) {
  const reader = await signedInAs(TEMPER_SITE, request)
  if (reader === null) return redirect(TEMPER_SITE.signInPath)
  const reached = await accountOfContributor(reader)
  const user: SettingsReader = reached.ok
    ? { id: reached.account ?? "", email: reached.email }
    : { id: "", email: null }
  return data({ user })
}

export default function SettingsPage({ loaderData }: { loaderData: { user: SettingsReader } }) {
  useLoaderFollowing(READ)
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
