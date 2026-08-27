import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source"
import { TEMPER_BUFF_OTHER_DATA } from "../generated/temper-buff-other.generated"

export const buffsOther = createDataFile<BuffOrDebuffTemplate>()(TEMPER_BUFF_OTHER_DATA)
