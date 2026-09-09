import type { SkillSource as SharedSkillSource } from "../../formula-framework/skill-source/skill-source.module.code.ts"
import type { SkillTypeId } from "../skill-types/skill-types.module.code.ts"

export type SkillSource = SharedSkillSource<SkillTypeId>
