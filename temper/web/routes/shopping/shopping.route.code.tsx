import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { CompanionCatalogGate } from "akasha/temper/web/modules/companion-catalog-gate/companion-catalog-gate.module.code.tsx"
import { useShoppingMarks } from "akasha/temper/web/modules/player-settings/player-settings.module.code.ts"
import { tabDefaultFor } from "akasha/temper/web/modules/tab-defaults/tab-defaults.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { ShoppingPageContent } from "akasha/temper/web/player-economics-ui/modules/shopping-page-content/shopping-page-content.module.code.tsx"
import { Suspense } from "react"
import { data, useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Shopping" }]
}

export async function loader({ request }: { request: Request }) {
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  return data({ userId: reached?.ok === true ? reached.account : null })
}

export default function ShoppingPage({ loaderData }: { loaderData: { userId: string | null } }) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/shopping") ?? "list"
  const { shoppingSettings, updateShoppingMarks } = useShoppingMarks()
  const skeleton = (
    <PageLayoutSkeleton
      config={tabbedPageSkeleton({
        initialTab: tab,
        defaultTab: "list",
        tabs: ["list", "companion"],
        titleWidth: 130,
      })}
    />
  )
  return (
    <Suspense fallback={skeleton}>
      <CompanionCatalogGate fallback={skeleton}>
        <ShoppingPageContent
          initialTab={tab}
          initialGearOwnership={searchParams.get("gear") ?? undefined}
          initialGearQualities={searchParams.get("gear-quality") ?? undefined}
          userId={loaderData.userId}
          shoppingMarks={shoppingSettings}
          onUpdateShoppingMarks={updateShoppingMarks}
        />
      </CompanionCatalogGate>
    </Suspense>
  )
}
