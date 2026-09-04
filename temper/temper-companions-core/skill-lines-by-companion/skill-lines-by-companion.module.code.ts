import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionSkillLineTemplate {
  id: string
  name: string
  companionId: string
  category: "class" | "weapon" | "guild" | "armor"
}

const COMPANION_SKILL_LINES_DATA = {
  "no-skill-line": {
    id: "no-skill-line" as const,
    name: "No Skill Line",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "companion-ember": {
    id: "companion-ember" as const,
    name: "Ember",
    companionId: "ember" as const,
    category: "class" as const,
  },
  "companion-ember-lightning-caller": {
    id: "companion-ember-lightning-caller" as const,
    name: "Lightning Caller",
    companionId: "ember" as const,
    category: "class" as const,
  },
  "companion-ember-mischievous-caster": {
    id: "companion-ember-mischievous-caster" as const,
    name: "Mischievous Caster",
    companionId: "ember" as const,
    category: "class" as const,
  },
  "companion-ember-playful-schemer": {
    id: "companion-ember-playful-schemer" as const,
    name: "Playful Schemer",
    companionId: "ember" as const,
    category: "class" as const,
  },
  "companion-bastian": {
    id: "companion-bastian" as const,
    name: "Bastian",
    companionId: "bastian" as const,
    category: "class" as const,
  },
  "companion-bastian-ardent-warrior": {
    id: "companion-bastian-ardent-warrior" as const,
    name: "Ardent Warrior",
    companionId: "bastian" as const,
    category: "class" as const,
  },
  "companion-bastian-radiating-heart": {
    id: "companion-bastian-radiating-heart" as const,
    name: "Radiating Heart",
    companionId: "bastian" as const,
    category: "class" as const,
  },
  "companion-bastian-draconic-armor": {
    id: "companion-bastian-draconic-armor" as const,
    name: "Draconic Armor",
    companionId: "bastian" as const,
    category: "class" as const,
  },
  "companion-mirri": {
    id: "companion-mirri" as const,
    name: "Mirri",
    companionId: "mirri" as const,
    category: "class" as const,
  },
  "companion-mirri-deadly-assassin": {
    id: "companion-mirri-deadly-assassin" as const,
    name: "Deadly Assassin",
    companionId: "mirri" as const,
    category: "class" as const,
  },
  "companion-mirri-soul-thief": {
    id: "companion-mirri-soul-thief" as const,
    name: "Soul Thief",
    companionId: "mirri" as const,
    category: "class" as const,
  },
  "companion-mirri-living-shade": {
    id: "companion-mirri-living-shade" as const,
    name: "Living Shade",
    companionId: "mirri" as const,
    category: "class" as const,
  },
  "companion-isobel": {
    id: "companion-isobel" as const,
    name: "Isobel",
    companionId: "isobel" as const,
    category: "class" as const,
  },
  "companion-isobel-blazing-might": {
    id: "companion-isobel-blazing-might" as const,
    name: "Blazing Might",
    companionId: "isobel" as const,
    category: "class" as const,
  },
  "companion-isobel-brilliant-shield": {
    id: "companion-isobel-brilliant-shield" as const,
    name: "Brilliant Shield",
    companionId: "isobel" as const,
    category: "class" as const,
  },
  "companion-isobel-healing-grace": {
    id: "companion-isobel-healing-grace" as const,
    name: "Healing Grace",
    companionId: "isobel" as const,
    category: "class" as const,
  },
  "companion-sharp-as-night": {
    id: "companion-sharp-as-night" as const,
    name: "Sharp-as-Night",
    companionId: "sharp-as-night" as const,
    category: "class" as const,
  },
  "companion-sharp-as-night-beasts-of-the-hunt": {
    id: "companion-sharp-as-night-beasts-of-the-hunt" as const,
    name: "Beasts of the Hunt",
    companionId: "sharp-as-night" as const,
    category: "class" as const,
  },
  "companion-sharp-as-night-verdant-growth": {
    id: "companion-sharp-as-night-verdant-growth" as const,
    name: "Verdant Growth",
    companionId: "sharp-as-night" as const,
    category: "class" as const,
  },
  "companion-sharp-as-night-winters-bite": {
    id: "companion-sharp-as-night-winters-bite" as const,
    name: "Winter's Bite",
    companionId: "sharp-as-night" as const,
    category: "class" as const,
  },
  "companion-azandar": {
    id: "companion-azandar" as const,
    name: "Azandar",
    companionId: "azandar" as const,
    category: "class" as const,
  },
  "companion-azandar-quill-knight": {
    id: "companion-azandar-quill-knight" as const,
    name: "Quill Knight",
    companionId: "azandar" as const,
    category: "class" as const,
  },
  "companion-azandar-revitalizing-researcher": {
    id: "companion-azandar-revitalizing-researcher" as const,
    name: "Revitalizing Researcher",
    companionId: "azandar" as const,
    category: "class" as const,
  },
  "companion-azandar-scholar-of-apocrypha": {
    id: "companion-azandar-scholar-of-apocrypha" as const,
    name: "Scholar of Apocrypha",
    companionId: "azandar" as const,
    category: "class" as const,
  },
  "companion-tanlorin": {
    id: "companion-tanlorin" as const,
    name: "Tanlorin",
    companionId: "tanlorin" as const,
    category: "class" as const,
  },
  "companion-tanlorin-draconic-armor": {
    id: "companion-tanlorin-draconic-armor" as const,
    name: "Draconic Armor",
    companionId: "tanlorin" as const,
    category: "class" as const,
  },
  "companion-tanlorin-empathic-fighter": {
    id: "companion-tanlorin-empathic-fighter" as const,
    name: "Empathic Fighter",
    companionId: "tanlorin" as const,
    category: "class" as const,
  },
  "companion-tanlorin-radiating-heart": {
    id: "companion-tanlorin-radiating-heart" as const,
    name: "Radiating Heart",
    companionId: "tanlorin" as const,
    category: "class" as const,
  },
  "companion-zerith-var": {
    id: "companion-zerith-var" as const,
    name: "Zerith-var",
    companionId: "zerith-var" as const,
    category: "class" as const,
  },
  "companion-zerith-var-guardians-commitment": {
    id: "companion-zerith-var-guardians-commitment" as const,
    name: "Guardian's Commitment",
    companionId: "zerith-var" as const,
    category: "class" as const,
  },
  "companion-zerith-var-remedy-of-atonement": {
    id: "companion-zerith-var-remedy-of-atonement" as const,
    name: "Remedy of Atonement",
    companionId: "zerith-var" as const,
    category: "class" as const,
  },
  "companion-zerith-var-warriors-banishment": {
    id: "companion-zerith-var-warriors-banishment" as const,
    name: "Warrior's Banishment",
    companionId: "zerith-var" as const,
    category: "class" as const,
  },
  "weapon-two-handed": {
    id: "weapon-two-handed" as const,
    name: "Two Handed",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "weapon-one-hand-shield": {
    id: "weapon-one-hand-shield" as const,
    name: "One Hand and Shield",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "weapon-dual-wield": {
    id: "weapon-dual-wield" as const,
    name: "Dual Wield",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "weapon-bow": {
    id: "weapon-bow" as const,
    name: "Bow",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "weapon-destruction-staff": {
    id: "weapon-destruction-staff" as const,
    name: "Destruction Staff",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "weapon-restoration-staff": {
    id: "weapon-restoration-staff" as const,
    name: "Restoration Staff",
    companionId: "all" as const,
    category: "weapon" as const,
  },
  "guild-fighters": {
    id: "guild-fighters" as const,
    name: "Fighters Guild",
    companionId: "all" as const,
    category: "guild" as const,
  },
  "guild-mages": {
    id: "guild-mages" as const,
    name: "Mages Guild",
    companionId: "all" as const,
    category: "guild" as const,
  },
  "guild-undaunted": {
    id: "guild-undaunted" as const,
    name: "Undaunted",
    companionId: "all" as const,
    category: "guild" as const,
  },
  "armor-light": {
    id: "armor-light" as const,
    name: "Light Armor",
    companionId: "all" as const,
    category: "armor" as const,
  },
  "armor-medium": {
    id: "armor-medium" as const,
    name: "Medium Armor",
    companionId: "all" as const,
    category: "armor" as const,
  },
  "armor-heavy": {
    id: "armor-heavy" as const,
    name: "Heavy Armor",
    companionId: "all" as const,
    category: "armor" as const,
  },
} satisfies Record<string, CompanionSkillLineTemplate>

export const companionSkillLines = createDataFile<CompanionSkillLineTemplate>()(
  COMPANION_SKILL_LINES_DATA
)

export type CompanionSkillLineId = (typeof companionSkillLines.ids)[number]
