import { buffsMajor } from "./buffs-and-debuffs/buffs-major-data"
import { buffsMinor } from "./buffs-and-debuffs/buffs-minor-data"
import { buffsOther } from "./buffs-and-debuffs/buffs-other-data"
import { debuffsMajor } from "./buffs-and-debuffs/debuffs-major-data"
import { debuffsMinor } from "./buffs-and-debuffs/debuffs-minor-data"
import { debuffsOther } from "./buffs-and-debuffs/debuffs-other-data"
import type { EffectSourceInterface } from "./effect-source"
import { createSourceFile } from "./utils/create-source-file"

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

