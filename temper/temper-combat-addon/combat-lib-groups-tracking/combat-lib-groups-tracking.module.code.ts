import {
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED,
  LIBCOMBAT_EVENT_RESOURCES,
  SOURCE_BUGGED_BUFFS,
  SPECIAL_BUFFS,
  SPECIAL_DEBUFFS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  onEffectChanged,
  onGroupEffectIn,
  onGroupEffectOut,
  onSourceBuggedEffectChanged,
  onSpecialBuffEvent,
  onSpecialDebuffEvent,
} from "@akasha/temper-combat-addon/combat-lib-effects"
import {
  createEventGroup,
  registerEvent,
  setGroupActive,
} from "@akasha/temper-combat-addon/combat-lib-events"
import {
  onBaseResourceChangedDelayed,
  onResourceChanged,
} from "@akasha/temper-combat-addon/combat-lib-resources"
import { onShadowMundus, onTFSChanged } from "@akasha/temper-combat-addon/combat-lib-stats"
import { onTrialDummy } from "@akasha/temper-combat-addon/combat-lib-units"

createEventGroup(
  "Effects",
  [
    LIBCOMBAT_EVENT_EFFECTS_IN,
    LIBCOMBAT_EVENT_EFFECTS_OUT,
    LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
    LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  ],
  (group) => {
    registerEvent(
      group,
      EVENT_EFFECT_CHANGED,
      onEffectChanged,
      REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_PLAYER
    )
    registerEvent(
      group,
      EVENT_EFFECT_CHANGED,
      onEffectChanged,
      REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_PLAYER_PET
    )
    for (const sourceType of [
      COMBAT_UNIT_TYPE_NONE,
      COMBAT_UNIT_TYPE_GROUP,
      COMBAT_UNIT_TYPE_TARGET_DUMMY,
      COMBAT_UNIT_TYPE_OTHER,
    ]) {
      registerEvent(
        group,
        EVENT_EFFECT_CHANGED,
        onEffectChanged,
        REGISTER_FILTER_UNIT_TAG,
        "player",
        REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
        sourceType
      )
    }

    const specialResults = [
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      ACTION_RESULT_EFFECT_FADED,
      ACTION_RESULT_EFFECT_GAINED,
    ]
    for (const abilityId of SPECIAL_BUFFS) {
      for (const result of specialResults) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onSpecialBuffEvent,
          REGISTER_FILTER_COMBAT_RESULT,
          result,
          REGISTER_FILTER_ABILITY_ID,
          abilityId,
          REGISTER_FILTER_IS_ERROR,
          false
        )
      }
    }

    for (const abilityId of SPECIAL_DEBUFFS) {
      for (const result of specialResults) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onSpecialDebuffEvent,
          REGISTER_FILTER_COMBAT_RESULT,
          result,
          REGISTER_FILTER_ABILITY_ID,
          abilityId,
          REGISTER_FILTER_IS_ERROR,
          false
        )
      }
    }

    for (const abilityId of SOURCE_BUGGED_BUFFS) {
      registerEvent(
        group,
        EVENT_EFFECT_CHANGED,
        onSourceBuggedEffectChanged,
        REGISTER_FILTER_ABILITY_ID,
        abilityId
      )
    }

    registerEvent(
      group,
      EVENT_COMBAT_EVENT,
      onTrialDummy,
      REGISTER_FILTER_ABILITY_ID,
      120024,
      REGISTER_FILTER_COMBAT_RESULT,
      ACTION_RESULT_EFFECT_GAINED,
      REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_TARGET_DUMMY,
      REGISTER_FILTER_IS_ERROR,
      false
    )

    setGroupActive(group, true)
    return undefined
  }
)

createEventGroup("GroupEffectsIn", [LIBCOMBAT_EVENT_GROUPEFFECTS_IN], (group) => {
  registerEvent(
    group,
    EVENT_EFFECT_CHANGED,
    onGroupEffectIn,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_GROUP,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "group"
  )
  setGroupActive(group, true)
  return undefined
})

createEventGroup("GroupEffectsOut", [LIBCOMBAT_EVENT_GROUPEFFECTS_OUT], (group) => {
  for (const unitTag of ["", "reticleover", "reticleoverplayer"]) {
    registerEvent(
      group,
      EVENT_EFFECT_CHANGED,
      onGroupEffectOut,
      REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_GROUP,
      REGISTER_FILTER_UNIT_TAG,
      unitTag
    )
  }
  registerEvent(
    group,
    EVENT_EFFECT_CHANGED,
    onGroupEffectOut,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_GROUP,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "boss"
  )
  setGroupActive(group, true)
  return undefined
})

createEventGroup("Stats", [LIBCOMBAT_EVENT_PLAYERSTATS], (group) => {
  registerEvent(
    group,
    EVENT_EFFECT_CHANGED,
    onShadowMundus,
    REGISTER_FILTER_UNIT_TAG,
    "player",
    REGISTER_FILTER_ABILITY_ID,
    13984
  )

  registerEvent(
    group,
    EVENT_EFFECT_CHANGED,
    onTFSChanged,
    REGISTER_FILTER_UNIT_TAG,
    "player",
    REGISTER_FILTER_ABILITY_ID,
    51176
  )

  setGroupActive(group, true)
  return undefined
})

createEventGroup("AdvancedStats", [LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED], (group) => {
  setGroupActive(group, true)
  return undefined
})

createEventGroup("Resources", [LIBCOMBAT_EVENT_RESOURCES], (group) => {
  registerEvent(
    group,
    EVENT_POWER_UPDATE,
    onBaseResourceChangedDelayed,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )
  for (const result of [ACTION_RESULT_POWER_ENERGIZE, ACTION_RESULT_POWER_DRAIN]) {
    registerEvent(
      group,
      EVENT_COMBAT_EVENT,
      onResourceChanged,
      REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_PLAYER,
      REGISTER_FILTER_COMBAT_RESULT,
      result,
      REGISTER_FILTER_IS_ERROR,
      false
    )
  }
  setGroupActive(group, true)
  return undefined
})
