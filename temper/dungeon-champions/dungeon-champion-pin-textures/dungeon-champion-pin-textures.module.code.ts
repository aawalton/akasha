import { getUiString } from "../dungeon-champion-labels/dungeon-champion-labels.module.code.ts"

export const PIN_TEXTURES: {
  unknown: Record<number, string>
  collected: Record<number, string>
} = {
  unknown: {
    1: "/esoui/art/icons/poi/poi_groupboss_incomplete.dds",
    2: "/esoui/art/icons/poi/poi_groupboss_incomplete.dds",
  },
  collected: {
    1: "/esoui/art/icons/poi/poi_groupboss_complete.dds",
    2: "/esoui/art/icons/poi/poi_groupboss_complete.dds",
  },
}

export function getPinTexturesList(): string[] {
  return [getUiString("DCS_BOSS_TEXTURE_1"), getUiString("DCS_BOSS_TEXTURE_2")]
}
