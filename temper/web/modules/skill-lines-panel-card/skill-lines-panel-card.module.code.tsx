import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import {
  type SkillLineId,
  skillLines,
} from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import {
  getAvailableSkillLinesGrouped,
  getClassForSkillLine,
} from "akasha/temper/player/character/skill/modules/skill-line-queries/skill-line-queries.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { skillLinesPanelCardNone } from "akasha/temper/web/phrase/pages/skill-lines-panel-card-none.temper-web-phrase.ts"
import { skillLinesPanelCardTitle } from "akasha/temper/web/phrase/pages/skill-lines-panel-card-title.temper-web-phrase.ts"

interface SkillLinesPanelCardProps {
  skillLineIds: readonly SkillLineId[]
  characterClass: ClassId
  onSkillLineChange: (index: number, newSkillLineId: SkillLineId) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

export function SkillLinesPanelCard({
  skillLineIds,
  characterClass,
  onSkillLineChange,
  className,
  readOnly,
  collapseProtected,
}: SkillLinesPanelCardProps) {
  const phrase = usePhrase()
  const none = phrase(skillLinesPanelCardNone.slug)
  const getClassDisplayNameForSkillLine = (skillLineId: SkillLineId) => {
    const classId = getClassForSkillLine(skillLineId)
    if (classId == null) return ""
    return classes.data[classId].name
  }

  const getSkillLineDisplayName = (skillLineId: SkillLineId) => {
    return skillLines.data[skillLineId]?.name ?? skillLineId
  }

  return (
    <PanelCard
      id="skill-lines"
      collapsible={true}
      collapseProtected={collapseProtected}
      title={phrase(skillLinesPanelCardTitle.slug)}
      className={className}
    >
      {[0, 1, 2].map((index) => {
        const currentSkillLineId = skillLineIds[index]
        const groupedOptions = getAvailableSkillLinesGrouped(characterClass, skillLineIds, index)

        return (
          <div key={index} className="flex items-center justify-between">
            <span className="text-secondary text-sm">
              {(() => {
                if (currentSkillLineId == null) return none
                const displayName = getClassDisplayNameForSkillLine(currentSkillLineId)
                return displayName !== "" ? displayName : none
              })()}
            </span>
            <Select
              value={currentSkillLineId}
              onValueChange={(v) => onSkillLineChange(index, v)}
              disabled={readOnly}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {currentSkillLineId != null ? getSkillLineDisplayName(currentSkillLineId) : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {groupedOptions.map((group) => {
                  return (
                    <SelectGroup key={group.classId}>
                      <SelectLabel>{group.className}</SelectLabel>
                      {group.skillLineIds.map((lineId) => (
                        <SelectItem key={lineId} value={lineId}>
                          {getSkillLineDisplayName(lineId)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        )
      })}
    </PanelCard>
  )
}
