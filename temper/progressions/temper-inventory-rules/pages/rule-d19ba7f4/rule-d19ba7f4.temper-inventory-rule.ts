import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleD19ba7f4 = {
  id: "01a0728b-2e7b-7708-a913-00f687d375ef",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-d19ba7f4",
  title: "Protect locked items",
  description:
    "Does nothing to any item the player has locked in-game (ESO item lock), across all categories. Locked is an explicit user signal to protect an item from sell / deconstruct / move; this rule honors it by claiming locked items first so no lower-priority rule can act on them. Positioned at the top of the user rules. NOTE: the 7 automation-controlled stock rules (food, drink, potions, soul-gems, repair-kits, lockpicks, scrolls) are prepended ABOVE all user rules at export, so a locked item in one of those categories can still be stocked/moved by a controlled rule before reaching this guard — protecting those would require a controlled-rule change.",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "all",
  displayOrder: 4,
  action: "nothing",
  active: true,
  updatedAt: "2026-06-01T12:35:49.494Z",
} as const satisfies TemperInventoryRule
