import type { HudComponentRecord } from "../hud-component-record/hud-component-record.module.code.ts"
import { HUD_CONTROLS } from "../hud-controls/hud-controls.module.code.ts"
import { HUD_FRAGMENT_GROUP } from "../hud-fragment-group/hud-fragment-group.module.code.ts"
import { HUD_SCENE_FRAGMENTS } from "../hud-scene-fragments/hud-scene-fragments.module.code.ts"

export const HUD_SCENE_CATALOG: readonly HudComponentRecord[] = [
  ...HUD_FRAGMENT_GROUP,
  ...HUD_SCENE_FRAGMENTS,
  ...HUD_CONTROLS,
]
