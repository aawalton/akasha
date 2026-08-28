"use client"

import { AuthContext, type AuthContextValue } from "@shared/auth/use-auth"
import { SurfaceProvider } from "@shared/design-system"
import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { SupabasePageResolverProvider } from "@shared/pages-ui/supabase/page-resolver-provider"
import { reportPagesStoreStall } from "@shared/pages-ui-store/report-stall"
import { configurePagesStoreAuth, getPagesStore } from "@shared/pages-ui-store/singleton"
import { PageTypeSlug } from "@shared/pages-url"
import { useSupabase } from "@shared/supabase-rr/provider"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { z } from "zod"
import { useTemperPagesResolver } from "@/hooks/hooks-pages-resolver"

const SupabaseUrlSchema = z.string().url()
const SupabaseAnonKeySchema = z.string().min(1)

const PAGE_TYPE_SLUG = PageTypeSlug("page-type")
const PROPERTY_DEFINITION_SLUG = PageTypeSlug("page-property-definition")
const AUTOMATION_SLUG = PageTypeSlug("automation")

const HYDRATE_OVERRUN_WARN_MS = 30_000

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SurfaceProvider level={0} background={false}>
      <AuthBridge>
        <TemperPagesResolverShell>{children}</TemperPagesResolverShell>
      </AuthBridge>
    </SurfaceProvider>
  )
}

function TemperPagesResolverShell({ children }: { children: ReactNode }) {
  const { pages, pageTypes } = useTemperPagesResolver()
  return (
    <SupabasePageResolverProvider
      pages={pages}
      pageTypes={pageTypes}
      pickerPageTypeSlug="temper-account-character"
    >
      {children}
    </SupabasePageResolverProvider>
  )
}

function AuthBridge({ children }: { children: ReactNode }) {
  const supabase = useSupabase()
  const [authState, setAuthState] = useState<AuthContextValue>({
    userId: null,
    isAuthenticated: false,
  })
  const wasAuthenticated = useRef(false)

  useEffect(() => {
    let cancelled = false

    const apply = (user: { id: string } | null) => {
      if (user) {
        setAuthState({ userId: user.id, isAuthenticated: true })
        wasAuthenticated.current = true
        return
      }
      if (wasAuthenticated.current) {
        wasAuthenticated.current = false
        const currentPath = window.location.pathname + window.location.search
        const signInUrl =
          currentPath !== "/" ? `/sign-in?next=${encodeURIComponent(currentPath)}` : "/sign-in"
        window.location.href = signInUrl
        return
      }
      setAuthState({ userId: null, isAuthenticated: false })
    }

    const refreshAuth = async (): Promise<void> => {
      const { error } = await supabase.auth.refreshSession()
      if (error !== null) {
        console.warn("[auth-provider-wrapper] auth-stale session refresh failed", error.message)
      }
    }
    const pushAuthToStore = async (jwt: string | null): Promise<void> => {
      const work = (async (): Promise<void> => {
        try {
          const supabaseUrl = SupabaseUrlSchema.parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
          const supabaseAnonKey = SupabaseAnonKeySchema.parse(
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          )
          await configurePagesStoreAuth({
            supabaseUrl,
            supabaseAnonKey,
            jwt,
            refreshAuth,
          })
          if (jwt === null) return
          const store = await getPagesStore()
          store.acquireSlug(PAGE_TYPE_SLUG)
          store.acquireSlug(PROPERTY_DEFINITION_SLUG)
          store.acquireSlug(AUTOMATION_SLUG)
          await Promise.all([
            store.whenSlugReady(PAGE_TYPE_SLUG),
            store.whenSlugReady(PROPERTY_DEFINITION_SLUG),
            store.whenSlugReady(AUTOMATION_SLUG),
          ])
        } catch (err: unknown) {
          console.error("[auth-provider-wrapper] configurePagesStoreAuth/prehydrate failed", err)
        }
      })()
      let workDone = false
      void work.then(() => {
        workDone = true
      })
      setTimeout(() => {
        if (!workDone) {
          console.warn(
            `[auth-provider-wrapper] hydrate exceeded ${HYDRATE_OVERRUN_WARN_MS}ms; one of the three known pages-store hang paths may be active`
          )
          void reportPagesStoreStall()
        }
      }, HYDRATE_OVERRUN_WARN_MS)
    }

    void (async () => {
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      await pushAuthToStore(data.session?.access_token ?? null)
      if (cancelled) return
      apply(data.session?.user ?? null)
    })()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void (async () => {
        await pushAuthToStore(session?.access_token ?? null)
        if (cancelled) return
        apply(session?.user ?? null)
      })()
    })

    return () => {
      cancelled = true
      subscription.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <UserIdContext value={authState.userId}>
      <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
    </UserIdContext>
  )
}
