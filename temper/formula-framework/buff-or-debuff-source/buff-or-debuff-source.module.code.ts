import { buffsMajor } from "../buffs-major/buffs-major.module.code.ts"
import { buffsMinor } from "../buffs-minor/buffs-minor.module.code.ts"
import { buffsOther } from "../buffs-other/buffs-other.module.code.ts"
import { debuffsMajor } from "../debuffs-major/debuffs-major.module.code.ts"
import { debuffsMinor } from "../debuffs-minor/debuffs-minor.module.code.ts"
import { debuffsOther } from "../debuffs-other/debuffs-other.module.code.ts"
import type { EffectSourceInterface } from "../effect-source/effect-source.module.code.ts"
import { createSourceFile } from "../source-file/source-file.module.code.ts"

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
