import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponAttacks = {
  id: "01a1557c-462c-7d40-af65-f5dd2f7cd3fc",
  type: "page-type/module",
  slug: "weapon-attacks",
  definition: "the damage one light attack and one heavy attack deal with the weapons on a bar",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attack's damage is UESP's update 51 equation for that weapon's attack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation scales off the higher of Max Magicka and Max Stamina.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation scales off the higher of Weapon Damage and Spell Damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heavy attack deals every damage line UESP fits for it once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A one-handed weapon is dual wield beside another one-handed weapon, and one-hand otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar with no weapon in its main hand has attacks that deal nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bar's style is read from the weapon types its two hands hold, by Bun or by Lua.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "An attack lands on one enemy, without a critical strike or any modifier.",
    },
  ],
  createdAt: "2026-10-19T18:46:10.220Z",
  updatedAt: "2026-10-19T19:29:35.119Z",
} as const satisfies Module
