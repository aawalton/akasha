"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import { companions } from "@temper/game-companions-core/companions-data"
import { companionArmorSlots } from "@temper/game-companions-core/equipment/companion-armor-slots-data"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import {
  type CompanionSkillId,
  companionSkills,
} from "@temper/game-companions-core/skills/companion-skills-data"
import { CompanionSkillCard } from "@/components/companion-skills/companion-skill-card"
import type { ArmorPieceCounts } from "@/components/companion-skills/effect-badges/types"

type ArmorWeight = "light" | "medium" | "heavy"

function countArmorByWeight(equipment: CompanionState["equipment"]): ArmorPieceCounts {
  const counts: ArmorPieceCounts = { light: 0, medium: 0, heavy: 0 }

  for (const slotId of companionArmorSlots.ids) {
    const slot = equipment.armor[slotId]
    if (slot.itemType === "armor" && slot.data.weight !== "no-weight") {
      counts[slot.data.weight]++
    }
  }

  return counts
}

const ARMOR_PASSIVES = {
  light: "shared-flow",
  medium: "shared-flexibility",
  heavy: "shared-firmness",
} as const satisfies Record<ArmorWeight, CompanionSkillId>

interface CompanionPassiveSkillsPanelCardProps {
  companionId: CompanionState["companion"]["id"]
  equipment: CompanionState["equipment"]
  stats?: CompanionFormulaStats
}

export function CompanionPassiveSkillsPanelCard({
  companionId,
  equipment,
  stats,
}: CompanionPassiveSkillsPanelCardProps) {
  const classPassiveId = companions.data[companionId].classPassiveId
  const classPassive =
    classPassiveId != null && companionSkills.has(classPassiveId)
      ? companionSkills.data[classPassiveId]
      : null

  const armorCounts = countArmorByWeight(equipment)

  const activeArmorPassives = (["light", "medium", "heavy"] as const)
    .filter((weight) => armorCounts[weight] > 0)
    .map((weight) => ({
      weight,
      skill: companionSkills.data[ARMOR_PASSIVES[weight]],
    }))
    .flatMap((item) => (item.skill ? [{ weight: item.weight, skill: item.skill }] : []))

  if (!classPassive && activeArmorPassives.length === 0) {
    return null
  }

  return (
    <PanelCard id="companion-passive-skills" collapsible title="Passive Skills">
      <div className="space-y-2">
        {}
        {classPassive ? (
          <CompanionSkillCard skill={classPassive} stats={stats} reserveActionSpace />
        ) : null}

        {}
        {activeArmorPassives.map(({ weight, skill }) => (
          <CompanionSkillCard
            key={weight}
            skill={skill}
            stats={stats}
            armorPieceCounts={armorCounts}
            reserveActionSpace
          />
        ))}
      </div>
    </PanelCard>
  )
}
