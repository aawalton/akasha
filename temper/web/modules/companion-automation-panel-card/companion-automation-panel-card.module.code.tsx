"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { AutomationSelect } from "akasha/temper/web/modules/automation-select/automation-select.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionAutomationPanelCardAutomation } from "akasha/temper/web/phrase/pages/companion-automation-panel-card-automation.temper-web-phrase.ts"
import { companionAutomationPanelCardConfigureDefaults } from "akasha/temper/web/phrase/pages/companion-automation-panel-card-configure-defaults.temper-web-phrase.ts"
import { companionAutomationPanelCardEquipment } from "akasha/temper/web/phrase/pages/companion-automation-panel-card-equipment.temper-web-phrase.ts"
import { companionAutomationPanelCardEquipmentHint } from "akasha/temper/web/phrase/pages/companion-automation-panel-card-equipment-hint.temper-web-phrase.ts"
import { companionAutomationPanelCardSkills } from "akasha/temper/web/phrase/pages/companion-automation-panel-card-skills.temper-web-phrase.ts"
import { companionAutomationPanelCardSkillsHint } from "akasha/temper/web/phrase/pages/companion-automation-panel-card-skills-hint.temper-web-phrase.ts"
import { useAutomationSettings } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"

interface CompanionAutomationPanelCardProps {
  companionId: string
  readOnly?: boolean
}

export function CompanionAutomationPanelCard({
  companionId,
  readOnly,
}: CompanionAutomationPanelCardProps) {
  const { automationSettings, updateCompanionToggle } = useAutomationSettings()
  const phrase = usePhrase()

  if (readOnly) return null

  const settings = automationSettings?.companions[companionId]
  const globalComp = automationSettings?.global?.companions

  return (
    <InputPanelCard
      id="companion-automation"
      collapsible={true}
      title={phrase(companionAutomationPanelCardAutomation.slug)}
      headerSubtitle={
        <CardTitleBadges>
          <Link
            href="/settings?tab=automation"
            className="cursor-pointer text-tertiary text-xs hover:text-secondary"
          >
            {phrase(companionAutomationPanelCardConfigureDefaults.slug)}
          </Link>
        </CardTitleBadges>
      }
    >
      <InputPanelCard.Row
        label={phrase(companionAutomationPanelCardEquipment.slug)}
        description={
          <Text variant="hint">{phrase(companionAutomationPanelCardEquipmentHint.slug)}</Text>
        }
      >
        <AutomationSelect
          value={settings?.equipment}
          globalValue={globalComp?.equipment}
          onChange={(enabled) => updateCompanionToggle(companionId, "equipment", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label={phrase(companionAutomationPanelCardSkills.slug)}
        description={
          <Text variant="hint">{phrase(companionAutomationPanelCardSkillsHint.slug)}</Text>
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
