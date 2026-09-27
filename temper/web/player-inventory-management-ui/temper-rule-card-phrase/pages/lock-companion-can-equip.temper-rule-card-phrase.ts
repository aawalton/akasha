import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockCompanionCanEquip = {
  id: "01a0e274-b2ac-7953-9596-d48012972933",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-companion-can-equip",
  title:
    "The {action} action requires the {filter} filter to ensure only items matching a companion's target build are equipped.",
  key: "lock-companion-can-equip",
  displayOrder: 37,
} as const satisfies TemperRuleCardPhrase
