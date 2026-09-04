export interface ComponentLabel {
  readonly name: string
  readonly category: string
  readonly wrapsMultiple?: boolean
  readonly grainNotes?: string
}

export const COMPONENT_LABELS: Readonly<Record<string, ComponentLabel>> = {
  DEATH_RECAP_FRAGMENT: { name: "Death recap", category: "death" },
  PLAYER_PROGRESS_BAR_FRAGMENT: { name: "Player progress bar (XP)", category: "progress" },
  COMPASS_FRAME_FRAGMENT: {
    name: "Compass & boss bar",
    category: "compass",
    wrapsMultiple: true,
    grainNotes: "Wraps the compass + the boss health bar under one fragment.",
  },
  ENDLESS_DUNGEON_HUD_FRAGMENT: { name: "Endless dungeon HUD", category: "endless-dungeon" },
  ENDLESS_DUNGEON_HUD_TRACKER_FRAGMENT: { name: "Endless dungeon tracker", category: "tracker" },
  ADVENTURE_ZONE_HUD_FRAGMENT: { name: "Adventure zone HUD", category: "adventure-zone" },
  ADVENTURE_ZONE_HUD_TRACKER_FRAGMENT: { name: "Adventure zone tracker", category: "tracker" },
  DYNAMIC_EVENTS_TRACKER_FRAGMENT: { name: "Dynamic events tracker", category: "tracker" },
  FOCUSED_QUEST_TRACKER_FRAGMENT: { name: "Quest tracker", category: "tracker" },
  ACTIVITY_TRACKER_FRAGMENT: { name: "Activity finder tracker", category: "tracker" },
  READY_CHECK_TRACKER_FRAGMENT: {
    name: "Ready check tracker",
    category: "tracker",
    wrapsMultiple: true,
    grainNotes: "Wraps the per-role ready-check indicator icons.",
  },
  ACTION_BAR_FRAGMENT: { name: "Action bar", category: "action-bar" },
  HUD_EQUIPMENT_STATUS_FRAGMENT: { name: "Equipment durability status", category: "equipment" },
  CONTEXTUAL_ACTION_BAR_AREA_FRAGMENT: { name: "Contextual action bar", category: "action-bar" },
  HUD_FRAGMENT: {
    name: "HUD master fragment",
    category: "system",
    grainNotes:
      "The master HUD fragment; its UpdateVisibility drives the non-fragment control toggles below.",
  },
  DEATH_FRAGMENT: { name: "Death screen", category: "death" },
  UNIT_FRAMES_FRAGMENT: {
    name: "Unit frames",
    category: "unit-frame",
    wrapsMultiple: true,
    grainNotes: "Wraps player / target / group / raid frames under one fragment.",
  },
  PLAYER_ATTRIBUTE_BARS_FRAGMENT: {
    name: "Player attribute bars",
    category: "attributes",
    wrapsMultiple: true,
    grainNotes: "Wraps the health / magicka / stamina bars (= 1 component, not 3).",
  },
  PERFORMANCE_METER_FRAGMENT: {
    name: "Performance / FPS meter",
    category: "meter",
    grainNotes: "Already suppressed by TemperHud through SetHiddenForReason.",
  },
  PLAYER_PROGRESS_BAR_GAMEPAD_HIDE_NAME_LOCATION_FRAGMENT: {
    name: "Gamepad progress bar (hide name/location)",
    category: "progress",
  },
  SUBTITLE_HUD_FRAGMENT: { name: "Subtitles", category: "subtitle" },
  GAMEPAD_LOOT_HISTORY_FRAGMENT: { name: "Loot history (gamepad)", category: "loot" },
  KEYBOARD_LOOT_HISTORY_FRAGMENT: { name: "Loot history (keyboard)", category: "loot" },
  HOUSING_HUD_FRAGMENT: { name: "Housing HUD", category: "housing" },
  BUFF_DEBUFF_FRAGMENT: {
    name: "Buffs & debuffs",
    category: "buff-debuff",
    wrapsMultiple: true,
    grainNotes: "Wraps the self + target buff/debuff containers under one fragment.",
  },
  HOUSING_HUD_ACTION_LAYER_FRAGMENT: { name: "Housing action layer", category: "housing" },
  BATTLEGROUND_HUD_FRAGMENT: { name: "Battleground HUD", category: "battleground" },
  BATTLEGROUND_HUD_ACTION_LAYER_FRAGMENT: {
    name: "Battleground action layer",
    category: "battleground",
  },
  ZONE_STORY_TRACKER_FRAGMENT: { name: "Zone story tracker", category: "tracker" },
  HOUSE_INFORMATION_TRACKER_FRAGMENT: { name: "House information tracker", category: "tracker" },
  HOUSING_EDITOR_INSPECTION_HUD_FRAGMENT: {
    name: "Housing editor inspection HUD",
    category: "housing",
  },
  PROMOTIONAL_EVENT_TRACKER_FRAGMENT: {
    name: "Promotional event tracker",
    category: "tracker",
    grainNotes: "FCOChangeStuff hides the tracker today through a path of its own.",
  },
  SPECTATOR_CAMERA_ACTION_LAYER_FRAGMENT: {
    name: "Spectator camera action layer",
    category: "spectator",
  },

  RETICLE_MODE_FRAGMENT: {
    name: "Reticle mode",
    category: "mode",
    grainNotes: "Toggles PLAYER_TO_PLAYER top-level visibility on the hud scene.",
  },
  MOUSE_UI_MODE_FRAGMENT: { name: "Mouse UI mode", category: "mode" },
  FORCE_CONSOLE_WARNING_FRAGMENT: { name: "Force-console warning", category: "warning" },
  LOOT_WINDOW_FRAGMENT: { name: "Loot window", category: "loot" },
  FRAME_EMOTE_FRAGMENT_LOOT: { name: "Frame emote (loot)", category: "loot" },

  COMPASS_FRAME: {
    name: "Compass frame (control)",
    category: "compass",
    grainNotes:
      "Bare control given a death-state hide; overlaps COMPASS_FRAME_FRAGMENT (the scene seam).",
  },
  PLAYER_TO_PLAYER: { name: "Player-to-player interaction prompt", category: "interaction" },
  TUTORIAL_SYSTEM: {
    name: "HUD tutorial info box",
    category: "tutorial",
    grainNotes: "Suppressed (TUTORIAL_TYPE_HUD_INFO_BOX) rather than hidden as a control.",
  },
  INSTANCE_KICK_WARNING_DEAD: { name: "Instance kick warning", category: "warning" },
  HUD_RAID_LIFE: { name: "Raid life display", category: "meter" },
  GAMEPAD_CHAT_SYSTEM: {
    name: "Chat (gamepad HUD)",
    category: "chat",
    grainNotes: "RefreshVisibility only when ShouldOnlyShowOnHUD (conditional).",
  },
  OBJECTIVE_CAPTURE_METER: { name: "Objective capture meter", category: "meter" },
  FLOATING_MARKERS: {
    name: "Floating world markers",
    category: "markers",
    grainNotes: "Hidden via the SetFloatingMarkerGlobalAlpha global — no control handle.",
  },
  SHARED_INFORMATION_AREA: { name: "Shared information area", category: "info-area" },
  RETICLE: { name: "Reticle", category: "reticle" },
  HUD_INFAMY_METER: { name: "Infamy / bounty meter", category: "meter" },
  HUD_TELVAR_METER: { name: "Tel Var stone meter", category: "meter" },
  HUD_DAEDRIC_ENERGY_METER: { name: "Daedric energy meter", category: "meter" },
}

export function humanizeGlobal(esoGlobal: string): string {
  const base = esoGlobal
    .replace(/_FRAGMENT$/, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .trim()
  if (base.length === 0) return esoGlobal
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export const UNCATEGORIZED = "uncategorized"
