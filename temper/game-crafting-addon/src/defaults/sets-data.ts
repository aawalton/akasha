import { SetsTiers2to5 } from "./sets-data-tiers-2-5"
import { SetsTiers6to9 } from "./sets-data-tiers-6-9"

export interface CraftedSetEntry {
  traits: number
  nodes: Record<number, number>
  item: Record<number, number>
  zone: Record<number, number>
  name?: string
}

export const Sets: Record<number, CraftedSetEntry> = {
  ...SetsTiers2to5,
  ...SetsTiers6to9,
}
