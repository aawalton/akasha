import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { Skill } from "akasha/temper/temper-character-skills/character-skills/character-skills.module.code.ts"
import type { ScribedSkill } from "akasha/temper/temper-character-skills/scribed-skill-types/scribed-skill-types.module.code.ts"
import type { AffixScriptId } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import type { FocusScriptId } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SignatureScriptId } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"
import type { SkillLineCategoryId } from "../../skill-lines/skill-line-category-data/skill-line-category-data.module.code.ts"

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
