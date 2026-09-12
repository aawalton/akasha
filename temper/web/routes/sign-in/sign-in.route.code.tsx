import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { CardHeader } from "akasha/design/interfaces/primitives/modules/card/card.module.code.tsx"
import { Skeleton } from "akasha/design/interfaces/primitives/skeleton/skeleton.module.code.tsx"
import { AuthPageContent } from "akasha/temper/web/temper-auth-page-content/temper-auth-page-content.module.code.tsx"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Sign In" }]
}

function AuthFallback() {
  return (
    <div className="mx-auto flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <PanelCard id="auth-loading" className="h-[308px]">
        <CardHeader>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
      </PanelCard>
    </div>
  )
}

export default function SignInPage() {
  const [searchParams] = useSearchParams()
  const nextParam = searchParams.get("next") ?? undefined
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthPageContent mode="sign-in" nextParam={nextParam} />
    </Suspense>
  )
}
