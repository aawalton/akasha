import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { SkillLineCategoryId } from "akasha/temper/player/character/skill/line/modules/skill-line-category-data/skill-line-category-data.module.code.ts"
import type { Skill } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"

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
