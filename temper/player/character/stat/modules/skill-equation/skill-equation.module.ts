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
      statement:
        "A constant tagged `DmgShield` grows by the shield bonuses and Landslide stacks and is rounded.",
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
        "Ancient Knowledge with a lightning staff on the bar makes direct damage 12% stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caster inside its own Standard of Might deals damage 15% stronger.",
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
        "A damage or heal over time tagged with a duration and a tick totals its tick once for each tick.",
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
      decisionKind: "decision-kind/departure",
      statement: "Landslide on the caster adds 1% to the bonuses damage takes, at any stack count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stack of Landslide makes damage 1% stronger, after the bonuses multiply it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stack of Landslide makes a damage shield 1% stronger, added to its bonuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each stack of Landslide makes a heal 1% stronger, rounded before the healing done grows it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A reading gives Merciless Charge no stacks, so the numbers its stacks grow are gaps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal is rounded, grown by the build's healing done, and rounded again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal's stat term and power term are each rounded down before they are summed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal scaling off Max Health is not rounded down before it is rounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The healing done is the Healing Done Temper works out for the build, not a tooltip.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A heal over time grows each tick by the healing done before the ticks are summed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One tagged `own duration` takes its tagged duration, as the game's is another effect's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One tagged `per tick` is a tooltip giving a single tick rather than the total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Emerald Moss adds 5% healing done to a Green Balance heal for each Green Balance skill on its bar.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Every reading read holds one Green Balance skill on the bar and no other healing done.",
    },
  ],
  createdAt: "2026-10-15T15:45:56.553Z",
  updatedAt: "2026-10-21T07:52:35.822Z",
} as const satisfies Module
