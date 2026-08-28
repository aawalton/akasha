"use client"

import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { Text } from "@shared/design-primitives/components/text"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import { useAutomationSettings } from "@temper/player-inventory-management-ui/hooks-inventory-settings"
import { AutomationSelect } from "@/components/automation/automation-select"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

interface CompanionAutomationPanelCardProps {
  companionId: string
  readOnly?: boolean
}

export function CompanionAutomationPanelCard({
  companionId,
  readOnly,
}: CompanionAutomationPanelCardProps) {
  const { automationSettings, updateCompanionToggle } = useAutomationSettings()

  if (readOnly) return null

  const settings = automationSettings?.companions[companionId]
  const globalComp = automationSettings?.global?.companions

  return (
    <InputPanelCard
      id="companion-automation"
      collapsible={true}
      title="Automation"
      headerSubtitle={
        <CardTitleBadges>
          <Link
            href="/settings?tab=automation"
            className="cursor-pointer text-tertiary text-xs hover:text-secondary"
          >
            Configure Defaults
          </Link>
        </CardTitleBadges>
      }
    >
      <InputPanelCard.Row
        label="Equipment"
        description={<Text variant="hint">Automatically equip gear to match this build.</Text>}
      >
        <AutomationSelect
          value={settings?.equipment}
          globalValue={globalComp?.equipment}
          onChange={(enabled) => updateCompanionToggle(companionId, "equipment", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Skills"
        description={
          <Text variant="hint">
            Automatically equip skills to match this build. Coming soon — this toggle will take
            effect once addon support is added.
          </Text>
        }
      >
        <AutomationSelect
          value={settings?.skills}
          globalValue={globalComp?.skills}
          onChange={(enabled) => updateCompanionToggle(companionId, "skills", enabled)}
        />
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
