import type { SoloDifficulty } from "../solo-difficulty/solo-difficulty.module.code.ts"

export interface Dungeon {
  key: string
  label: string
  soloDifficulty?: SoloDifficulty
  questGiverId?: string | null
  rotationPosition?: number | null
}

export function getDungeonLabel(dungeons: readonly Dungeon[], key: string): string {
  const found = dungeons.find((d) => d.key === key)
  return found?.label ?? key
}
