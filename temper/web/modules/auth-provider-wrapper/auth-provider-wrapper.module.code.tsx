"use client"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { SupabasePageResolverProvider } from "akasha/page/ui/supabase/modules/page-resolver-provider/page-resolver-provider.module.code.tsx"
import { useTemperPagesResolver } from "akasha/temper/web/modules/temper-pages-resolver/temper-pages-resolver.module.code.ts"
import type { ReactNode } from "react"

export function AuthProviderWrapper({
  reader,
  children,
}: {
  reader: string | null
  children: ReactNode
}) {
  return (
    <SurfaceProvider level={0} background={false}>
      <AuthProvider reader={reader}>
        <TemperPagesResolverShell>{children}</TemperPagesResolverShell>
      </AuthProvider>
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
