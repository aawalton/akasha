import type { GrimoireTemplate } from "../grimoire-template/grimoire-template.module.code.ts"

export const SCRIBING_GRIMOIRES_00 = {
  "vault": {
    id: "vault",
    name: "Vault",
    icon: "/esoui/art/icons/item_grimoire_bow.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_bow.dds",
    skillLineId: "weapon-bow",
    itemId: 204485,
    uespId: 1,
    compatibleFocusScripts: [
      "bleed-damage",
      "disease-damage",
      "flame-damage",
      "healing",
      "immobilize",
      "physical-damage",
      "poison-damage",
      "taunt",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "class-mastery",
      "sages-remedy",
      "druids-resurgence",
      "thiefs-swiftness",
      "crusaders-defiance",
      "wayfarers-mastery",
    ],
    compatibleAffixScripts: [
      "off-balance",
      "savagery-and-prophecy",
      "expedition",
      "evasion",
      "berserk",
      "brutality-and-sorcery",
      "intellect-and-endurance",
      "force",
      "vulnerability",
      "maim",
      "lifesteal",
    ],
    signatureScripts: {
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "crusaders-defiance": {
        scriptId: "crusaders-defiance",
        description: "Removes up to 3 snares or immobilization effects.",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description: "Restores 1200 Stamina over 10 seconds.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description: "Reduces the Movement Speed of enemies by 40% for 5 seconds.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2980 Physical Damage over 20 seconds to enemies.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals for 1790 Health over 10 seconds.",
      },
      "thiefs-swiftness": {
        scriptId: "thiefs-swiftness",
        description:
          "Removes a stack of the Roll Dodge cost penalty and reduces fall damage taken by 15% for 20 seconds.",
      },
      "wayfarers-mastery": {
        scriptId: "wayfarers-mastery",
        description: "Grants the bonus of the Hawk Eye passive ability.",
      },
    },
    affixScripts: {
      "berserk": {
        scriptId: "berserk",
        description: "Grants Minor Berserk for 20 seconds, increasing damage done by 5%.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "evasion": {
        scriptId: "evasion",
        description:
          "Grants you Major Evasion for 10 seconds, reducing damage from area attacks by 20%.",
      },
      "expedition": {
        scriptId: "expedition",
        description: "Grants Minor Expedition for 20 seconds, increasing Movement Speed by 15%.",
      },
      "force": {
        scriptId: "force",
        description: "Grants Minor Force for 20 seconds, increasing Critical Damage by 10%.",
      },
      "intellect-and-endurance": {
        scriptId: "intellect-and-endurance",
        description:
          "Grants Minor Intellect and Minor Endurance for 20 seconds, increasing Magicka and Stamina Recovery by 15%.",
      },
      "lifesteal": {
        scriptId: "lifesteal",
        description:
          "Afflicts enemies with Minor Lifesteal for 20 seconds, healing attackers for 600 Health every 1 second.",
      },
      "maim": {
        scriptId: "maim",
        description: "Afflicts enemies with Minor Maim for 20 seconds, reducing damage done by 5%.",
      },
      "off-balance": {
        scriptId: "off-balance",
        description: "Sets enemies Off Balance for 7 seconds.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
      "vulnerability": {
        scriptId: "vulnerability",
        description:
          "Afflicts enemies with Minor Vulnerability for 20 seconds, increasing damage taken by 5%.",
      },
    },
  },
  "wield-soul": {
    id: "wield-soul",
    name: "Wield Soul",
    icon: "/esoui/art/icons/item_grimoire_soulmagic1.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
    skillLineId: "world-soul-magic",
    itemId: 204491,
    uespId: 2,
    compatibleFocusScripts: [
      "bleed-damage",
      "damage-shield",
      "disease-damage",
      "flame-damage",
      "frost-damage",
      "healing",
      "magic-damage",
      "physical-damage",
      "pull",
      "shock-damage",
      "stun",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "anchorites-cruelty",
      "class-mastery",
      "sages-remedy",
      "druids-resurgence",
      "anchorites-potency",
    ],
    compatibleAffixScripts: [
      "savagery-and-prophecy",
      "resolve",
      "vitality",
      "brutality-and-sorcery",
      "empower",
      "intellect-and-endurance",
      "maim",
      "cowardice",
      "breach",
      "defile",
    ],
    signatureScripts: {
      "anchorites-cruelty": {
        scriptId: "anchorites-cruelty",
        description:
          "Consumes a Soul Gem to deal 1.5% of the enemy's Max Health as Oblivion Damage every 1 second for 5 seconds, up to a maximum of 1500 damage. Deals up to 100% more damage to enemies under 50% Health and can occur once every 5 seconds.",
      },
      "anchorites-potency": {
        scriptId: "anchorites-potency",
        description:
          "If in combat, consumes a Soul Gem to generate 4 Ultimate, up to once every 5 seconds.",
      },
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description: "Restores 600 Magicka and 600 Stamina.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 1790 Magic Damage over 10 seconds to the enemy.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals for 1435 Health over 10 seconds.",
      },
    },
    affixScripts: {
      "breach": {
        scriptId: "breach",
        description:
          "Afflicts the enemy with Major Breach for 10 seconds, reducing Physical and Spell Resistance by 5948.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "cowardice": {
        scriptId: "cowardice",
        description:
          "Afflicts the enemy with Major Cowardice for 10 seconds, reducing Weapon and Spell Damage by 430.",
      },
      "defile": {
        scriptId: "defile",
        description:
          "Afflicts the enemy with Major Defile, which reduces healing received and damage shield strength by 12% for 10 seconds.",
      },
      "empower": {
        scriptId: "empower",
        description:
          "Grants Empower for 10 seconds, increasing the damage of Heavy Attacks against monsters by 70%.",
      },
      "intellect-and-endurance": {
        scriptId: "intellect-and-endurance",
        description:
          "Grants Major Intellect and Major Endurance, increasing Magicka and Stamina Recovery by 30% for 10 seconds.",
      },
      "maim": {
        scriptId: "maim",
        description:
          "Afflicts the enemy with Major Maim for 10 seconds, reducing damage done by 10%.",
      },
      "resolve": {
        scriptId: "resolve",
        description:
          "Grants Major Resolve for 10 seconds, increasing Physical and Spell Resistance by 5948.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
      "vitality": {
        scriptId: "vitality",
        description:
          "Grants Major Vitality for 10 seconds, increasing healing received and damage shield strength by 12%.",
      },
    },
  },
  "shield-throw": {
    id: "shield-throw",
    name: "Shield Throw",
    icon: "/esoui/art/icons/item_grimoire_1hander.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_1handed.dds",
    skillLineId: "weapon-one-hand-and-shield",
    itemId: 204486,
    uespId: 3,
    compatibleFocusScripts: [
      "frost-damage",
      "immobilize",
      "knockback",
      "magic-damage",
      "multi-target",
      "physical-damage",
      "pull",
      "taunt",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "knights-valor",
      "class-mastery",
      "sages-remedy",
      "druids-resurgence",
      "thiefs-swiftness",
      "fencers-parry",
      "wayfarers-mastery",
    ],
    compatibleAffixScripts: [
      "off-balance",
      "interrupt",
      "savagery-and-prophecy",
      "resolve",
      "evasion",
      "vitality",
      "brutality-and-sorcery",
      "maim",
      "cowardice",
      "enervation",
    ],
    signatureScripts: {
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Create an 8 meter area for 2 seconds under your target once every 8 seconds that snares enemies by 70%, and charms them for 3 seconds when it expires. If no enemies are charmed, you restore 1435 Magicka and Stamina.",
        classId: "warden",
      },
      "druids-resurgence": {
        scriptId: "druids-resurgence",
        description:
          "Increases your Health, Magicka, and Stamina Recovery by 165 for 10 seconds on return.",
      },
      "fencers-parry": {
        scriptId: "fencers-parry",
        description:
          "Deflects the next direct damage attack made against you within 3 seconds on return. This can occur once every 3 seconds.",
      },
      "knights-valor": {
        scriptId: "knights-valor",
        description: "Deals 1 Physical Damage and Bashes the enemy.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description:
          "Deals 1790 Physical Damage over 10 seconds to the enemy. This effect can trigger your weapon enchantment.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals you for 2046 Health on return, scaling off your Max Health.",
      },
      "thiefs-swiftness": {
        scriptId: "thiefs-swiftness",
        description: "Grants you the ability to pass through enemies for 5 seconds on return.",
      },
      "wayfarers-mastery": {
        scriptId: "wayfarers-mastery",
        description: "Increases your Bash damage by 333 for 5 seconds on return.",
      },
    },
    affixScripts: {
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds on return, increasing Weapon and Spell Damage by 20%.",
      },
      "cowardice": {
        scriptId: "cowardice",
        description:
          "Afflicts the enemy with Major Cowardice for 10 seconds, reducing Weapon and Spell Damage by 430.",
      },
      "enervation": {
        scriptId: "enervation",
        description:
          "Afflicts the enemy with Minor Enervation for 20 seconds, reducing Critical Damage by 10%.",
      },
      "evasion": {
        scriptId: "evasion",
        description:
          "Grants you Major Evasion for 10 seconds on return, reducing damage from area attacks by 20%.",
      },
      "interrupt": { scriptId: "interrupt", description: "Interrupts enemies that are casting." },
      "maim": {
        scriptId: "maim",
        description:
          "Afflicts the enemy with Major Maim for 10 seconds, reducing damage done by 10%.",
      },
      "off-balance": {
        scriptId: "off-balance",
        description: "Sets the enemy Off Balance for 7 seconds.",
      },
      "resolve": {
        scriptId: "resolve",
        description:
          "Grants you Major Resolve for 10 seconds on return, increasing Physical and Spell Resistance by 5948.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds on return, increasing Weapon and Spell Critical rating by 2629.",
      },
      "vitality": {
        scriptId: "vitality",
        description:
          "Grants you Major Vitality for 10 seconds on return, increasing healing received and damage shield strength by 12%.",
      },
    },
  },
} as const satisfies Record<string, GrimoireTemplate>
