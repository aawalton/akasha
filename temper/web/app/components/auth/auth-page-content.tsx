"use client"

import { type AuthMode, type AuthSubmitPayload, AuthPageContent as DSAuthPageContent } from "@shared/design-patterns/components/auth-page-content"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { safeInternalPath } from "@shared/pages-url"
import { signInWithPassword, signUpWithPassword } from "@shared/supabase-rr/auth/client"
import type { ReactNode } from "react"
import { useState } from "react"
import { clearLastPath, getLastPath } from "@/components/utils/path-tracker"

interface AuthPageContentProps {
  mode: AuthMode
  nextParam?: string
}

const SUPPORT_EMAIL = "alan@alanwalton.com"

function SupportLink() {
  return (
    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent underline">
      {SUPPORT_EMAIL}
    </a>
  )
}

const recoveryNotice = (
  <p>
    Automatic password reset is not available yet. Email <SupportLink /> from the address on your
    account and we will reset it for you.
  </p>
)

function PendingConfirmation({ email }: { email: string }) {
  return (
    <>
      <p className="font-medium text-primary">Confirm your email to finish</p>
      <p>
        We sent a confirmation link to {email}. Open it, then come back and sign in. Nothing
        arrived? Email <SupportLink /> and we will sort it out.
      </p>
    </>
  )
}

export function AuthPageContent({ mode, nextParam }: AuthPageContentProps) {
  const [currentMode, setCurrentMode] = useState<AuthMode>(mode)
  const router = usePagesUIRouter()

  const handleModeChange = (newMode: AuthMode) => {
    setCurrentMode(newMode)
    const suffix =
      nextParam != null && nextParam !== "" ? `?next=${encodeURIComponent(nextParam)}` : ""
    router.replace(`/${newMode}${suffix}`)
  }

  const handleSubmit = async (
    payload: AuthSubmitPayload
  ): Promise<undefined | { error?: string } | { notice: ReactNode }> => {
    const { hasSession, error } =
      payload.mode === "sign-in"
        ? await signInWithPassword(payload.email, payload.password)
        : await signUpWithPassword(payload.email, payload.password)
    if (error) return { error: error.message }

    if (payload.mode === "sign-up" && !hasSession) {
      return { notice: <PendingConfirmation email={payload.email} /> }
    }

    const redirectTo = safeInternalPath(nextParam ?? getLastPath() ?? "/home") ?? "/home"
    clearLastPath()
    router.push(redirectTo)
  }

  return (
    <DSAuthPageContent
      variant="card"
      mode={currentMode}
      allowModeToggle
      onModeChange={handleModeChange}
      onSubmit={handleSubmit}
      recoveryNotice={recoveryNotice}
    />
  )
}
