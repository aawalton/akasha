import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@akasha/design-primitives/collapsible"
import { Command, CommandGroup, CommandInput, CommandList } from "@akasha/design-primitives/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@akasha/design-primitives/dialog"
import { type SkillId, skills } from "@akasha/temper-character-skills/character-skills"
import type { CategoryData } from "@akasha/temper-skill-morphs/skill-organization"
import { Check, ChevronRight, ChevronsDown, ChevronsUp } from "lucide-react"
import { useState } from "react"
import { SkillCollapsibleCard } from "../skill-collapsible-card/skill-collapsible-card.module.code.tsx"

interface SkillSelectionDialogProps {
  open: boolean
  title: string
  onClose: () => void
  onSelect: (skillId: SkillId) => void
  organizedSkills: readonly CategoryData[]
  searchFilter: string
  onSearchChange: (value: string) => void
  expandedSkillLines: Set<string>
  onToggleSkillLine: (key: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function SkillSelectionDialog({
  open,
  title,
  onClose,
  onSelect,
  organizedSkills,
  searchFilter,
  onSearchChange,
  expandedSkillLines,
  onToggleSkillLine,
  onExpandAll,
  onCollapseAll,
}: SkillSelectionDialogProps) {
  const [expandedSkillId, setExpandedSkillId] = useState<SkillId | null>(null)

  function handleClose() {
    setExpandedSkillId(null)
    onClose()
  }

  function handleSelect(skillId: SkillId) {
    setExpandedSkillId(null)
    onSelect(skillId)
  }

  function handleSkillOpenChange(skillId: SkillId, isOpen: boolean) {
    setExpandedSkillId(isOpen ? skillId : null)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <Command className="max-h-[80vh]" shouldFilter={false}>
          <DialogHeader className="space-y-3 p-6 pb-3">
            <DialogTitle>{title}</DialogTitle>
            <div className="flex w-full flex-start flex-row gap-2">
              <CommandInput
                placeholder="Search skills..."
                value={searchFilter}
                onValueChange={onSearchChange}
                className="flex-1"
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={onExpandAll}
                title="Expand all skill lines"
                className="shrink-0"
              >
                <ChevronsDown className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={onCollapseAll}
                title="Collapse all skill lines"
                className="shrink-0"
              >
                <ChevronsUp className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <CommandList className="max-h-none space-y-4 overflow-y-auto px-6 pt-3 pb-6">
            {organizedSkills.length === 0 && searchFilter !== "" && (
              <div className="py-6 text-center text-sm">No skills match "{searchFilter}"</div>
            )}

            {organizedSkills.map((category) => (
              <CommandGroup key={category.name} heading={category.name}>
                {category.skillLines.map((skillLine) => {
                  const skillLineKey = `${category.name}::${skillLine.displayName}`
                  return (
                    <Collapsible
                      key={skillLineKey}
                      open={expandedSkillLines.has(skillLineKey)}
                      onOpenChange={() => onToggleSkillLine(skillLineKey)}
                    >
                      <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-primary/8">
                        <ChevronRight
                          className={cn(
                            "h-3 w-3 transition-transform",
                            expandedSkillLines.has(skillLineKey) && "rotate-90"
                          )}
                        />
                        <span className="text-sm">{skillLine.displayName}</span>
                        <span className="text-secondary text-xs">
                          ({skillLine.morphPairs.length})
                        </span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 py-2">
                        {skillLine.morphPairs.map((pair) =>
                          pair.skills.map((skill) => {
                            if (!skills.has(skill.id)) return null

                            return (
                              <SkillCollapsibleCard
                                key={skill.id}
                                skill={skill}
                                open={expandedSkillId === skill.id}
                                onOpenChange={(isOpen) => handleSkillOpenChange(skill.id, isOpen)}
                                showSkillLine={false}
                                renderAction={() => (
                                  <Button
                                    variant="tertiary"
                                    size="icon"
                                    className="h-9 w-9 shrink-0"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      handleSelect(skill.id)
                                    }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    title={`Select ${skill.name}`}
                                    aria-label={`Select ${skill.name}`}
                                    type="button"
                                  >
                                    <Check className="h-4 w-4 text-tertiary" />
                                  </Button>
                                )}
                              />
                            )
                          })
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
