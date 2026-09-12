import { debuffsMajor } from "akasha/temper/formula-framework/debuffs-major/debuffs-major.module.code.ts"
import { debuffsMinor } from "akasha/temper/formula-framework/debuffs-minor/debuffs-minor.module.code.ts"
import { debuffsOther } from "akasha/temper/formula-framework/debuffs-other/debuffs-other.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"
import { buffsMajor } from "akasha/temper/formula-framework/modules/buffs-major/buffs-major.module.code.ts"
import { buffsMinor } from "akasha/temper/formula-framework/modules/buffs-minor/buffs-minor.module.code.ts"
import { buffsOther } from "akasha/temper/formula-framework/modules/buffs-other/buffs-other.module.code.ts"
import { createSourceFile } from "akasha/temper/formula-framework/source-file/source-file.module.code.ts"

export interface BuffOrDebuffTemplate extends EffectSourceInterface {
  categoryId: "buffs" | "debuffs"
  subcategoryId: "major" | "minor" | "other"
  name: string
  description: string
}

const BUFF_OR_DEBUFF = {
  ...buffsMajor.data,
  ...buffsMinor.data,
  ...buffsOther.data,
  ...debuffsMajor.data,
  ...debuffsMinor.data,
  ...debuffsOther.data,
} satisfies Record<string, BuffOrDebuffTemplate>

export const buffOrDebuff = createSourceFile<BuffOrDebuffTemplate>()(BUFF_OR_DEBUFF)

export type BuffOrDebuffSource = BuffOrDebuffTemplate & { id: BuffOrDebuffId }

export type BuffOrDebuffId = (typeof buffOrDebuff.ids)[number]
