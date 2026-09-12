import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperQuestsAddon = {
  id: "01a0635f-391c-765a-af94-26f3ecd9702f",
  type: "eso-addon",
  slug: "temper-quests-addon",
  definition: "the addon answering a quest giver's dialogue in the player's place",

  addonManifest: "json",
  bundleEntry: "quests-entry",
  parts: [
    "module/quests-auto-quest",
    "module/quests-chatter-name-tables",
    "module/quests-chatter-names",
    "module/quests-classify",
    "module/quests-constants",
    "module/quests-decide",
    "module/quests-entry",
    "module/quests-public-api",
    "module/quests-saved-variables",
    "module/quests-slash-commands",
    "module/quests-trace",
    "module/quests-trace-buffer",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The options the dialogue offers are read afresh rather than remembered between reads.",
    },
    {
      invariantKind: "departure",
      statement: "A quest option is taken ahead of an option offering something else.",
    },
    {
      invariantKind: "departure",
      statement: "An option already taken at one menu is not taken again at that menu.",
    },
    {
      invariantKind: "departure",
      statement: "A menu offering a service the player did not ask for is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The addon steps away once nothing in the dialogue is left to do.",
    },
    {
      invariantKind: "constraint",
      statement: "The game hands one dialogue option at a time rather than a whole menu.",
    },
  ],
} as const satisfies EsoAddon
