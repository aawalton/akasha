"use client"

import type { RaceId } from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import type { RoleId } from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import { CharacterListPanelCard } from "akasha/temper/web/modules/character-list-panel-card/character-list-panel-card.module.code.tsx"
import { usePlayerByUserId } from "akasha/temper/web/modules/use-player/use-player.module.code.ts"

interface CharacterListCardWithHandleProps {
  build: {
    id: string
    name: string
    description: string
    buildData: CharacterState | null
    createdAt: number | null
    updatedAt: number
    userId: string
  }

  getClassName: (classId: ClassId) => string
  getRaceName: (raceId: RaceId) => string
  getRoleName: (roles: readonly RoleId[]) => string
  currentUserId: string | null
}

export function CharacterListCardWithHandle({
  build,
  getClassName,
  getRaceName,
  getRoleName,
  currentUserId,
}: CharacterListCardWithHandleProps) {
  const { handle } = usePlayerByUserId(build.userId)
  const isOwnBuild = build.userId === currentUserId

  return (
    <CharacterListPanelCard
      build={build}
      getClassName={getClassName}
      getRaceName={getRaceName}
      getRoleName={getRoleName}
      isOwnBuild={isOwnBuild}
      userHandle={handle}
    />
  )
}
