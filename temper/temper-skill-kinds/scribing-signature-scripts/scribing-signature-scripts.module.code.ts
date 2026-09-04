import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface SignatureScriptTemplate {
  id: string
  name: string
  icon: string
  slotType: "signature-slot"
  itemId: number
  uespId: number
}

const SIGNATURE_SCRIPT_DATA = {
  "no-signature-script": {
    id: "no-signature-script",
    name: "No Signature Script",
    icon: "",
    slotType: "signature-slot",
    itemId: 0,
    uespId: 0,
  },
  "lingering-torment": {
    id: "lingering-torment",
    name: "Lingering Torment",
    icon: "/esoui/art/icons/scribing_secondary_damageovertime.dds",
    slotType: "signature-slot",
    itemId: 204572,
    uespId: 24,
  },
  "hunters-snare": {
    id: "hunters-snare",
    name: "Hunter's Snare",
    icon: "/esoui/art/icons/scribing_secondary_snare.dds",
    slotType: "signature-slot",
    itemId: 204573,
    uespId: 25,
  },
  "knights-valor": {
    id: "knights-valor",
    name: "Knight's Valor",
    icon: "/esoui/art/icons/scribing_secondary_shieldmastery.dds",
    slotType: "signature-slot",
    itemId: 204574,
    uespId: 26,
  },
  "leeching-thirst": {
    id: "leeching-thirst",
    name: "Leeching Thirst",
    icon: "/esoui/art/icons/scribing_secondary_livesteal.dds",
    slotType: "signature-slot",
    itemId: 204575,
    uespId: 27,
  },
  "immobilizing-strike": {
    id: "immobilizing-strike",
    name: "Immobilizing Strike",
    icon: "/esoui/art/icons/scribing_secondary_immobilize.dds",
    slotType: "signature-slot",
    itemId: 204576,
    uespId: 28,
  },
  "assassins-misery": {
    id: "assassins-misery",
    name: "Assassin's Misery",
    icon: "/esoui/art/icons/scribing_secondary_statuseffect.dds",
    slotType: "signature-slot",
    itemId: 204577,
    uespId: 29,
  },
  "anchorites-cruelty": {
    id: "anchorites-cruelty",
    name: "Anchorite's Cruelty",
    icon: "/esoui/art/icons/scribing_secondary_soulcollapse.dds",
    slotType: "signature-slot",
    itemId: 204578,
    uespId: 30,
  },
  "class-mastery": {
    id: "class-mastery",
    name: "Class Mastery",
    icon: "/esoui/art/icons/scribing_secondary_classmod.dds",
    slotType: "signature-slot",
    itemId: 204579,
    uespId: 31,
  },
  "sages-remedy": {
    id: "sages-remedy",
    name: "Sage's Remedy",
    icon: "/esoui/art/icons/scribing_secondary_healovertime.dds",
    slotType: "signature-slot",
    itemId: 204580,
    uespId: 32,
  },
  "warmages-defense": {
    id: "warmages-defense",
    name: "Warmage's Defense",
    icon: "/esoui/art/icons/scribing_secondary_damageshield.dds",
    slotType: "signature-slot",
    itemId: 204581,
    uespId: 33,
  },
  "druids-resurgence": {
    id: "druids-resurgence",
    name: "Druid's Resurgence",
    icon: "/esoui/art/icons/scribing_secondary_resourcerestore.dds",
    slotType: "signature-slot",
    itemId: 204582,
    uespId: 34,
  },
  "thiefs-swiftness": {
    id: "thiefs-swiftness",
    name: "Thief's Swiftness",
    icon: "/esoui/art/icons/scribing_secondary_mobility.dds",
    slotType: "signature-slot",
    itemId: 204583,
    uespId: 35,
  },
  "crusaders-defiance": {
    id: "crusaders-defiance",
    name: "Crusader's Defiance",
    icon: "/esoui/art/icons/scribing_secondary_breaksnare.dds",
    slotType: "signature-slot",
    itemId: 204584,
    uespId: 36,
  },
  "fencers-parry": {
    id: "fencers-parry",
    name: "Fencer's Parry",
    icon: "/esoui/art/icons/scribing_secondary_bladeturn.dds",
    slotType: "signature-slot",
    itemId: 204585,
    uespId: 37,
  },
  "gladiators-tenacity": {
    id: "gladiators-tenacity",
    name: "Gladiator's Tenacity",
    icon: "/esoui/art/icons/scribing_secondary_damagereduction.dds",
    slotType: "signature-slot",
    itemId: 204586,
    uespId: 38,
  },
  "anchorites-potency": {
    id: "anchorites-potency",
    name: "Anchorite's Potency",
    icon: "/esoui/art/icons/scribing_secondary_giveultimate.dds",
    slotType: "signature-slot",
    itemId: 204587,
    uespId: 39,
  },
  "wayfarers-mastery": {
    id: "wayfarers-mastery",
    name: "Wayfarer's Mastery",
    icon: "/esoui/art/icons/scribing_secondary_battletechnique.dds",
    slotType: "signature-slot",
    itemId: 204588,
    uespId: 40,
  },
  "warriors-opportunity": {
    id: "warriors-opportunity",
    name: "Warrior's Opportunity",
    icon: "/esoui/art/icons/scribing_secondary_opportunism.dds",
    slotType: "signature-slot",
    itemId: 204589,
    uespId: 41,
  },
  "cavaliers-charge": {
    id: "cavaliers-charge",
    name: "Cavalier's Charge",
    icon: "/esoui/art/icons/scribing_secondary_chargedamage.dds",
    slotType: "signature-slot",
    itemId: 204590,
    uespId: 42,
  },
  "growing-impact": {
    id: "growing-impact",
    name: "Growing Impact",
    icon: "/esoui/art/icons/scribing_secondary_localaoedamagebuff.dds",
    slotType: "signature-slot",
    itemId: 207949,
    uespId: 70,
  },
} as const satisfies Record<string, SignatureScriptTemplate>

export const signatureScripts = createDataFile<SignatureScriptTemplate>()(SIGNATURE_SCRIPT_DATA)

export type SignatureScriptId = (typeof signatureScripts.ids)[number]
