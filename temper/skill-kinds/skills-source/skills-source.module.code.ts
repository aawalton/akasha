import type { SkillSource as SharedSkillSource } from "akasha/temper/formula-framework/skill-source/skill-source.module.code.ts"
import type { SkillTypeId } from "akasha/temper/skill-kinds/skill-types/skill-types.module.code.ts"

export type SkillSource = SharedSkillSource<SkillTypeId>
