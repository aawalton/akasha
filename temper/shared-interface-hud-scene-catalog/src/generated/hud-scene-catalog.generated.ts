// GENERATED — do not edit by hand. Regenerate with:
//   ops eso generate-hud-scene-catalog
// Source: esoui/ingame/scenes/hudscene.lua
// Generated from the ~/esoui clone by ops eso generate-hud-scene-catalog
// ESO-API-Version: 101050  (source freshness marker; verified by check-eso-typings-fresh)
//
// One record per distinct UI component in ESO's main/gameplay scene, at the
// seam ESO exposes (one fragment / one top-level control = one component).
// The GuiRoot-parented + runtime-created blind-spot is documented, bounded, and
// out of this single-file source-walk by design — see ../../CLAUDE.md.

import type { HudComponentRecord } from "../schema"

export const HUD_SCENE_CATALOG = [
  {
    "id": "death-recap-fragment",
    "name": "Death recap",
    "esoGlobal": "DEATH_RECAP_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "death",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 82
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "player-progress-bar-fragment",
    "name": "Player progress bar (XP)",
    "esoGlobal": "PLAYER_PROGRESS_BAR_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "progress",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 83
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "compass-frame-fragment",
    "name": "Compass & boss bar",
    "esoGlobal": "COMPASS_FRAME_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "compass",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 84
    },
    "conditional": false,
    "wrapsMultiple": true,
    "grainNotes": "Wraps the compass + the boss health bar under one fragment."
  },
  {
    "id": "endless-dungeon-hud-fragment",
    "name": "Endless dungeon HUD",
    "esoGlobal": "ENDLESS_DUNGEON_HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "endless-dungeon",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 85
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "endless-dungeon-hud-tracker-fragment",
    "name": "Endless dungeon tracker",
    "esoGlobal": "ENDLESS_DUNGEON_HUD_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 86
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "adventure-zone-hud-fragment",
    "name": "Adventure zone HUD",
    "esoGlobal": "ADVENTURE_ZONE_HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "adventure-zone",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 87
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "adventure-zone-hud-tracker-fragment",
    "name": "Adventure zone tracker",
    "esoGlobal": "ADVENTURE_ZONE_HUD_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 88
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "dynamic-events-tracker-fragment",
    "name": "Dynamic events tracker",
    "esoGlobal": "DYNAMIC_EVENTS_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 89
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "focused-quest-tracker-fragment",
    "name": "Quest tracker",
    "esoGlobal": "FOCUSED_QUEST_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 90
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "activity-tracker-fragment",
    "name": "Activity finder tracker",
    "esoGlobal": "ACTIVITY_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 91
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "ready-check-tracker-fragment",
    "name": "Ready check tracker",
    "esoGlobal": "READY_CHECK_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 92
    },
    "conditional": false,
    "wrapsMultiple": true,
    "grainNotes": "Wraps the per-role ready-check indicator icons."
  },
  {
    "id": "action-bar-fragment",
    "name": "Action bar",
    "esoGlobal": "ACTION_BAR_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "action-bar",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 93
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "hud-equipment-status-fragment",
    "name": "Equipment durability status",
    "esoGlobal": "HUD_EQUIPMENT_STATUS_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "equipment",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 94
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "contextual-action-bar-area-fragment",
    "name": "Contextual action bar",
    "esoGlobal": "CONTEXTUAL_ACTION_BAR_AREA_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "action-bar",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 95
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "hud-fragment",
    "name": "HUD master fragment",
    "esoGlobal": "HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "system",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 96
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "The master HUD fragment; its UpdateVisibility drives the non-fragment control toggles below."
  },
  {
    "id": "death-fragment",
    "name": "Death screen",
    "esoGlobal": "DEATH_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "death",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 97
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "unit-frames-fragment",
    "name": "Unit frames",
    "esoGlobal": "UNIT_FRAMES_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "unit-frame",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 98
    },
    "conditional": false,
    "wrapsMultiple": true,
    "grainNotes": "Wraps player / target / group / raid frames under one fragment."
  },
  {
    "id": "player-attribute-bars-fragment",
    "name": "Player attribute bars",
    "esoGlobal": "PLAYER_ATTRIBUTE_BARS_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "attributes",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 99
    },
    "conditional": false,
    "wrapsMultiple": true,
    "grainNotes": "Wraps the health / magicka / stamina bars (= 1 component, not 3)."
  },
  {
    "id": "performance-meter-fragment",
    "name": "Performance / FPS meter",
    "esoGlobal": "PERFORMANCE_METER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "meter",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 100
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "Already suppressed by TemperHud via SetHiddenForReason (prior art for Phase 2)."
  },
  {
    "id": "player-progress-bar-gamepad-hide-name-location-fragment",
    "name": "Gamepad progress bar (hide name/location)",
    "esoGlobal": "PLAYER_PROGRESS_BAR_GAMEPAD_HIDE_NAME_LOCATION_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "progress",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 101
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "subtitle-hud-fragment",
    "name": "Subtitles",
    "esoGlobal": "SUBTITLE_HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "subtitle",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 102
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "gamepad-loot-history-fragment",
    "name": "Loot history (gamepad)",
    "esoGlobal": "GAMEPAD_LOOT_HISTORY_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "loot",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 103
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "keyboard-loot-history-fragment",
    "name": "Loot history (keyboard)",
    "esoGlobal": "KEYBOARD_LOOT_HISTORY_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "loot",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 104
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "housing-hud-fragment",
    "name": "Housing HUD",
    "esoGlobal": "HOUSING_HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "housing",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 105
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "buff-debuff-fragment",
    "name": "Buffs & debuffs",
    "esoGlobal": "BUFF_DEBUFF_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "buff-debuff",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 106
    },
    "conditional": false,
    "wrapsMultiple": true,
    "grainNotes": "Wraps the self + target buff/debuff containers under one fragment."
  },
  {
    "id": "housing-hud-action-layer-fragment",
    "name": "Housing action layer",
    "esoGlobal": "HOUSING_HUD_ACTION_LAYER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "housing",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 107
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "battleground-hud-fragment",
    "name": "Battleground HUD",
    "esoGlobal": "BATTLEGROUND_HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "battleground",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 108
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "battleground-hud-action-layer-fragment",
    "name": "Battleground action layer",
    "esoGlobal": "BATTLEGROUND_HUD_ACTION_LAYER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "battleground",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 109
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "zone-story-tracker-fragment",
    "name": "Zone story tracker",
    "esoGlobal": "ZONE_STORY_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 110
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "house-information-tracker-fragment",
    "name": "House information tracker",
    "esoGlobal": "HOUSE_INFORMATION_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 111
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "housing-editor-inspection-hud-fragment",
    "name": "Housing editor inspection HUD",
    "esoGlobal": "HOUSING_EDITOR_INSPECTION_HUD_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "housing",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 112
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "promotional-event-tracker-fragment",
    "name": "Promotional event tracker",
    "esoGlobal": "PROMOTIONAL_EVENT_TRACKER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tracker",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 113
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "FCOChangeStuff hides this today via a bespoke path — the Phase-3 child project target."
  },
  {
    "id": "spectator-camera-action-layer-fragment",
    "name": "Spectator camera action layer",
    "esoGlobal": "SPECTATOR_CAMERA_ACTION_LAYER_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "fragment-group",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "spectator",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 114
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "reticle-mode-fragment",
    "name": "Reticle mode",
    "esoGlobal": "RETICLE_MODE_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "scene-fragment",
    "scenes": [
      "hud"
    ],
    "category": "mode",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 237
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "Toggles PLAYER_TO_PLAYER top-level visibility on the hud scene."
  },
  {
    "id": "force-console-warning-fragment",
    "name": "Force-console warning",
    "esoGlobal": "FORCE_CONSOLE_WARNING_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "scene-fragment",
    "scenes": [
      "hud",
      "hudui"
    ],
    "category": "warning",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 239
    },
    "conditional": true,
    "wrapsMultiple": false
  },
  {
    "id": "mouse-ui-mode-fragment",
    "name": "Mouse UI mode",
    "esoGlobal": "MOUSE_UI_MODE_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "scene-fragment",
    "scenes": [
      "hudui"
    ],
    "category": "mode",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 256
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "loot-window-fragment",
    "name": "Loot window",
    "esoGlobal": "LOOT_WINDOW_FRAGMENT",
    "kind": "fragment",
    "hideMechanism": "scene-fragment",
    "scenes": [
      "loot"
    ],
    "category": "loot",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 271
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "frame-emote-fragment-loot",
    "name": "Frame emote (loot)",
    "esoGlobal": "FRAME_EMOTE_FRAGMENT_LOOT",
    "kind": "fragment",
    "hideMechanism": "scene-fragment",
    "scenes": [
      "loot"
    ],
    "category": "loot",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 273
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "compass-frame",
    "name": "Compass frame (control)",
    "esoGlobal": "COMPASS_FRAME",
    "kind": "non-fragment-control",
    "hideMechanism": "SetCompassHidden",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "compass",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 23
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "Bare control given a death-state hide; overlaps COMPASS_FRAME_FRAGMENT (the scene seam)."
  },
  {
    "id": "player-to-player",
    "name": "Player-to-player interaction prompt",
    "esoGlobal": "PLAYER_TO_PLAYER",
    "kind": "non-fragment-control",
    "hideMechanism": "SetTopLevelHidden",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "interaction",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 25
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "tutorial-system",
    "name": "HUD tutorial info box",
    "esoGlobal": "TUTORIAL_SYSTEM",
    "kind": "non-fragment-control",
    "hideMechanism": "SuppressTutorialType",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "tutorial",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 26
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "Suppressed (TUTORIAL_TYPE_HUD_INFO_BOX) rather than hidden as a control."
  },
  {
    "id": "instance-kick-warning-dead",
    "name": "Instance kick warning",
    "esoGlobal": "INSTANCE_KICK_WARNING_DEAD",
    "kind": "non-fragment-control",
    "hideMechanism": "SetHiddenForReason",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "warning",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 27
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "hud-raid-life",
    "name": "Raid life display",
    "esoGlobal": "HUD_RAID_LIFE",
    "kind": "non-fragment-control",
    "hideMechanism": "SetHiddenForReason",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "meter",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 28
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "gamepad-chat-system",
    "name": "Chat (gamepad HUD)",
    "esoGlobal": "GAMEPAD_CHAT_SYSTEM",
    "kind": "non-fragment-control",
    "hideMechanism": "RefreshVisibility",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "chat",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 30
    },
    "conditional": true,
    "wrapsMultiple": false,
    "grainNotes": "RefreshVisibility only when ShouldOnlyShowOnHUD (conditional)."
  },
  {
    "id": "objective-capture-meter",
    "name": "Objective capture meter",
    "esoGlobal": "OBJECTIVE_CAPTURE_METER",
    "kind": "non-fragment-control",
    "hideMechanism": "SetHiddenForReason",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "meter",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 33
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "floating-markers",
    "name": "Floating world markers",
    "esoGlobal": "FLOATING_MARKERS",
    "kind": "non-fragment-control",
    "hideMechanism": "SetFloatingMarkerGlobalAlpha",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "markers",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 34
    },
    "conditional": false,
    "wrapsMultiple": false,
    "grainNotes": "Hidden via the SetFloatingMarkerGlobalAlpha global — no control handle."
  },
  {
    "id": "shared-information-area",
    "name": "Shared information area",
    "esoGlobal": "SHARED_INFORMATION_AREA",
    "kind": "non-fragment-control",
    "hideMechanism": "SetSupressed",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "info-area",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 35
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "reticle",
    "name": "Reticle",
    "esoGlobal": "RETICLE",
    "kind": "non-fragment-control",
    "hideMechanism": "RequestHidden",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "reticle",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 36
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "hud-infamy-meter",
    "name": "Infamy / bounty meter",
    "esoGlobal": "HUD_INFAMY_METER",
    "kind": "non-fragment-control",
    "hideMechanism": "RequestHidden",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "meter",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 37
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "hud-telvar-meter",
    "name": "Tel Var stone meter",
    "esoGlobal": "HUD_TELVAR_METER",
    "kind": "non-fragment-control",
    "hideMechanism": "SetHiddenForReason",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "meter",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 38
    },
    "conditional": false,
    "wrapsMultiple": false
  },
  {
    "id": "hud-daedric-energy-meter",
    "name": "Daedric energy meter",
    "esoGlobal": "HUD_DAEDRIC_ENERGY_METER",
    "kind": "non-fragment-control",
    "hideMechanism": "SetHiddenForReason",
    "scenes": [
      "hud",
      "hudui",
      "loot"
    ],
    "category": "meter",
    "source": {
      "file": "esoui/ingame/scenes/hudscene.lua",
      "line": 39
    },
    "conditional": false,
    "wrapsMultiple": false
  }
] as const satisfies readonly HudComponentRecord[]
