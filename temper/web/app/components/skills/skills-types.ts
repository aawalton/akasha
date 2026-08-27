import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { SkillLineCategoryId } from "@temper/game-characters-skill-lines/skill-line-categories"
import type { ScribedSkill } from "@temper/game-characters-skills/scribing/scribed-skill-types"
import type { AffixScriptId } from "@temper/game-characters-skills/scribing/affix-scripts-data"
import type { FocusScriptId } from "@temper/game-characters-skills/scribing/focus-scripts-data"
import type { SignatureScriptId } from "@temper/game-characters-skills/scribing/signature-scripts-data"
import type { Skill } from "@temper/game-characters-skills/skills-data"

export type BarType = "primary" | "backup"

export interface SkillsPanelProps {
  skills: CharacterState["skills"]
  scribing: readonly ScribedSkill[]
  character: CharacterState["character"]
  equipment: CharacterState["equipment"]
  availableSkills: readonly Skill[]
  onUpdateSkills: (updates: Partial<CharacterState["skills"]>) => void
  onUpdateScribing: (scribing: readonly ScribedSkill[]) => void
  onUpdateCharacter: (updates: Partial<CharacterState["character"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
  passiveSearch?: string
  passiveCategory?: SkillLineCategoryId | null
}

export interface PendingScriptEdits {
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
