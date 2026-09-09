import type { SkillSource as SharedSkillSource } from "@akasha/temper-formula-framework/skill-source"
import type { SkillTypeId } from "../skill-types/skill-types.module.code.ts"

export type SkillSource = SharedSkillSource<SkillTypeId>
