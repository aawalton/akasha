import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillEquation = {
  id: "01a1403d-d551-75df-ac1b-9f48985d15c4",
  type: "page-type/module",
  slug: "skill-equation",
  definition: "a number a skill's tooltip names, worked out from the equation UESP fit for it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation sums each stat times its coefficient, and a constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stat is the higher of Magicka and Stamina, the power the higher of the two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation naming a variable no stat here reads gives no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tooltip's numbers are the ones the game colors, in the order the text gives them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip's numbers pair in order with the equations that name a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip naming more or fewer numbers than those equations is left unpaired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number scaling off a stat is rounded to a whole number, and a constant is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A constant tagged `+N seconds with <passive>` grows N seconds where the build holds that passive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage shield is rounded down, after the bonuses the build holds multiply it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bastion slotted makes a damage shield 15% stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bonuses the build holds add to each other before they multiply the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield tagged `at most half Health` stops at half the build's Max Health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Damage is rounded down, after the damage stars the build slots multiply it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Master-at-Arms slotted makes direct damage 6% stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Thaumaturge slotted makes damage over time 6% stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Biting Aura slotted makes area damage 6% stronger, and Deadly Aim single-target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Minor Berserk on the caster makes damage 5% stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Damage reads a power that War Mage, Mighty and Wrathful Strikes add to before buffs grow it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "War Mage at 30 points adds 100 power to magical damage, and Mighty at 30 to martial damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wrathful Strikes slotted adds 205 power to damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A damage over time tagged with a duration and a tick totals its tick once for each tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its ticks are the game's duration for the skill over its tick, to the nearest one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One tagged `ticks on application` ticks once more, as it is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill the game gives no duration takes the duration its equation is tagged with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Major Brutality grows power 20%, Minor Brutality 10%, and Agility 2% a medium piece worn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The power grown that way is a whole number, as the stat sheet's power is.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Only 0 and 30 points of War Mage and Mighty have been read, so fewer than 30 add nothing.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A pet's damage is worked as the caster's own, and its numbers are kept as gaps.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A buff that stacks on the caster is not read, and the numbers it grows are gaps.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A heal is worked without the build's healing done until where the game rounds a heal is read.",
    },
  ],
  createdAt: "2026-10-15T15:45:56.553Z",
  updatedAt: "2026-10-21T04:27:46.146Z",
} as const satisfies Module
