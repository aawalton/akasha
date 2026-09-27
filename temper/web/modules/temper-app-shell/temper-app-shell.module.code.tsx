"use client"

import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type {
  AppNavConfig,
  AppNavItem,
} from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { useSidebarState } from "akasha/design/interface/layout/modules/use-sidebar-state/use-sidebar-state.module.code.ts"
import { SortableNavs } from "akasha/page/ui/component/modules/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/page/ui/component/modules/use-app-nav-items/use-app-nav-items.module.code.tsx"
import {
  TEMPER_APP,
  TEMPER_APP_ID,
} from "akasha/temper/web/modules/temper-app-id/temper-app-id.module.code.ts"
import {
  usePhrase,
  useWebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { temperAppShellBrand } from "akasha/temper/web/phrase/pages/temper-app-shell-brand.temper-web-phrase.ts"
import { temperAppShellSignOut } from "akasha/temper/web/phrase/pages/temper-app-shell-sign-out.temper-web-phrase.ts"
import { LogOut } from "lucide-react"
import { useMemo } from "react"

function isAuthRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  )
}

function SignOutButton() {
  const { effectiveIsCollapsed } = useSidebarState()
  const phrase = usePhrase()
  const signOut = phrase(temperAppShellSignOut.slug)

  return (
    <form method="POST" action="/sign-out">
      <button
        type="submit"
        aria-label={signOut}
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!effectiveIsCollapsed && <span>{signOut}</span>}
      </button>
    </form>
  )
}

const NO_CODED_ITEMS: readonly AppNavItem[] = []

interface AppShellProps {
  children: React.ReactNode
  ssrNavItems?: ReadonlyArray<Record<string, unknown>> | null
}

function AppShellInner({ children, ssrNavItems }: AppShellProps) {
  const phrases = useWebPhrases()
  const phrase = usePhrase()
  const {
    items: dynamicPrimaryItems,
    bottomSections,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
  } = useAppNavItems({
    appId: TEMPER_APP_ID,
    app: TEMPER_APP,
    primaryItems: NO_CODED_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections,
      brandLabel: phrase(temperAppShellBrand.slug),
      bottomNavMaxItems: 5,
      footerSlot: <SignOutButton />,
      skipRoutes: isAuthRoute,
      renderPrimaryItems: (items, renderItem) => (
        <SortableNavs
          items={items}
          dynamicItemIds={dynamicItemIds}
          onReorder={onReorder}
          onSetParent={onSetParent}
          rootItemIds={rootItemIds}
          childItemIds={childItemIds}
          childrenByParentId={childrenByParentId}
          renderItem={renderItem}
        />
      ),
    }),
    [
      phrase,
      dynamicPrimaryItems,
      bottomSections,
      dynamicItemIds,
      onReorder,
      onSetParent,
      rootItemIds,
      childItemIds,
      childrenByParentId,
    ]
  )

  return <SharedAppShell config={config}>{phrases === null ? null : children}</SharedAppShell>
}

export function AppShell({ children, ssrNavItems }: AppShellProps) {
  return (
    <LayoutRouterAdapter>
      <PagesUIRouterAdapter>
        <AppShellInner ssrNavItems={ssrNavItems}>{children}</AppShellInner>
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
