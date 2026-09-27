"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { Switch } from "akasha/design/interface/primitive/modules/switch-control/switch-control.module.code.tsx"
import {
  type CharToggleItem,
  COMING_SOON_SLUGS,
  COMPANION_SLUGS,
  CONSUMABLE_SLUGS,
  InfoPopover,
  MAINTENANCE_SLUGS,
  SubHeading,
  WRIT_AUTOMATION_SLUGS,
  worded,
  AUTOMATION_TAB_WORDS as words,
} from "akasha/temper/web/modules/automation-tab-wording/automation-tab-wording.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { useWritCraftItems } from "akasha/temper/web/modules/writ-craft-items/writ-craft-items.module.code.ts"
import { useAutomationSettings } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { useMemo } from "react"

interface AutomationTabProps {
  active: boolean
}

export function AutomationTab({ active }: AutomationTabProps) {
  const { automationSettings, updateGlobalCharacterToggle, updateGlobalCompanionToggle } =
    useAutomationSettings()
  const phrase = usePhrase()

  const consumableItems = useMemo(() => worded(CONSUMABLE_SLUGS, phrase), [phrase])
  const maintenanceItems = useMemo(() => worded(MAINTENANCE_SLUGS, phrase), [phrase])
  const comingSoonItems = useMemo(() => worded(COMING_SOON_SLUGS, phrase), [phrase])
  const writAutomationItems = useMemo(() => worded(WRIT_AUTOMATION_SLUGS, phrase), [phrase])
  const companionItems = useMemo(() => worded(COMPANION_SLUGS, phrase), [phrase])

  const globalChar = automationSettings.global?.characters
  const globalComp = automationSettings.global?.companions

  const consumableSelected = useMemo(
    () => consumableItems.filter((item) => globalChar?.[item.value]),
    [globalChar, consumableItems]
  )

  const maintenanceSelected = useMemo(
    () => maintenanceItems.filter((item) => globalChar?.[item.value]),
    [globalChar, maintenanceItems]
  )

  const comingSoonSelected = useMemo(
    () => comingSoonItems.filter((item) => globalChar?.[item.value]),
    [globalChar, comingSoonItems]
  )

  const { writCraftItems, masterWritCraftItems } = useWritCraftItems()

  const writCraftSelected = useMemo(
    () => writCraftItems.filter((item) => globalChar?.[item.value]),
    [globalChar, writCraftItems]
  )

  const writAutomationSelected = useMemo(
    () => writAutomationItems.filter((item) => globalChar?.[item.value]),
    [globalChar, writAutomationItems]
  )

  const masterWritCraftSelected = useMemo(
    () => masterWritCraftItems.filter((item) => globalChar?.[item.value]),
    [globalChar, masterWritCraftItems]
  )

  const companionSelected = useMemo(
    () => companionItems.filter((item) => globalComp?.[item.value]),
    [globalComp, companionItems]
  )

  if (!active) return null

  function handleCharToggle(
    items: readonly BadgeToggleGroupItem[],
    allItems: readonly CharToggleItem[],
    selected: readonly BadgeToggleGroupItem[]
  ) {
    for (const item of allItems) {
      const wasOn = selected.some((s) => s.value === item.value)
      const isOn = items.some((s) => s.value === item.value)
      if (wasOn !== isOn) {
        updateGlobalCharacterToggle(item.value, isOn)
      }
    }
  }

  const dailyWritsEnabled = globalChar?.dailyWrits ?? false
  const masterWritsEnabled = globalChar?.masterWrits ?? false
  const lockWornGearEnabled = globalChar?.lockWornGear ?? true

  return (
    <ResponsiveColumns>
      <PanelCard id="character-defaults" title={phrase(words.characterDefaults)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.consumables)}</SubHeading>
              <InfoPopover>{phrase(words.consumablesInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={consumableItems}
              value={consumableSelected}
              onSelect={(items) => handleCharToggle(items, consumableItems, consumableSelected)}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.maintenance)}</SubHeading>
              <InfoPopover>{phrase(words.maintenanceInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={maintenanceItems}
              value={maintenanceSelected}
              onSelect={(items) => handleCharToggle(items, maintenanceItems, maintenanceSelected)}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.lockWornGear)}</SubHeading>
              <InfoPopover>{phrase(words.lockWornGearInfo)}</InfoPopover>
            </div>
            <Switch
              checked={lockWornGearEnabled}
              onCheckedChange={(checked) => updateGlobalCharacterToggle("lockWornGear", checked)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.comingSoon)}</SubHeading>
              <InfoPopover>{phrase(words.comingSoonInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={comingSoonItems}
              value={comingSoonSelected}
              onSelect={(items) => handleCharToggle(items, comingSoonItems, comingSoonSelected)}
              disabled
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard id="daily-writs" title={phrase(words.dailyWrits)}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.dailyWrits)}</SubHeading>
              <InfoPopover>{phrase(words.dailyWritsInfo)}</InfoPopover>
            </div>
            <Switch
              checked={dailyWritsEnabled}
              onCheckedChange={(checked) => {
                updateGlobalCharacterToggle("dailyWrits", checked)
                updateGlobalCharacterToggle("dailyWritBlacksmithing", checked)
                updateGlobalCharacterToggle("dailyWritClothier", checked)
                updateGlobalCharacterToggle("dailyWritWoodworking", checked)
                updateGlobalCharacterToggle("dailyWritJewelrycrafting", checked)
                updateGlobalCharacterToggle("dailyWritEnchanting", checked)
                updateGlobalCharacterToggle("dailyWritAlchemy", checked)
                updateGlobalCharacterToggle("dailyWritProvisioning", checked)
                updateGlobalCharacterToggle("dailyWritAutoCraft", checked)
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.crafts)}</SubHeading>
              <InfoPopover>{phrase(words.dailyCraftsInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={writCraftItems}
              value={writCraftSelected}
              onSelect={(items) => handleCharToggle(items, writCraftItems, writCraftSelected)}
              disabled={!dailyWritsEnabled}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.automation)}</SubHeading>
              <InfoPopover>{phrase(words.dailyAutomationInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={writAutomationItems}
              value={writAutomationSelected}
              onSelect={(items) =>
                handleCharToggle(items, writAutomationItems, writAutomationSelected)
              }
              disabled={!dailyWritsEnabled}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard id="master-writs" title={phrase(words.masterWrits)}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.masterWrits)}</SubHeading>
              <InfoPopover>{phrase(words.masterWritsInfo)}</InfoPopover>
            </div>
            <Switch
              checked={masterWritsEnabled}
              onCheckedChange={(checked) => {
                updateGlobalCharacterToggle("masterWrits", checked)
                updateGlobalCharacterToggle("masterWritBlacksmithing", checked)
                updateGlobalCharacterToggle("masterWritClothier", checked)
                updateGlobalCharacterToggle("masterWritWoodworking", checked)
                updateGlobalCharacterToggle("masterWritJewelrycrafting", checked)
                updateGlobalCharacterToggle("masterWritEnchanting", checked)
                updateGlobalCharacterToggle("masterWritAlchemy", checked)
                updateGlobalCharacterToggle("masterWritProvisioning", checked)
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.crafts)}</SubHeading>
              <InfoPopover>{phrase(words.masterCraftsInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={masterWritCraftItems}
              value={masterWritCraftSelected}
              onSelect={(items) =>
                handleCharToggle(items, masterWritCraftItems, masterWritCraftSelected)
              }
              disabled={!masterWritsEnabled}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard id="companion-defaults" title={phrase(words.companionDefaults)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <SubHeading>{phrase(words.automation)}</SubHeading>
              <InfoPopover>{phrase(words.companionAutomationInfo)}</InfoPopover>
            </div>
            <BadgeToggleGroup
              items={companionItems}
              value={companionSelected}
              onSelect={(items) => {
                for (const item of companionItems) {
                  const wasOn = companionSelected.some((s) => s.value === item.value)
                  const isOn = items.some((s) => s.value === item.value)
                  if (wasOn !== isOn) {
                    updateGlobalCompanionToggle(item.value, isOn)
                  }
                }
              }}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>
    </ResponsiveColumns>
  )
}
