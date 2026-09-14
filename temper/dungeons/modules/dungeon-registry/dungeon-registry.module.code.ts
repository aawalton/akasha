import type { SoloDifficulty } from "akasha/temper/dungeons/modules/solo-difficulty/solo-difficulty.module.code.ts"

export interface Dungeon {
  key: string
  label: string
  soloDifficulty?: SoloDifficulty
  questGiverId?: string | null
  rotationPosition?: number | null
}
