"use client"

import { AppShell as SharedAppShell } from "@shared/design-system"
import { useSidebarState } from "@shared/design-layout/hooks/use-sidebar-state"
import { type AppNavConfig } from "@shared/design-layout/types/nav-types"
import { SortableNavs } from "@shared/pages-ui/components/sortable-navs"
import { useAppNavItems } from "@shared/pages-ui/components/use-app-nav-items"
import { useAppVersionCheck } from "@shared/pages-ui/app-version/use-app-version-check"
import { signOut } from "@shared/supabase-rr/auth/client"
import { LogOut } from "lucide-react"
import { useMemo } from "react"
import {
  primaryNavItems,
  resourcesNavItem,
  settingsNavItem,
} from "@/components/navigation/nav-items"
import { TEMPER_APP_ID, TEMPER_APP_SLUG } from "@/lib/app-id"
import { LayoutNextAdapter, PagesUINextAdapter } from "@/lib/next-seam-adapters"

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

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <button
      onClick={handleSignOut}
      aria-label="Sign Out"
      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
    >
      <LogOut className="h-5 w-5 shrink-0" />
      {!effectiveIsCollapsed && <span>Sign Out</span>}
    </button>
  )
}

const bottomSections = [resourcesNavItem, settingsNavItem]

interface AppShellProps {
  children: React.ReactNode
  ssrNavItems?: ReadonlyArray<Record<string, unknown>> | null
}

function AppShellInner({ children, ssrNavItems }: AppShellProps) {
  useAppVersionCheck()

  const {
    items: dynamicPrimaryItems,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
  } = useAppNavItems({
    appId: TEMPER_APP_ID,
    appSlug: TEMPER_APP_SLUG,
    primaryItems: primaryNavItems,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections,
      brandLabel: "TEMPER",
      bottomNavMaxItems: 5,
      pinnedItems: ["home", "characters", "companions"],
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
      dynamicPrimaryItems,
      dynamicItemIds,
      onReorder,
      onSetParent,
      rootItemIds,
      childItemIds,
      childrenByParentId,
    ]
  )

  return <SharedAppShell config={config}>{children}</SharedAppShell>
}

export function AppShell({ children, ssrNavItems }: AppShellProps) {
  return (
    <LayoutNextAdapter>
      <PagesUINextAdapter>
        <AppShellInner ssrNavItems={ssrNavItems}>{children}</AppShellInner>
      </PagesUINextAdapter>
    </LayoutNextAdapter>
  )
}
