import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardContent, CardDescription, CardHeader, CardTitle, CardTitleBadges } from "@shared/design-primitives/components/card"
import { Text } from "@shared/design-primitives/components/text"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import type { RoleId } from "@temper/game-characters-character/roles"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"

interface CharacterListPanelCardBuild {
  id: string
  name: string
  description: string
  buildData: CharacterState | null
  createdAt: number
  updatedAt: number
  userId: string
}

interface CharacterListPanelCardProps {
  build: CharacterListPanelCardBuild
  getClassName: (classId: ClassId) => string
  getRaceName: (raceId: RaceId) => string
  getRoleName: (roles: readonly RoleId[]) => string
  isOwnBuild: boolean
  userHandle: string | null
}

export function CharacterListPanelCard({
  build,
  getClassName,
  getRaceName,
  getRoleName,
  isOwnBuild,
  userHandle,
}: CharacterListPanelCardProps) {
  const buildData = build.buildData

  return (
    <Link
      href={`${characterUrl(BuildId(build.id), build.name)}?tab=character`}
      className="block w-full min-[520px]:w-auto"
    >
      <PanelCard
        id={`character-${build.id}`}
        key={build.id}
        className="group h-[232px] cursor-pointer justify-between transition-colors"
      >
        <CardHeader className="flex-col items-stretch pb-3">
          <CardTitle className="text-lg">
            {build.name !== "" ? build.name : "Untitled Build"}
            <CardTitleBadges>
              {!isOwnBuild && userHandle != null && <Badge variant="accent">{userHandle}</Badge>}
              {isOwnBuild && <Badge variant="accent">My Build</Badge>}
            </CardTitleBadges>
          </CardTitle>
          {buildData?.character != null &&
            (buildData.character.name != null ||
              (buildData.character.roles?.length ?? 0) > 0 ||
              buildData.character.class != null ||
              buildData.character.race != null) && (
              <CardDescription>
                {[
                  buildData.character.name,
                  buildData.character.roles != null &&
                    buildData.character.roles.length > 0 &&
                    getRoleName(buildData.character.roles),
                  buildData.character.class != null && getClassName(buildData.character.class),
                  buildData.character.race != null && getRaceName(buildData.character.race),
                ]
                  .filter((v): v is string => typeof v === "string" && v !== "")
                  .join(" · ")}
              </CardDescription>
            )}
        </CardHeader>
        <CardContent className="space-y-4">
          {build.description !== "" && <Text className="line-clamp-2">{build.description}</Text>}
          <Text variant="caption" as="div">
            {build.createdAt === build.updatedAt ? "Created" : "Updated"}{" "}
            {new Date(build.updatedAt).toLocaleDateString()}
          </Text>
        </CardContent>
      </PanelCard>
    </Link>
  )
}
