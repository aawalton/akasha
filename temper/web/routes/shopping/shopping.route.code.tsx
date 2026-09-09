import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { ShoppingPageContent } from "akasha/temper/player-economics-ui/shopping-page-content/shopping-page-content.module.code.tsx"
import { Suspense } from "react"
import { data, useSearchParams } from "react-router"
import { useShoppingMarks } from "../../player-settings/player-settings.module.code.ts"
import { tabDefaultFor } from "../../tab-defaults/tab-defaults.module.code.ts"

export function meta() {
  return [{ title: "Temper | Shopping" }]
}

export async function loader({ request }: { request: Request }) {
  const { user, headers } = await getUser(request)
  return data({ userId: user?.id ?? null }, { headers })
}

export default function ShoppingPage({ loaderData }: { loaderData: { userId: string | null } }) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/shopping") ?? "list"
  const { shoppingSettings, updateShoppingMarks } = useShoppingMarks()
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            initialTab: tab,
            defaultTab: "list",
            tabs: ["list", "companion"],
            titleWidth: 130,
          })}
        />
      }
    >
      <ShoppingPageContent
        initialTab={tab}
        initialGearOwnership={searchParams.get("gear") ?? undefined}
        initialGearQualities={searchParams.get("gear-quality") ?? undefined}
        userId={loaderData.userId}
        shoppingMarks={shoppingSettings}
        onUpdateShoppingMarks={updateShoppingMarks}
      />
    </Suspense>
  )
}
