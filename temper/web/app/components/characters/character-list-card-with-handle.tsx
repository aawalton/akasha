"use client"

import type { RoleId } from "@temper/game-characters-character/roles"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { usePlayerByUserId } from "@temper/player-profile/use-player"
import { CharacterListPanelCard } from "@/components/characters/character-list-panel-card"

interface CharacterListCardWithHandleProps {
  build: {
    id: string
    name: string
    description: string
    buildData: CharacterState | null
    createdAt: number
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
