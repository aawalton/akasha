"use client"

import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { usePlayerByUserId } from "akasha/temper/player-profile/use-player/use-player.module.code.ts"
import type { CharacterState } from "akasha/temper/temper-character-build/build-types/build-types.module.code.ts"
import type { RoleId } from "../../character-sources/character-roles/character-roles.module.code.ts"
import type { RaceId } from "../../races/races/races.module.code.ts"
import { CharacterListPanelCard } from "../character-list-panel-card/character-list-panel-card.module.code.tsx"

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
