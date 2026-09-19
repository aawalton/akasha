"use client"

import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type { AppNavConfig } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { useSidebarState } from "akasha/design/interface/layout/modules/use-sidebar-state/use-sidebar-state.module.code.ts"
import { useAppVersionCheck } from "akasha/page/ui/app-version/modules/use-app-version-check/use-app-version-check.module.code.ts"
import { SortableNavs } from "akasha/page/ui/component/modules/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/page/ui/component/modules/use-app-nav-items/use-app-nav-items.module.code.tsx"
import {
  PRIMARY_NAV_ITEMS,
  RESOURCES_NAV_ITEM,
  SETTINGS_NAV_ITEM,
} from "akasha/temper/web/modules/nav-items/nav-items.module.code.ts"
import {
  TEMPER_APP_ID,
  TEMPER_APP_SLUG,
} from "akasha/temper/web/modules/temper-app-id/temper-app-id.module.code.ts"
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

  return (
    <form method="POST" action="/sign-out">
      <button
        type="submit"
        aria-label="Sign Out"
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!effectiveIsCollapsed && <span>Sign Out</span>}
      </button>
    </form>
  )
}

const BOTTOM_SECTIONS = [RESOURCES_NAV_ITEM, SETTINGS_NAV_ITEM]

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
    primaryItems: PRIMARY_NAV_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: BOTTOM_SECTIONS,
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
    <LayoutRouterAdapter>
      <PagesUIRouterAdapter>
        <AppShellInner ssrNavItems={ssrNavItems}>{children}</AppShellInner>
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
