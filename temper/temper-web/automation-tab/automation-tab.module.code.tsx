"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { Heading } from "@akasha/design-primitives/heading"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { Switch } from "@akasha/design-primitives/switch-control"
import type {
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "@akasha/temper-build-support/automation-settings"
import { useAutomationSettings } from "@akasha/temper-player-inventory-management-ui/hooks-inventory-settings"
import { Info } from "lucide-react"
import { useMemo } from "react"

function InfoPopover({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="inline-flex cursor-pointer" aria-label="More information">
          <Info className="size-3 text-tertiary" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="text-secondary text-sm">
        {children}
      </PopoverContent>
    </Popover>
  )
}

type CharToggleItem = BadgeToggleGroupItem & { value: keyof CharacterAutomationToggles }
type CompToggleItem = BadgeToggleGroupItem & { value: keyof CompanionAutomationToggles }

const CONSUMABLE_ITEMS: CharToggleItem[] = [
  { value: "food", label: "Food / Drink" },
  { value: "potions", label: "Potions" },
  { value: "soulGems", label: "Soul Gems" },
  { value: "repairKits", label: "Repair Kits" },
  { value: "lockpicks", label: "Lockpicks" },
  { value: "experienceScrolls", label: "XP Scrolls" },
]

const MAINTENANCE_ITEMS: CharToggleItem[] = [
  { value: "equipment", label: "Equipment" },
  { value: "recharge", label: "Recharge" },
  { value: "repair", label: "Repair" },
]

const COMING_SOON_ITEMS: CharToggleItem[] = [
  { value: "skills", label: "Skills" },
  { value: "championPoints", label: "Champion Points" },
  { value: "attributes", label: "Attributes" },
]

const WRIT_CRAFT_ITEMS: CharToggleItem[] = [
  { value: "dailyWritBlacksmithing", label: "Blacksmithing" },
  { value: "dailyWritClothier", label: "Clothier" },
  { value: "dailyWritWoodworking", label: "Woodworking" },
  { value: "dailyWritJewelrycrafting", label: "Jewelrycrafting" },
  { value: "dailyWritEnchanting", label: "Enchanting" },
  { value: "dailyWritAlchemy", label: "Alchemy" },
  { value: "dailyWritProvisioning", label: "Provisioning" },
]

const WRIT_AUTOMATION_ITEMS: CharToggleItem[] = [
  { value: "dailyWritAutoCraft", label: "Auto-Craft" },
]

const MASTER_WRIT_CRAFT_ITEMS: CharToggleItem[] = [
  { value: "masterWritBlacksmithing", label: "Blacksmithing" },
  { value: "masterWritClothier", label: "Clothier" },
  { value: "masterWritWoodworking", label: "Woodworking" },
  { value: "masterWritJewelrycrafting", label: "Jewelrycrafting" },
  { value: "masterWritEnchanting", label: "Enchanting" },
  { value: "masterWritAlchemy", label: "Alchemy" },
  { value: "masterWritProvisioning", label: "Provisioning" },
]

const COMPANION_ITEMS: CompToggleItem[] = [
  { value: "equipment", label: "Equipment" },
  { value: "skills", label: "Skills" },
]

interface AutomationTabProps {
  active: boolean
}

export function AutomationTab({ active }: AutomationTabProps) {
  const { automationSettings, updateGlobalCharacterToggle, updateGlobalCompanionToggle } =
    useAutomationSettings()

  const globalChar = automationSettings.global?.characters
  const globalComp = automationSettings.global?.companions

  const consumableSelected = useMemo(
    () => CONSUMABLE_ITEMS.filter((item) => globalChar?.[item.value]),
    [globalChar]
  )

  const maintenanceSelected = useMemo(
    () => MAINTENANCE_ITEMS.filter((item) => globalChar?.[item.value]),
    [globalChar]
  )

  const comingSoonSelected = useMemo(
    () => COMING_SOON_ITEMS.filter((item) => globalChar?.[item.value]),
    [globalChar]
  )

  const writCraftSelected = useMemo(
    () => WRIT_CRAFT_ITEMS.filter((item) => globalChar?.[item.value]),
    [globalChar]
  )

  const writAutomationSelected = useMemo(
    () => WRIT_AUTOMATION_ITEMS.filter((item) => globalChar?.[item.value]),
    [globalChar]
  )

  const masterWritCraftSelected = useMemo(
    () => MASTER_WRIT_CRAFT_ITEMS.filter((item) => globalChar?.[item.value]),
    [globalChar]
  )

  const companionSelected = useMemo(
    () => COMPANION_ITEMS.filter((item) => globalComp?.[item.value]),
    [globalComp]
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
      <PanelCard id="character-defaults" title="Character Defaults">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Consumables
              </Heading>
              <InfoPopover>
                Automatically stock consumable items for all characters: food/drink, potions, soul
                gems, repair kits, lockpicks, and XP scrolls.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={CONSUMABLE_ITEMS}
              value={consumableSelected}
              onSelect={(items) => handleCharToggle(items, CONSUMABLE_ITEMS, consumableSelected)}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Maintenance
              </Heading>
              <InfoPopover>
                Automatically manage equipment for all characters: equip gear to match builds,
                recharge enchantments, and repair damage.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={MAINTENANCE_ITEMS}
              value={maintenanceSelected}
              onSelect={(items) => handleCharToggle(items, MAINTENANCE_ITEMS, maintenanceSelected)}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Lock Worn Gear
              </Heading>
              <InfoPopover>
                Automatically Temper-Lock equipped gear so it can't be sold or deconstructed. On by
                default.
              </InfoPopover>
            </div>
            <Switch
              checked={lockWornGearEnabled}
              onCheckedChange={(checked) => updateGlobalCharacterToggle("lockWornGear", checked)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Coming Soon
              </Heading>
              <InfoPopover>
                These toggles will take effect once addon support is added: skill bars, champion
                points, and attribute allocation.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={COMING_SOON_ITEMS}
              value={comingSoonSelected}
              onSelect={(items) => handleCharToggle(items, COMING_SOON_ITEMS, comingSoonSelected)}
              disabled
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard id="daily-writs" title="Daily Writs">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Daily Writs
              </Heading>
              <InfoPopover>Enable automated daily writ crafting for all characters.</InfoPopover>
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
              <Heading variant="subsection" className="text-base">
                Crafts
              </Heading>
              <InfoPopover>
                Select which crafting professions to include in daily writ automation.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={WRIT_CRAFT_ITEMS}
              value={writCraftSelected}
              onSelect={(items) => handleCharToggle(items, WRIT_CRAFT_ITEMS, writCraftSelected)}
              disabled={!dailyWritsEnabled}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Automation
              </Heading>
              <InfoPopover>
                Auto-craft at stations and auto-accept/complete writ quests.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={WRIT_AUTOMATION_ITEMS}
              value={writAutomationSelected}
              onSelect={(items) =>
                handleCharToggle(items, WRIT_AUTOMATION_ITEMS, writAutomationSelected)
              }
              disabled={!dailyWritsEnabled}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard id="master-writs" title="Master Writs">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Master Writs
              </Heading>
              <InfoPopover>
                Enable automated master-writ (sealed writ) crafting for all characters. Off by
                default — master writs consume expensive materials. Independent of daily writs.
              </InfoPopover>
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
              <Heading variant="subsection" className="text-base">
                Crafts
              </Heading>
              <InfoPopover>
                Select which crafting professions to include in master-writ automation.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={MASTER_WRIT_CRAFT_ITEMS}
              value={masterWritCraftSelected}
              onSelect={(items) =>
                handleCharToggle(items, MASTER_WRIT_CRAFT_ITEMS, masterWritCraftSelected)
              }
              disabled={!masterWritsEnabled}
              unselectedVariant="elevation-muted"
              wrap
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard id="companion-defaults" title="Companion Defaults">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Heading variant="subsection" className="text-base">
                Automation
              </Heading>
              <InfoPopover>
                Automatically equip gear and skills to match companion builds.
              </InfoPopover>
            </div>
            <BadgeToggleGroup
              items={COMPANION_ITEMS}
              value={companionSelected}
              onSelect={(items) => {
                for (const item of COMPANION_ITEMS) {
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
