import { PanelCard } from "@akasha/design-layout/panel-card"
import { ItemCard } from "@akasha/design-patterns/item-card"
import { Button } from "@akasha/design-primitives/button"
import type { ScribedSkill } from "@akasha/temper-character-skills/scribed-skill-types"
import { getScribedSkillName } from "@akasha/temper-character-skills/scribed-skills"
import { grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import { getEsoIconUrl } from "@akasha/temper-formula-framework/eso-icon-url"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
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
