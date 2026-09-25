import type { WorldName } from "akasha/temper/player/character/temper-account/properties/world-name.text-property.types.ts"
import type { GuildId } from "akasha/temper/player/holdings/temper-guild/properties/guild-id.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperGuild = TemperThing & {
  guildId: GuildId
  worldName: WorldName
}
