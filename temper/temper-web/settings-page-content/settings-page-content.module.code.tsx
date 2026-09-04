"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { PageTabsTrigger, Tabs, TabsList } from "@akasha/design-patterns/tabs"
import { useFilterPersistence } from "@akasha/design-patterns/use-filter-persistence"
import type { SupabaseUser } from "@akasha/supabase-auth/supabase-user"
import { Bell, Package, Sliders, User as UserIcon } from "lucide-react"
import { AccountTab } from "../account-tab/account-tab.module.code.tsx"
import { AutomationTab } from "../automation-tab/automation-tab.module.code.tsx"
import { InventoryTab } from "../inventory-tab/inventory-tab.module.code.tsx"
import { NotificationsTab } from "../notifications-tab/notifications-tab.module.code.tsx"

const VALID_TABS = new Set(["account", "inventory", "automation", "notifications"])

type FilterValues = {
  tab: string
}

interface SettingsPageContentProps {
  user: SupabaseUser
  initialTab?: string
}

export function SettingsPageContent({ user, initialTab }: SettingsPageContentProps) {
  const { values, update } = useFilterPersistence<FilterValues>({
    storageKey: "temper:settings:filters",
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: "account",
        initial: initialTab,
        validate: (raw) => (typeof raw === "string" && VALID_TABS.has(raw) ? raw : undefined),
        toParam: (v) => (v === "account" ? null : v),
      },
    },
  })

  return (
    <PageLayout
      skeleton={tabbedPageSkeleton({
        titleWidth: 108,
        initialTab,
        defaultTab: "account",
        tabs: ["account", "inventory", "automation", "notifications"],
      })}
    >
      <PageLayout.Header>
        <PageTitle>Settings</PageTitle>
      </PageLayout.Header>

      <Tabs value={values.tab} onValueChange={(v) => update({ tab: v })}>
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-4 grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="account" icon={<UserIcon />} label="Account" />
            <PageTabsTrigger value="inventory" icon={<Package />} label="Inventory" />
            <PageTabsTrigger value="automation" icon={<Sliders />} label="Automation" />
            <PageTabsTrigger value="notifications" icon={<Bell />} label="Notifications" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <AccountTab active={values.tab === "account"} user={user} />
          <InventoryTab active={values.tab === "inventory"} />
          <AutomationTab active={values.tab === "automation"} />
          <NotificationsTab active={values.tab === "notifications"} />
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
