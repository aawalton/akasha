"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { AutomationSelect } from "akasha/temper/web/modules/automation-select/automation-select.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { automationPanelCardAttributes } from "akasha/temper/web/phrase/pages/automation-panel-card-attributes.temper-web-phrase.ts"
import { automationPanelCardAttributesHint } from "akasha/temper/web/phrase/pages/automation-panel-card-attributes-hint.temper-web-phrase.ts"
import { automationPanelCardChampionPoints } from "akasha/temper/web/phrase/pages/automation-panel-card-champion-points.temper-web-phrase.ts"
import { automationPanelCardChampionPointsHint } from "akasha/temper/web/phrase/pages/automation-panel-card-champion-points-hint.temper-web-phrase.ts"
import { automationPanelCardConfigureDefaults } from "akasha/temper/web/phrase/pages/automation-panel-card-configure-defaults.temper-web-phrase.ts"
import { automationPanelCardDailyWrits } from "akasha/temper/web/phrase/pages/automation-panel-card-daily-writs.temper-web-phrase.ts"
import { automationPanelCardDailyWritsHint } from "akasha/temper/web/phrase/pages/automation-panel-card-daily-writs-hint.temper-web-phrase.ts"
import { automationPanelCardEquipment } from "akasha/temper/web/phrase/pages/automation-panel-card-equipment.temper-web-phrase.ts"
import { automationPanelCardEquipmentHint } from "akasha/temper/web/phrase/pages/automation-panel-card-equipment-hint.temper-web-phrase.ts"
import { automationPanelCardFood } from "akasha/temper/web/phrase/pages/automation-panel-card-food.temper-web-phrase.ts"
import { automationPanelCardFoodHint } from "akasha/temper/web/phrase/pages/automation-panel-card-food-hint.temper-web-phrase.ts"
import { automationPanelCardLockpicks } from "akasha/temper/web/phrase/pages/automation-panel-card-lockpicks.temper-web-phrase.ts"
import { automationPanelCardLockpicksHint } from "akasha/temper/web/phrase/pages/automation-panel-card-lockpicks-hint.temper-web-phrase.ts"
import { automationPanelCardPotions } from "akasha/temper/web/phrase/pages/automation-panel-card-potions.temper-web-phrase.ts"
import { automationPanelCardPotionsHint } from "akasha/temper/web/phrase/pages/automation-panel-card-potions-hint.temper-web-phrase.ts"
import { automationPanelCardRepairKits } from "akasha/temper/web/phrase/pages/automation-panel-card-repair-kits.temper-web-phrase.ts"
import { automationPanelCardRepairKitsHint } from "akasha/temper/web/phrase/pages/automation-panel-card-repair-kits-hint.temper-web-phrase.ts"
import { automationPanelCardSkills } from "akasha/temper/web/phrase/pages/automation-panel-card-skills.temper-web-phrase.ts"
import { automationPanelCardSkillsHint } from "akasha/temper/web/phrase/pages/automation-panel-card-skills-hint.temper-web-phrase.ts"
import { automationPanelCardSoulGems } from "akasha/temper/web/phrase/pages/automation-panel-card-soul-gems.temper-web-phrase.ts"
import { automationPanelCardSoulGemsHint } from "akasha/temper/web/phrase/pages/automation-panel-card-soul-gems-hint.temper-web-phrase.ts"
import { automationPanelCardTitle } from "akasha/temper/web/phrase/pages/automation-panel-card-title.temper-web-phrase.ts"
import { useAutomationSettings } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"

type ToggleName =
  | "equipment"
  | "food"
  | "potions"
  | "soulGems"
  | "repairKits"
  | "lockpicks"
  | "dailyWrits"
  | "skills"
  | "championPoints"
  | "attributes"

const ROWS: readonly { toggle: ToggleName; label: string; hint: string }[] = [
  {
    toggle: "equipment",
    label: automationPanelCardEquipment.slug,
    hint: automationPanelCardEquipmentHint.slug,
  },
  { toggle: "food", label: automationPanelCardFood.slug, hint: automationPanelCardFoodHint.slug },
  {
    toggle: "potions",
    label: automationPanelCardPotions.slug,
    hint: automationPanelCardPotionsHint.slug,
  },
  {
    toggle: "soulGems",
    label: automationPanelCardSoulGems.slug,
    hint: automationPanelCardSoulGemsHint.slug,
  },
  {
    toggle: "repairKits",
    label: automationPanelCardRepairKits.slug,
    hint: automationPanelCardRepairKitsHint.slug,
  },
  {
    toggle: "lockpicks",
    label: automationPanelCardLockpicks.slug,
    hint: automationPanelCardLockpicksHint.slug,
  },
  {
    toggle: "dailyWrits",
    label: automationPanelCardDailyWrits.slug,
    hint: automationPanelCardDailyWritsHint.slug,
  },
  {
    toggle: "skills",
    label: automationPanelCardSkills.slug,
    hint: automationPanelCardSkillsHint.slug,
  },
  {
    toggle: "championPoints",
    label: automationPanelCardChampionPoints.slug,
    hint: automationPanelCardChampionPointsHint.slug,
  },
  {
    toggle: "attributes",
    label: automationPanelCardAttributes.slug,
    hint: automationPanelCardAttributesHint.slug,
  },
]

interface CharacterAutomationPanelCardProps {
  esoCharacterId: string
  readOnly?: boolean
}

export function CharacterAutomationPanelCard({
  esoCharacterId,
  readOnly,
}: CharacterAutomationPanelCardProps) {
  const { automationSettings, updateCharacterToggle } = useAutomationSettings()
  const phrase = usePhrase()

  if (readOnly) return null

  const settings = automationSettings?.characters[esoCharacterId]
  const globalChar = automationSettings?.global?.characters

  return (
    <InputPanelCard
      id="automation"
      collapsible={true}
      title={phrase(automationPanelCardTitle.slug)}
      headerSubtitle={
        <CardTitleBadges>
          <Link
            href="/settings?tab=automation"
            className="cursor-pointer text-tertiary text-xs hover:text-secondary"
          >
            {phrase(automationPanelCardConfigureDefaults.slug)}
          </Link>
        </CardTitleBadges>
      }
    >
      {ROWS.map(({ toggle, label, hint }) => (
        <InputPanelCard.Row
          key={toggle}
          label={phrase(label)}
          description={<Text variant="hint">{phrase(hint)}</Text>}
        >
          <AutomationSelect
            value={settings?.[toggle]}
            globalValue={globalChar?.[toggle]}
            onChange={(enabled) => updateCharacterToggle(esoCharacterId, toggle, enabled)}
          />
        </InputPanelCard.Row>
      ))}
    </InputPanelCard>
  )
}
