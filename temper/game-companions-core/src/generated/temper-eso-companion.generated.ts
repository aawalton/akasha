/**
 * Temper Companions (Generated)
 *
 * All 9 companion identities sourced from the universal pages table
 * (page type: temper-eso-companion). The 8 player-facing ESO companions
 * (Bastian, Mirri, Ember, Isobel, Sharp-as-Night, Azandar, Tanlorin,
 * Zerith-var) plus the `no-companion` sentinel that represents an
 * unselected companion.
 *
 * Rows emit in `esoCompanionId` ascending order so the
 * `no-companion` sentinel (esoCompanionId 0) stays at
 * `companions.ids[0]`. `@temper/game-codec` indexes that array for the
 * `COMPANION_BITS`-wide companion-build slot; reordering invalidates
 * every shared companion build URL.
 *
 * Each entry's `id` is the stable codec-facing identifier and the
 * same string is used as the record key, so
 * `companionsFromPages.data["bastian"]` is well-typed and feeds the
 * `companions` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { CompanionTemplate } from "../companions-data"

const COMPANIONS_DATA = {
  "no-companion": {
    id: "no-companion" as const,
    name: "No Companion",
    title: "",
    alliance: "none" as const,
    icon: null,
    esoCompanionId: 0,
    classPassiveId: null,
    passiveEffects: [] as const,
  },
  "bastian": {
    id: "bastian" as const,
    name: "Bastian Hallix",
    title: "The Dragonknight",
    alliance: "daggerfall-covenant" as const,
    icon: "/esoui/art/icons/comp_bastian.dds",
    esoCompanionId: 1,
    classPassiveId: "bastian-tough" as const,
    passiveEffects: [{ metricId: "companion-health-maximum" as const, value: 0.03 }, { metricId: "companion-damage-done" as const, value: 0.03 }] as const,
  },
  "mirri": {
    id: "mirri" as const,
    name: "Mirri Elendis",
    title: "The Nightblade",
    alliance: "ebonheart-pact" as const,
    icon: "/esoui/art/icons/comp_mirri.dds",
    esoCompanionId: 2,
    classPassiveId: "mirri-dynamic" as const,
    passiveEffects: [{ metricId: "companion-damage-done" as const, value: 0.03 }, { metricId: "companion-healing-done" as const, value: 0.03 }] as const,
  },
  "ember": {
    id: "ember" as const,
    name: "Ember",
    title: "The Sorcerer",
    alliance: "aldmeri-dominion" as const,
    icon: "/esoui/art/icons/comp_ember.dds",
    esoCompanionId: 5,
    classPassiveId: "ember-cunning" as const,
    passiveEffects: [{ metricId: "companion-critical-chance" as const, value: 0.03 }, { metricId: "companion-damage-done" as const, value: 0.03 }] as const,
  },
  "isobel": {
    id: "isobel" as const,
    name: "Isobel Veloise",
    title: "The Templar",
    alliance: "daggerfall-covenant" as const,
    icon: "/esoui/art/icons/comp_isobel.dds",
    esoCompanionId: 6,
    classPassiveId: "isobel-enchanted" as const,
    passiveEffects: [{ metricId: "companion-ability-cooldown" as const, value: -0.03 }, { metricId: "companion-damage-taken" as const, value: -0.03 }] as const,
  },
  "sharp-as-night": {
    id: "sharp-as-night" as const,
    name: "Sharp-as-Night",
    title: "The Warden",
    alliance: "ebonheart-pact" as const,
    icon: "/esoui/art/icons/companion_sharp.dds",
    esoCompanionId: 8,
    classPassiveId: "sharp-survivalist" as const,
    passiveEffects: [{ metricId: "companion-armor" as const, value: 0.03 }, { metricId: "companion-healing-done" as const, value: 0.03 }] as const,
  },
  "azandar": {
    id: "azandar" as const,
    name: "Azandar",
    title: "The Arcanist",
    alliance: "daggerfall-covenant" as const,
    icon: "/esoui/art/icons/companion_azander.dds",
    esoCompanionId: 9,
    classPassiveId: "azandar-son-of-kozanset" as const,
    passiveEffects: [{ metricId: "companion-health-maximum" as const, value: 0.03 }, { metricId: "companion-ability-cooldown" as const, value: -0.03 }] as const,
  },
  "tanlorin": {
    id: "tanlorin" as const,
    name: "Tanlorin",
    title: "The Soulweaver",
    alliance: "aldmeri-dominion" as const,
    icon: "/esoui/art/icons/u44_companion_tanlorin.dds",
    esoCompanionId: 12,
    classPassiveId: "tanlorin-spirited" as const,
    passiveEffects: [{ metricId: "companion-damage-taken" as const, value: -0.03 }, { metricId: "companion-damage-done" as const, value: 0.03 }] as const,
  },
  "zerith-var": {
    id: "zerith-var" as const,
    name: "Zerith-var",
    title: "The Necromancer",
    alliance: "aldmeri-dominion" as const,
    icon: "/esoui/art/icons/u44_companion_zerith.dds",
    esoCompanionId: 13,
    classPassiveId: "zerith-var-third-moons-chosen" as const,
    passiveEffects: [{ metricId: "companion-ability-cooldown" as const, value: -0.03 }, { metricId: "companion-health-maximum" as const, value: 0.03 }] as const,
  },
} satisfies Record<string, CompanionTemplate>

export const companionsFromPages = createDataFile<CompanionTemplate>()(COMPANIONS_DATA)
