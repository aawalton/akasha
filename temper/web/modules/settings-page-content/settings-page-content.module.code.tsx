"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  PageTabsTrigger,
  Tabs,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { useFilterPersistence } from "akasha/design/interface/pattern/modules/use-filter-persistence/use-filter-persistence.module.code.ts"
import { AccountTab } from "akasha/temper/web/modules/account-tab/account-tab.module.code.tsx"
import { AutomationTab } from "akasha/temper/web/modules/automation-tab/automation-tab.module.code.tsx"
import { InventoryTab } from "akasha/temper/web/modules/inventory-tab/inventory-tab.module.code.tsx"
import { NotificationsTab } from "akasha/temper/web/modules/notifications-tab/notifications-tab.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { settingsPageContentAccount } from "akasha/temper/web/phrase/pages/settings-page-content-account.temper-web-phrase.ts"
import { settingsPageContentAutomation } from "akasha/temper/web/phrase/pages/settings-page-content-automation.temper-web-phrase.ts"
import { settingsPageContentInventory } from "akasha/temper/web/phrase/pages/settings-page-content-inventory.temper-web-phrase.ts"
import { settingsPageContentNotifications } from "akasha/temper/web/phrase/pages/settings-page-content-notifications.temper-web-phrase.ts"
import { settingsPageContentTitle } from "akasha/temper/web/phrase/pages/settings-page-content-title.temper-web-phrase.ts"
import { Bell, Package, Sliders, User as UserIcon } from "lucide-react"

const VALID_TABS = new Set(["account", "inventory", "automation", "notifications"])

type FilterValues = {
  tab: string
}

interface SettingsPageContentProps {
  user: { id: string; email: string | null }
  initialTab?: string
}

export function SettingsPageContent({ user, initialTab }: SettingsPageContentProps) {
  const phrase = usePhrase()
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
        <PageTitle>{phrase(settingsPageContentTitle.slug)}</PageTitle>
      </PageLayout.Header>

      <Tabs value={values.tab} onValueChange={(v) => update({ tab: v })}>
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-4 grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger
              value="account"
              icon={<UserIcon />}
              label={phrase(settingsPageContentAccount.slug)}
            />
            <PageTabsTrigger
              value="inventory"
              icon={<Package />}
              label={phrase(settingsPageContentInventory.slug)}
            />
            <PageTabsTrigger
              value="automation"
              icon={<Sliders />}
              label={phrase(settingsPageContentAutomation.slug)}
            />
            <PageTabsTrigger
              value="notifications"
              icon={<Bell />}
              label={phrase(settingsPageContentNotifications.slug)}
            />
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
