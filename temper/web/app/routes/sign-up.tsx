import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardHeader } from "@shared/design-primitives/components/card"
import { Skeleton } from "@shared/design-primitives/components/skeleton"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { AuthPageContent } from "@/components/auth/auth-page-content"

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
