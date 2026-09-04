import type { GrimoireTemplate } from "../grimoire-template/grimoire-template.module.code.ts"

export const SCRIBING_GRIMOIRES_02 = {
  "traveling-knife": {
    id: "traveling-knife",
    name: "Traveling Knife",
    icon: "/esoui/art/icons/item_grimoire_dualwield.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
    skillLineId: "weapon-dual-wield",
    itemId: 204490,
    uespId: 7,
    compatibleFocusScripts: [
      "bleed-damage",
      "frost-damage",
      "magic-damage",
      "multi-target",
      "physical-damage",
      "poison-damage",
      "pull",
      "stun",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "leeching-thirst",
      "assassins-misery",
      "class-mastery",
      "warmages-defense",
      "fencers-parry",
      "wayfarers-mastery",
      "warriors-opportunity",
    ],
    compatibleAffixScripts: [
      "off-balance",
      "savagery-and-prophecy",
      "expedition",
      "berserk",
      "brutality-and-sorcery",
      "force",
      "vulnerability",
      "maim",
      "lifesteal",
      "uncertainty",
    ],
    signatureScripts: {
      "assassins-misery": {
        scriptId: "assassins-misery",
        description:
          "Increases the chance to apply status effects on enemies by 100% for 10 seconds.",
      },
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Create an 8 meter area for 2 seconds under your target once every 8 seconds that snares enemies by 70%, and charms them for 3 seconds when it expires. If no enemies are charmed, you restore 1435 Magicka and Stamina.",
        classId: "warden",
      },
      "fencers-parry": {
        scriptId: "fencers-parry",
        description:
          "Deflects the next direct damage attack used against you within 3 seconds. This can occur once every 3 seconds.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description: "Reduces the Movement Speed of enemies by 30% for 4 seconds.",
      },
      "leeching-thirst": {
        scriptId: "leeching-thirst",
        description: "Heals you for 25% of the damage done.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2380 Physical Damage over 20 seconds to enemies.",
      },
      "warmages-defense": {
        scriptId: "warmages-defense",
        description: "Grants you a damage shield that absorbs 1798 damage for 6 seconds.",
      },
      "warriors-opportunity": {
        scriptId: "warriors-opportunity",
        description: "Enemies hit take 8% more Martial damage for 5 seconds.",
      },
      "wayfarers-mastery": {
        scriptId: "wayfarers-mastery",
        description: "Enemies hit are susceptible to your Ruffian passive ability for 6 seconds.",
      },
    },
    affixScripts: {
      "berserk": {
        scriptId: "berserk",
        description: "Grants you Minor Berserk for 20 seconds, increasing damage done by 5%.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "expedition": {
        scriptId: "expedition",
        description:
          "Grants you Minor Expedition for 20 seconds, increasing Movement Speed by 15%.",
      },
      "force": {
        scriptId: "force",
        description: "Grants you Minor Force for 20 seconds, increasing Critical Damage by 10%.",
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
      "uncertainty": {
        scriptId: "uncertainty",
        description:
          "Afflicts enemies with Minor Uncertainty for 20 seconds, reducing their Weapon and Spell Critical rating by 1314.",
      },
      "vulnerability": {
        scriptId: "vulnerability",
        description:
          "Afflicts enemies with Minor Vulnerability for 20 seconds, increasing damage taken by 5%.",
      },
    },
  },
  "soul-burst": {
    id: "soul-burst",
    name: "Soul Burst",
    icon: "/esoui/art/icons/item_grimoire_soulmagic2.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
    skillLineId: "world-soul-magic",
    itemId: 204492,
    uespId: 8,
    compatibleFocusScripts: [
      "bleed-damage",
      "damage-shield",
      "disease-damage",
      "flame-damage",
      "frost-damage",
      "healing",
      "immobilize",
      "magic-damage",
      "physical-damage",
      "pull",
      "shock-damage",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "anchorites-cruelty",
      "class-mastery",
      "sages-remedy",
      "crusaders-defiance",
      "anchorites-potency",
    ],
    compatibleAffixScripts: [
      "interrupt",
      "savagery-and-prophecy",
      "expedition",
      "resolve",
      "brutality-and-sorcery",
      "intellect-and-endurance",
      "maim",
      "breach",
      "magickasteal",
    ],
    signatureScripts: {
      "anchorites-cruelty": {
        scriptId: "anchorites-cruelty",
        description:
          "Consumes a Soul Gem to deal 2.8% of the enemy's Max Health as Oblivion Damage every 2 seconds for 10 seconds, up to a maximum of 2800 damage. Deals up to 100% more damage to enemies under 50% Health, and can occur once every 10 seconds.",
      },
      "anchorites-potency": {
        scriptId: "anchorites-potency",
        description:
          "If in combat, consumes a Soul Gem to generate 3 Ultimate, up to once every 5 seconds.",
      },
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "crusaders-defiance": {
        scriptId: "crusaders-defiance",
        description: "Removes up to 1 negative effect.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description: "Reduces the Movement Speed of enemies by 30% for 6 seconds.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2980 Magic Damage over 20 seconds to enemies.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals for 1790 Health over 10 seconds.",
      },
    },
    affixScripts: {
      "breach": {
        scriptId: "breach",
        description:
          "Afflicts enemies with Minor Breach for 20 seconds, reducing Physical and Spell Resistance by 2974.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "expedition": {
        scriptId: "expedition",
        description: "Grants Minor Expedition for 20 seconds, increasing Movement Speed by 15%.",
      },
      "intellect-and-endurance": {
        scriptId: "intellect-and-endurance",
        description:
          "Grants Minor Intellect and Minor Endurance for 20 seconds, increasing Magicka and Stamina Recovery by 15%.",
      },
      "interrupt": { scriptId: "interrupt", description: "Interrupts enemies that are casting." },
      "magickasteal": {
        scriptId: "magickasteal",
        description:
          "Afflicts enemies with Minor Magickasteal for 20 seconds, restoring 168 Magicka to attackers every 1 second.",
      },
      "maim": {
        scriptId: "maim",
        description: "Afflicts enemies with Minor Maim for 20 seconds, reducing damage done by 5%.",
      },
      "resolve": {
        scriptId: "resolve",
        description:
          "Grants Minor Resolve for 20 seconds, increasing Physical and Spell Resistance by 2974.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
    },
  },
  "ulfsilds-contingency": {
    id: "ulfsilds-contingency",
    name: "Ulfsild's Contingency",
    icon: "/esoui/art/icons/item_grimoire_magesguild.dds",
    abilityIcon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
    skillLineId: "guild-mages-guild",
    itemId: 204493,
    uespId: 9,
    compatibleFocusScripts: [
      "bleed-damage",
      "damage-shield",
      "flame-damage",
      "frost-damage",
      "healing",
      "immobilize",
      "knockback",
      "magic-damage",
      "shock-damage",
    ],
    compatibleSignatureScripts: [
      "lingering-torment",
      "hunters-snare",
      "class-mastery",
      "sages-remedy",
      "gladiators-tenacity",
      "warriors-opportunity",
      "growing-impact",
    ],
    compatibleAffixScripts: [
      "savagery-and-prophecy",
      "resolve",
      "brutality-and-sorcery",
      "protection",
      "intellect-and-endurance",
      "force",
      "vulnerability",
      "enervation",
      "breach",
      "magickasteal",
    ],
    signatureScripts: {
      "class-mastery": {
        scriptId: "class-mastery",
        description:
          "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times. While in combat, if no corpses are nearby, create a corpse.",
        classId: "necromancer",
      },
      "gladiators-tenacity": {
        scriptId: "gladiators-tenacity",
        description: "Reduces damage taken by 8% for 6 seconds.",
      },
      "growing-impact": {
        scriptId: "growing-impact",
        description:
          "Creates a rune of power on the ground for 8 seconds which applies the Affix script in an area.",
      },
      "hunters-snare": {
        scriptId: "hunters-snare",
        description: "Reduces the Movement Speed of enemies hit by 30% for 6 seconds.",
      },
      "lingering-torment": {
        scriptId: "lingering-torment",
        description: "Deals 2980 Magic Damage over 20 seconds to enemies.",
      },
      "sages-remedy": {
        scriptId: "sages-remedy",
        description: "Heals for 1790 Health over 10 seconds.",
      },
      "warriors-opportunity": {
        scriptId: "warriors-opportunity",
        description:
          "Increase damage done of your next direct attack used within 5 seconds by 2000.",
      },
    },
    affixScripts: {
      "breach": {
        scriptId: "breach",
        description:
          "Afflicts Minor Breach for 20 seconds, reducing Physical and Spell Resistance by 2974.",
      },
      "brutality-and-sorcery": {
        scriptId: "brutality-and-sorcery",
        description:
          "Grants you Major Brutality and Major Sorcery for 10 seconds, increasing Weapon and Spell Damage by 20%.",
      },
      "enervation": {
        scriptId: "enervation",
        description: "Afflicts Minor Enervation for 20 seconds, reducing Critical Damage by 10%.",
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
      "magickasteal": {
        scriptId: "magickasteal",
        description:
          "Afflicts enemies with Minor Magickasteal for 20 seconds, restoring 168 Magicka to attackers every 1 second.",
      },
      "protection": {
        scriptId: "protection",
        description: "Grants Minor Protection for 20 seconds, reducing damage taken by 5%.",
      },
      "resolve": {
        scriptId: "resolve",
        description:
          "Grants Minor Resolve for 20 seconds, increasing Physical and Spell Resistance by 2974.",
      },
      "savagery-and-prophecy": {
        scriptId: "savagery-and-prophecy",
        description:
          "Grants you Major Savagery and Major Prophecy for 10 seconds, increasing Weapon and Spell Critical rating by 2629.",
      },
      "vulnerability": {
        scriptId: "vulnerability",
        description: "Afflicts Minor Vulnerability for 20 seconds, increasing damage taken by 5%.",
      },
    },
  },
} as const satisfies Record<string, GrimoireTemplate>
