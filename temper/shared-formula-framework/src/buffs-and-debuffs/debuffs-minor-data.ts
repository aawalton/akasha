import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source"
import { TEMPER_DEBUFF_MINOR_DATA } from "../generated/temper-debuff-minor.generated"

export const debuffsMinor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_DEBUFF_MINOR_DATA)
