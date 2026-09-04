import { PanelCard } from "@akasha/design-layout/panel-card"
import { CardHeader } from "@akasha/design-primitives/card"
import { Skeleton } from "@akasha/design-primitives/skeleton"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { AuthPageContent } from "../temper-auth-page-content/temper-auth-page-content.module.code.tsx"

export function meta() {
  return [{ title: "Temper | Sign Up" }]
}

function AuthFallback() {
  return (
    <div className="mx-auto flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <PanelCard id="auth-loading" className="h-[450px]">
        <CardHeader>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
      </PanelCard>
    </div>
  )
}

export default function SignUpPage() {
  const [searchParams] = useSearchParams()
  const nextParam = searchParams.get("next") ?? undefined
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthPageContent mode="sign-up" nextParam={nextParam} />
    </Suspense>
  )
}
