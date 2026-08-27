/**
 * Temper Classes (Generated)
 *
 * ESO playable character classes (plus the "no-class" sentinel),
 * sourced from the universal pages table (page type: temper-class).
 *
 * Each entry's `id` is the stable codec-facing identifier
 * ("arcanist" / "dragonknight" / ...) and the same string is used
 * as the record key, so `TEMPER_CLASSES["arcanist"]` is well-typed
 * and feeds the `ClassId` union and the `classes.data` lookup
 * in @temper/game-characters-classes.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ClassId } from "@temper/shared-formula-framework/class-id"

interface ClassTemplate {
  id: ClassId
  name: string
  icon: string
  esoClassId: number
}

export const TEMPER_CLASSES = {
  "arcanist": { id: "arcanist", name: "Arcanist", icon: "📖", esoClassId: 117 },
  "dragonknight": { id: "dragonknight", name: "Dragonknight", icon: "🔥", esoClassId: 1 },
  "necromancer": { id: "necromancer", name: "Necromancer", icon: "💀", esoClassId: 5 },
  "nightblade": { id: "nightblade", name: "Nightblade", icon: "🗡️", esoClassId: 3 },
  "no-class": { id: "no-class", name: "No Class", icon: "", esoClassId: 0 },
  "sorcerer": { id: "sorcerer", name: "Sorcerer", icon: "⚡", esoClassId: 2 },
  "templar": { id: "templar", name: "Templar", icon: "☀️", esoClassId: 6 },
  "warden": { id: "warden", name: "Warden", icon: "🐻", esoClassId: 4 },
} as const satisfies Record<ClassId, ClassTemplate>
