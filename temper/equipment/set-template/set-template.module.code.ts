import type { ClassId } from "../../formula-framework/class-id/class-id.module.code.ts"
import type { Effect } from "../../formula-framework/effect/effect.module.code.ts"
import type { SetCategoryId } from "../set-category-ids/set-category-ids.module.code.ts"
import type { SetId } from "../set-ids/set-ids.module.code.ts"
import type { EquipmentPattern } from "../set-patterns/set-patterns.module.code.ts"

export type SetBonusStatus = "supported" | "partially-supported" | "unsupported"

export interface SetBonus {
  count: number
  description: string
  effects: readonly Effect[]
  status: SetBonusStatus
}

export interface SetTemplate {
  id: SetId
  name: string
  subcategoryId: SetCategoryId
  valid: readonly EquipmentPattern[]
  bonuses: readonly SetBonus[]
  icons?: Partial<Record<EquipmentPattern, string>>
  classId?: ClassId
  esoSetId: number
}
