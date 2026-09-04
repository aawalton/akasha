import type {
  CompletionCategoryNode,
  CompletionTab,
} from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"

export const COMPLETION_CATEGORY_TREE_STATIC = {
  account: [
    {
      id: "account-achievements",
      name: "Achievements",
    },
    {
      id: "antiquity-leads-legendary",
      name: "Antiquity Leads — Legendary",
    },
    {
      id: "antiquity-leads-motifs",
      name: "Antiquity Leads — Motifs",
    },
    {
      id: "antiquity-lore",
      name: "Antiquity Lore",
    },
    {
      id: "bank-upgrades",
      name: "Bank Upgrades",
    },
    {
      id: "champion-points",
      name: "Champion Points",
    },
    {
      id: "collectibles",
      name: "Collectibles",
    },
    {
      id: "grand-master-stations",
      name: "Grand Master Crafting Stations",
    },
    {
      id: "account-recipes",
      name: "Crafting Recipes",
    },
    {
      id: "account-trait-research",
      name: "Crafting Traits",
    },
    {
      id: "item-sets",
      name: "Item Sets",
    },
    {
      id: "lore-library",
      name: "Lore Library",
    },
    {
      id: "account-points-of-interest",
      name: "Points of Interest",
    },
    {
      id: "account-quests",
      name: "Quests",
    },
    {
      id: "account-scribing-knowledge",
      name: "Skill Scribing",
      children: [
        {
          id: "grimoires",
          name: "Grimoires",
        },
        {
          id: "scripts",
          name: "Scripts",
          children: [
            {
              id: "focusScripts",
              name: "Focus Scripts",
            },
            {
              id: "signatureScripts",
              name: "Signature Scripts",
            },
            {
              id: "affixScripts",
              name: "Affix Scripts",
            },
          ],
        },
      ],
    },
    {
      id: "subclassing-skill-lines",
      name: "Subclassing Skill Lines",
    },
    {
      id: "subclassing-skill-morphs",
      name: "Subclassing Skill Morphs",
    },
    {
      id: "tales-of-tribute",
      name: "Tales of Tribute",
    },
    {
      id: "account-zone-completion",
      name: "Zone Completion",
    },
  ],
  characters: [
    {
      id: "character-achievements",
      name: "Achievements",
    },
    {
      id: "alliance-rank",
      name: "Alliance Rank",
    },
    {
      id: "cadwells-almanac",
      name: "Cadwell's Almanac",
    },
    {
      id: "character-level",
      name: "Character Level",
    },
    {
      id: "companion-quests",
      name: "Companion Quests",
    },
    {
      id: "daily-writs",
      name: "Daily Crafting Writs",
    },
    {
      id: "companion-rapport-character",
      name: "Companion Rapport",
    },
    {
      id: "recipes",
      name: "Crafting Recipes",
    },
    {
      id: "trait-research",
      name: "Crafting Traits",
    },
    {
      id: "lore-library-character",
      name: "Lore Library",
    },
    {
      id: "mount-training",
      name: "Mount Training",
    },
    {
      id: "pack-upgrades",
      name: "Pack Upgrades",
    },
    {
      id: "points-of-interest",
      name: "Points of Interest",
    },
    {
      id: "quests",
      name: "Quests",
    },
    {
      id: "skill-lines",
      name: "Skill Lines",
    },
    {
      id: "skill-morphs",
      name: "Skill Morphs",
    },
    {
      id: "skill-points",
      name: "Skill Points",
      children: [
        {
          id: "general",
          name: "General",
        },
        {
          id: "skyshards",
          name: "Skyshards",
        },
        {
          id: "zoneQuests",
          name: "Zone Quests",
        },
        {
          id: "groupDungeons",
          name: "Group Dungeons",
        },
        {
          id: "publicDungeons",
          name: "Public Dungeons",
        },
      ],
    },
    {
      id: "scribing-knowledge",
      name: "Skill Scribing",
      children: [
        {
          id: "grimoires",
          name: "Grimoires",
        },
        {
          id: "scripts",
          name: "Scripts",
          children: [
            {
              id: "focusScripts",
              name: "Focus Scripts",
            },
            {
              id: "signatureScripts",
              name: "Signature Scripts",
            },
            {
              id: "affixScripts",
              name: "Affix Scripts",
            },
          ],
        },
      ],
    },
    {
      id: "zone-completion",
      name: "Zone Completion",
    },
  ],
  companions: [
    {
      id: "companion-level",
      name: "Companion Level",
    },
    {
      id: "companion-quests-union",
      name: "Companion Quests",
    },
    {
      id: "companion-rapport",
      name: "Companion Rapport",
    },
    {
      id: "companion-skill-lines",
      name: "Companion Skill Lines",
    },
  ],
} as const satisfies Record<CompletionTab, readonly CompletionCategoryNode[]>
