"use client"

import type { BadgeToggleGroupItem } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import type {
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "akasha/temper/player/character/build/build-support/modules/automation-settings/automation-settings.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { automationTabAttributes } from "akasha/temper/web/phrase/pages/automation-tab-attributes.temper-web-phrase.ts"
import { automationTabAutoCraft } from "akasha/temper/web/phrase/pages/automation-tab-auto-craft.temper-web-phrase.ts"
import { automationTabAutomation } from "akasha/temper/web/phrase/pages/automation-tab-automation.temper-web-phrase.ts"
import { automationTabChampionPoints } from "akasha/temper/web/phrase/pages/automation-tab-champion-points.temper-web-phrase.ts"
import { automationTabCharacterDefaults } from "akasha/temper/web/phrase/pages/automation-tab-character-defaults.temper-web-phrase.ts"
import { automationTabComingSoon } from "akasha/temper/web/phrase/pages/automation-tab-coming-soon.temper-web-phrase.ts"
import { automationTabComingSoonInfo } from "akasha/temper/web/phrase/pages/automation-tab-coming-soon-info.temper-web-phrase.ts"
import { automationTabCompanionAutomationInfo } from "akasha/temper/web/phrase/pages/automation-tab-companion-automation-info.temper-web-phrase.ts"
import { automationTabCompanionDefaults } from "akasha/temper/web/phrase/pages/automation-tab-companion-defaults.temper-web-phrase.ts"
import { automationTabConsumables } from "akasha/temper/web/phrase/pages/automation-tab-consumables.temper-web-phrase.ts"
import { automationTabConsumablesInfo } from "akasha/temper/web/phrase/pages/automation-tab-consumables-info.temper-web-phrase.ts"
import { automationTabCrafts } from "akasha/temper/web/phrase/pages/automation-tab-crafts.temper-web-phrase.ts"
import { automationTabDailyAutomationInfo } from "akasha/temper/web/phrase/pages/automation-tab-daily-automation-info.temper-web-phrase.ts"
import { automationTabDailyCraftsInfo } from "akasha/temper/web/phrase/pages/automation-tab-daily-crafts-info.temper-web-phrase.ts"
import { automationTabDailyWrits } from "akasha/temper/web/phrase/pages/automation-tab-daily-writs.temper-web-phrase.ts"
import { automationTabDailyWritsInfo } from "akasha/temper/web/phrase/pages/automation-tab-daily-writs-info.temper-web-phrase.ts"
import { automationTabEquipment } from "akasha/temper/web/phrase/pages/automation-tab-equipment.temper-web-phrase.ts"
import { automationTabFood } from "akasha/temper/web/phrase/pages/automation-tab-food.temper-web-phrase.ts"
import { automationTabLockWornGear } from "akasha/temper/web/phrase/pages/automation-tab-lock-worn-gear.temper-web-phrase.ts"
import { automationTabLockWornGearInfo } from "akasha/temper/web/phrase/pages/automation-tab-lock-worn-gear-info.temper-web-phrase.ts"
import { automationTabLockpicks } from "akasha/temper/web/phrase/pages/automation-tab-lockpicks.temper-web-phrase.ts"
import { automationTabMaintenance } from "akasha/temper/web/phrase/pages/automation-tab-maintenance.temper-web-phrase.ts"
import { automationTabMaintenanceInfo } from "akasha/temper/web/phrase/pages/automation-tab-maintenance-info.temper-web-phrase.ts"
import { automationTabMasterCraftsInfo } from "akasha/temper/web/phrase/pages/automation-tab-master-crafts-info.temper-web-phrase.ts"
import { automationTabMasterWrits } from "akasha/temper/web/phrase/pages/automation-tab-master-writs.temper-web-phrase.ts"
import { automationTabMasterWritsInfo } from "akasha/temper/web/phrase/pages/automation-tab-master-writs-info.temper-web-phrase.ts"
import { automationTabMoreInformation } from "akasha/temper/web/phrase/pages/automation-tab-more-information.temper-web-phrase.ts"
import { automationTabPotions } from "akasha/temper/web/phrase/pages/automation-tab-potions.temper-web-phrase.ts"
import { automationTabRecharge } from "akasha/temper/web/phrase/pages/automation-tab-recharge.temper-web-phrase.ts"
import { automationTabRepair } from "akasha/temper/web/phrase/pages/automation-tab-repair.temper-web-phrase.ts"
import { automationTabRepairKits } from "akasha/temper/web/phrase/pages/automation-tab-repair-kits.temper-web-phrase.ts"
import { automationTabSkills } from "akasha/temper/web/phrase/pages/automation-tab-skills.temper-web-phrase.ts"
import { automationTabSoulGems } from "akasha/temper/web/phrase/pages/automation-tab-soul-gems.temper-web-phrase.ts"
import { automationTabXpScrolls } from "akasha/temper/web/phrase/pages/automation-tab-xp-scrolls.temper-web-phrase.ts"
import { Info } from "lucide-react"

export function InfoPopover({ children }: { children: React.ReactNode }) {
  const phrase = usePhrase()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex cursor-pointer"
          aria-label={phrase(automationTabMoreInformation.slug)}
        >
          <Info className="size-3 text-tertiary" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="text-secondary text-sm">
        {children}
      </PopoverContent>
    </Popover>
  )
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading variant="subsection" className="text-base">
      {children}
    </Heading>
  )
}

export type CharToggleItem = BadgeToggleGroupItem & { value: keyof CharacterAutomationToggles }
export type CompToggleItem = BadgeToggleGroupItem & { value: keyof CompanionAutomationToggles }

export const CONSUMABLE_SLUGS: CharToggleItem[] = [
  { value: "food", label: automationTabFood.slug },
  { value: "potions", label: automationTabPotions.slug },
  { value: "soulGems", label: automationTabSoulGems.slug },
  { value: "repairKits", label: automationTabRepairKits.slug },
  { value: "lockpicks", label: automationTabLockpicks.slug },
  { value: "experienceScrolls", label: automationTabXpScrolls.slug },
]

export const MAINTENANCE_SLUGS: CharToggleItem[] = [
  { value: "equipment", label: automationTabEquipment.slug },
  { value: "recharge", label: automationTabRecharge.slug },
  { value: "repair", label: automationTabRepair.slug },
]

export const COMING_SOON_SLUGS: CharToggleItem[] = [
  { value: "skills", label: automationTabSkills.slug },
  { value: "championPoints", label: automationTabChampionPoints.slug },
  { value: "attributes", label: automationTabAttributes.slug },
]

export const WRIT_AUTOMATION_SLUGS: CharToggleItem[] = [
  { value: "dailyWritAutoCraft", label: automationTabAutoCraft.slug },
]

export const COMPANION_SLUGS: CompToggleItem[] = [
  { value: "equipment", label: automationTabEquipment.slug },
  { value: "skills", label: automationTabSkills.slug },
]

export function worded<T extends BadgeToggleGroupItem>(items: readonly T[], phrase: Phrase): T[] {
  return items.map((item) => ({ ...item, label: phrase(item.label) }))
}

export const AUTOMATION_TAB_WORDS = {
  characterDefaults: automationTabCharacterDefaults.slug,
  consumables: automationTabConsumables.slug,
  consumablesInfo: automationTabConsumablesInfo.slug,
  maintenance: automationTabMaintenance.slug,
  maintenanceInfo: automationTabMaintenanceInfo.slug,
  lockWornGear: automationTabLockWornGear.slug,
  lockWornGearInfo: automationTabLockWornGearInfo.slug,
  comingSoon: automationTabComingSoon.slug,
  comingSoonInfo: automationTabComingSoonInfo.slug,
  dailyWrits: automationTabDailyWrits.slug,
  dailyWritsInfo: automationTabDailyWritsInfo.slug,
  crafts: automationTabCrafts.slug,
  dailyCraftsInfo: automationTabDailyCraftsInfo.slug,
  automation: automationTabAutomation.slug,
  dailyAutomationInfo: automationTabDailyAutomationInfo.slug,
  masterWrits: automationTabMasterWrits.slug,
  masterWritsInfo: automationTabMasterWritsInfo.slug,
  masterCraftsInfo: automationTabMasterCraftsInfo.slug,
  companionDefaults: automationTabCompanionDefaults.slug,
  companionAutomationInfo: automationTabCompanionAutomationInfo.slug,
} as const
