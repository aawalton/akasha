import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import type { ScribedSkill } from "@temper/game-characters-skills/scribing/scribed-skill-types"
import { grimoires } from "@temper/game-characters-skills/scribing/grimoires-data"
import { getScribedSkillName } from "@temper/game-characters-skills/scribing/scribed-skills-data"
import { getEsoIconUrl } from "@temper/shared-formula-framework/icon-utils"
import { Plus } from "lucide-react"
import { useMemo } from "react"

interface ScribedSkillItemProps {
  skill: ScribedSkill
  originalIndex: number
  onOpenScriptEdit: (index: number) => void
  onRemoveSkill: (index: number) => void
  readOnly?: boolean
}

function ScribedSkillItem({
  skill,
  originalIndex,
  onOpenScriptEdit,
  onRemoveSkill,
  readOnly,
}: ScribedSkillItemProps) {
  const grimoireDef = grimoires.data[skill.grimoireId]
  const iconUrl = getEsoIconUrl(grimoireDef.abilityIcon)
  const skillName = getScribedSkillName(skill.grimoireId, skill.focusScriptId)

  return (
    <ItemCard
      onClick={readOnly ? undefined : () => onOpenScriptEdit(originalIndex)}
      renderIcon={() => (
        <>
          {iconUrl != null ? (
            <img
              src={iconUrl !== "" ? iconUrl : "/placeholder.svg"}
              alt={skillName}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <Plus className="h-4 w-4 text-tertiary" />
          )}
        </>
      )}
      renderContent={() => (
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium text-sm">{skillName}</div>
          <div className="truncate text-secondary text-xs">
            {skillLines.data[grimoireDef.skillLineId].name}
          </div>
        </div>
      )}
      onRemove={readOnly ? undefined : () => onRemoveSkill(originalIndex)}
      removeLabel="Remove scribed skill"
    />
  )
}

interface ScribingPanelCardProps {
  sortedScribing: ReadonlyArray<{ skill: ScribedSkill; originalIndex: number }>
  onOpenGrimoireSelect: () => void
  onOpenScriptEdit: (index: number) => void
  onRemoveSkill: (index: number) => void
  className?: string
  readOnly?: boolean
}

export function ScribingPanelCard({
  sortedScribing,
  onOpenGrimoireSelect,
  onOpenScriptEdit,
  onRemoveSkill,
  className,
  readOnly,
}: ScribingPanelCardProps) {
  const hasGrimoiresLeft = useMemo(() => {
    const totalGrimoires = grimoires.ids.length
    const usedGrimoireIds = new Set(
      sortedScribing.map(({ skill }) => skill.grimoireId).filter(Boolean)
    )
    return usedGrimoireIds.size < totalGrimoires
  }, [sortedScribing])

  return (
    <PanelCard id="scribing" collapsible={true} title="Scribing" className={className}>
      {sortedScribing.length > 0 &&
        sortedScribing.map(({ skill, originalIndex }) => (
          <ScribedSkillItem
            key={originalIndex}
            skill={skill}
            originalIndex={originalIndex}
            onOpenScriptEdit={onOpenScriptEdit}
            onRemoveSkill={onRemoveSkill}
            readOnly={readOnly}
          />
        ))}

      {!readOnly && hasGrimoiresLeft && (
        <Button variant="secondary" className="w-full" onClick={onOpenGrimoireSelect} type="button">
          <Plus className="h-4 w-4" />
          Craft Scribed Skill
        </Button>
      )}
    </PanelCard>
  )
}
