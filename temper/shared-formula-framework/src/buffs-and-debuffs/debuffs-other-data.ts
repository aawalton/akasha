import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source"
import { TEMPER_DEBUFF_OTHER_DATA } from "../generated/temper-debuff-other.generated"

export const debuffsOther = createDataFile<BuffOrDebuffTemplate>()(TEMPER_DEBUFF_OTHER_DATA)
