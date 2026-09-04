import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import type {
  CategoryRule,
  InventoryRuleSettings,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

const CONTROLLED_CHARACTER_LOCK_WORN = "controlled:character:lock-worn"
const CONTROLLED_CHARACTER_EQUIPMENT = "controlled:character:equipment"
const CONTROLLED_CHARACTER_FOOD = "controlled:character:food"
const CONTROLLED_CHARACTER_DRINK = "controlled:character:drink"
const CONTROLLED_CHARACTER_POTIONS = "controlled:character:potions"
const CONTROLLED_CHARACTER_SOUL_GEMS = "controlled:character:soul-gems"
const CONTROLLED_CHARACTER_REPAIR_KITS = "controlled:character:repair-kits"
const CONTROLLED_CHARACTER_LOCKPICKS = "controlled:character:lockpicks"
const CONTROLLED_CHARACTER_EXPERIENCE_SCROLLS = "controlled:character:experience-scrolls"
const CONTROLLED_COMPANION_EQUIPMENT = "controlled:companion:equipment"

const CONTROLLED_RULE_ID_PREFIX = "controlled:"

export function isControlledRuleId(id: string): boolean {
  return id.startsWith(CONTROLLED_RULE_ID_PREFIX)
}

export interface ControlledRule extends CategoryRule {
  controlledBy: "automation"
  settingsPath: string
  displayCategoryLabel?: string
  description: string
}

const AUTOMATION_SETTINGS_PATH = "/settings?tab=automation"

function buildControlledCharacterRules(
  automationSettings: AutomationSettings
): readonly ControlledRule[] {
  const global = automationSettings.global?.characters
  const rules: ControlledRule[] = []

  const lockWornEnabled = global?.lockWornGear ?? true
  rules.push({
    id: CONTROLLED_CHARACTER_LOCK_WORN,
    title: lockWornEnabled ? "Lock worn gear" : "Protect worn gear",
    categoryId: "all",
    action: lockWornEnabled ? "lock" : "nothing",
    active: true,
    locked: true,
    conditions: { location: ["worn"], locked: "not-locked" },
    controlledBy: "automation",
    settingsPath: AUTOMATION_SETTINGS_PATH,
    description: lockWornEnabled
      ? "Applies a Temper Lock to any equipped (worn) item that isn't already locked, protecting your active gear from sell / deconstruct / destroy rules. Defaults on; disable via the Lock Worn Gear automation toggle."
      : "Worn gear is left untouched (Lock Worn Gear is off): this top-priority rule still claims every unlocked equipped item with a no-op action so it can't fall through to a sell / deconstruct / destroy rule.",
  })

  if (global?.equipment) {
    rules.push({
      id: CONTROLLED_CHARACTER_EQUIPMENT,
      title: "Equip target build gear",
      categoryId: "all",
      action: "character-equip",
      destination: "character-worn:by-priority",
      active: true,
      locked: true,
      conditions: { isTargetEquip: "is-target-equip", stolen: "not-stolen" },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      description:
        "Automatically equips gear from your target build, prioritized by rule order. Only non-stolen items matching your target build are equipped.",
    })
  }

  if (global?.food) {
    rules.push({
      id: CONTROLLED_CHARACTER_FOOD,
      title: "Stock food",
      categoryId: "food",
      action: "stock",
      stockScope: "any-character",
      destination: "bank",
      active: true,
      locked: true,
      conditions: { allStocked: "not-all-stocked", targetQuantity: 200, stolen: "not-stolen" },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      displayCategoryLabel: "Target Build Food",
      description:
        "Stocks up to 200 of your target build food in the bank for any character when not fully stocked.",
    })
  }

  if (global?.food) {
    rules.push({
      id: CONTROLLED_CHARACTER_DRINK,
      title: "Stock drink",
      categoryId: "drink",
      action: "stock",
      stockScope: "any-character",
      destination: "bank",
      active: true,
      locked: true,
      conditions: { allStocked: "not-all-stocked", targetQuantity: 200, stolen: "not-stolen" },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      displayCategoryLabel: "Target Build Drink",
      description:
        "Stocks up to 200 of your target build drink in the bank for any character when not fully stocked.",
    })
  }

  if (global?.potions) {
    rules.push({
      id: CONTROLLED_CHARACTER_POTIONS,
      title: "Stock potions",
      categoryId: "potions",
      action: "stock",
      stockScope: "any-character",
      destination: "bank",
      active: true,
      locked: true,
      conditions: { allStocked: "not-all-stocked", targetQuantity: 200, stolen: "not-stolen" },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      displayCategoryLabel: "Target Build Potions",
      description:
        "Stocks up to 200 of your target build potions in the bank for any character when not fully stocked.",
    })
  }

  if (global?.soulGems) {
    rules.push({
      id: CONTROLLED_CHARACTER_SOUL_GEMS,
      title: "Stock soul gems",
      categoryId: "soul-gems",
      action: "stock",
      active: true,
      locked: true,
      destinationChain: [
        {
          destination: "character:by-priority",
          targetQuantity: 200,
        },
        {
          destination: "bank",
        },
      ],
      conditions: {
        maxQuality: 2,
        qualityOp: ">=",
        stolen: "not-stolen",
      },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      description:
        "Stocks 200 soul gems total (Fine quality or above, aggregated across all matching gem types) on every character (lazy cross-character distribution via the bank) and banks all remaining soul gems.",
    })
  }

  if (global?.repairKits) {
    rules.push({
      id: CONTROLLED_CHARACTER_REPAIR_KITS,
      title: "Stock repair kits",
      categoryId: "equipment-repair-kits",
      action: "stock",
      active: true,
      locked: true,
      destinationChain: [
        {
          destination: "character:by-priority",
          targetQuantity: 200,
        },
        {
          destination: "bank",
        },
      ],
      conditions: { stolen: "not-stolen" },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      description:
        "Stocks 200 repair kits total (aggregated across all matching kit types) on every character (lazy cross-character distribution via the bank) and banks all remaining repair kits.",
    })
  }

  if (global?.lockpicks) {
    rules.push({
      id: CONTROLLED_CHARACTER_LOCKPICKS,
      title: "Stock lockpicks",
      categoryId: "lockpicks",
      action: "stock",
      active: true,
      locked: true,
      destinationChain: [
        {
          destination: "character:by-priority",
          targetQuantity: 200,
        },
        {
          destination: "bank",
        },
      ],
      conditions: { stolen: "not-stolen" },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      description:
        "Stocks 200 lockpicks on every character (lazy cross-character distribution via the bank) and banks all remaining lockpicks.",
    })
  }

  if (global?.experienceScrolls) {
    rules.push({
      id: CONTROLLED_CHARACTER_EXPERIENCE_SCROLLS,
      title: "Cascade experience scrolls",
      categoryId: "scrolls",
      action: "stock",
      active: true,
      locked: true,
      destinationChain: [
        {
          destination: "character:by-priority",
          targetQuantity: 5,
          charEligibility: { canLevelMorphs: { mode: "can-level" } },
        },
        {
          destination: "bank",
          targetQuantity: 200,
        },
        {
          destination: "house-storage:4677",
        },
      ],
      conditions: {
        itemNamePattern: "experience",
        stolen: "not-stolen",
      },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      description:
        "Stocks 5 experience scrolls total (across all matching scrolls) on every character that can still level morphs, banks the next 200 total, and overflows the rest to the Crown Items coffer.",
    })
  }

  return rules
}

function buildControlledCompanionRules(
  automationSettings: AutomationSettings
): readonly ControlledRule[] {
  const global = automationSettings.global?.companions
  const rules: ControlledRule[] = []

  if (global?.equipment) {
    rules.push({
      id: CONTROLLED_COMPANION_EQUIPMENT,
      title: "Equip companion target build gear",
      categoryId: "all",
      action: "companion-equip",
      destination: "companion-worn:by-priority",
      active: true,
      locked: true,
      conditions: {
        isTargetCompanionEquip: "is-target-companion-equip",
        canCompanionEquip: "can-companion-equip",
        stolen: "not-stolen",
      },
      controlledBy: "automation",
      settingsPath: AUTOMATION_SETTINGS_PATH,
      description:
        "Automatically equips companion gear from target builds, prioritized by rule order. Only non-stolen items that companions can equip and that match a target build are equipped.",
    })
  }

  return rules
}

export function buildAllControlledRules(automationSettings: AutomationSettings): {
  characterRules: readonly ControlledRule[]
  companionRules: readonly ControlledRule[]
} {
  return {
    characterRules: buildControlledCharacterRules(automationSettings),
    companionRules: buildControlledCompanionRules(automationSettings),
  }
}

export function migrateControlledRules(settings: InventoryRuleSettings): InventoryRuleSettings {
  const stockControlledCategoryIds = new Set([
    "food",
    "drink",
    "potions",
    "soul-gems",
    "repair-kits",
    "lockpicks",
  ])

  const filtered = settings.rules.filter((rule) => {
    if (
      rule.action === "stock" &&
      stockControlledCategoryIds.has(rule.categoryId) &&
      rule.conditions?.allStocked !== undefined &&
      Object.keys(rule.conditions).every((k) => k === "allStocked" || k === "targetQuantity")
    ) {
      return false
    }

    if (
      rule.action === "character-equip" &&
      rule.categoryId === "all" &&
      rule.conditions?.isTargetEquip === "is-target-equip"
    ) {
      return false
    }

    if (
      rule.action === "companion-equip" &&
      rule.categoryId === "all" &&
      rule.conditions?.isTargetCompanionEquip === "is-target-companion-equip"
    ) {
      return false
    }

    return true
  })

  return { ...settings, rules: filtered }
}
