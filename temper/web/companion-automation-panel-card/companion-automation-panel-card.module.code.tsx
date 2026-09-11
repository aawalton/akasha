"use client"

import { InputPanelCard } from "akasha/design/interfaces/patterns/input-panel-card/input-panel-card.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interfaces/primitives/card/card.module.code.tsx"
import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import { PagesUILink as Link } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import { useAutomationSettings } from "akasha/temper/player-inventory-management-ui/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { AutomationSelect } from "akasha/temper/web/automation-select/automation-select.module.code.tsx"

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
