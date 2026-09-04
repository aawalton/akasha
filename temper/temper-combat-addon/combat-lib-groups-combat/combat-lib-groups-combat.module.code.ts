import {
  LIB_DEBUG,
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_DAMAGE_SELF,
  LIBCOMBAT_EVENT_FIGHTRECAP,
  LIBCOMBAT_EVENT_FIGHTSUMMARY,
  LIBCOMBAT_EVENT_GROUPRECAP,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_HEAL_SELF,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  onCombatEventDmg,
  onCombatEventDmgGrp,
  onCombatEventDmgIn,
  onCombatEventShield,
  onWTF,
} from "@akasha/temper-combat-addon/combat-lib-damage"
import { onCustomEvent } from "@akasha/temper-combat-addon/combat-lib-effects"
import {
  createEventGroup,
  getAllCallbackTypes,
  type RegisteredEventCallback,
  registerEvent,
  registerPlayerActivatedEvent,
  setGroupActive,
} from "@akasha/temper-combat-addon/combat-lib-events"
import {
  onBossesChanged,
  onCombatState,
  onDuelEndDelayed,
  onDuelStart,
  onMageExplode,
  onPortalWorld,
} from "@akasha/temper-combat-addon/combat-lib-fight"
import {
  onCombatEventHeal,
  onCombatEventHealGrp,
  onCombatEventHealIn,
} from "@akasha/temper-combat-addon/combat-lib-heal"
import { getCurrentSkillBars } from "@akasha/temper-combat-addon/combat-lib-skill-bars"
import { setIsInPortalWorld } from "@akasha/temper-combat-addon/combat-lib-state"
import { onGroupChange } from "@akasha/temper-combat-addon/combat-lib-units"

const EVENT_ACTION_SLOT_ABILITY_SLOTTED_EFFECTIVE = EVENT_HOTBAR_SLOT_CHANGE_REQUESTED

function onPlayerActivated(this: void): undefined {
  zo_callLater(getCurrentSkillBars, 100)
  setIsInPortalWorld(false)
  return undefined
}

createEventGroup("General", getAllCallbackTypes(), (group) => {
  registerEvent(group, EVENT_PLAYER_COMBAT_STATE, onCombatState)
  registerEvent(group, EVENT_DUEL_FINISHED, onDuelEndDelayed)
  registerEvent(group, EVENT_DUEL_STARTED, onDuelStart)
  registerEvent(group, EVENT_GROUP_UPDATE, onGroupChange)
  registerEvent(group, EVENT_ACTION_SLOT_ABILITY_SLOTTED_EFFECTIVE, getCurrentSkillBars)
  registerPlayerActivatedEvent(group, onPlayerActivated)
  registerEvent(group, EVENT_EFFECT_CHANGED, onMageExplode, REGISTER_FILTER_ABILITY_ID, 50184)
  registerEvent(group, EVENT_EFFECT_CHANGED, onPortalWorld, REGISTER_FILTER_ABILITY_ID, 108045)
  registerEvent(group, EVENT_EFFECT_CHANGED, onPortalWorld, REGISTER_FILTER_ABILITY_ID, 121216)

  if (LIB_DEBUG === true) {
    const wtfResults = [
      ACTION_RESULT_BLADETURN,
      ACTION_RESULT_BLOCKED,
      ACTION_RESULT_DIED_XP,
      ACTION_RESULT_KILLING_BLOW,
      ACTION_RESULT_PARTIAL_RESIST,
      ACTION_RESULT_PRECISE_DAMAGE,
      ACTION_RESULT_REFLECTED,
      ACTION_RESULT_RESIST,
      ACTION_RESULT_WRECKING_DAMAGE,
    ]
    for (const result of wtfResults) {
      registerEvent(group, EVENT_COMBAT_EVENT, onWTF, REGISTER_FILTER_COMBAT_RESULT, result)
    }

    registerEvent(
      group,
      EVENT_COMBAT_EVENT,
      onCustomEvent,
      REGISTER_FILTER_COMBAT_RESULT,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      REGISTER_FILTER_IS_ERROR,
      false
    )
  }

  setGroupActive(group, true)
  return undefined
})

const DMG_FILTERS = [
  ACTION_RESULT_DAMAGE,
  ACTION_RESULT_DOT_TICK,
  ACTION_RESULT_BLOCKED_DAMAGE,
  ACTION_RESULT_CRITICAL_DAMAGE,
  ACTION_RESULT_DOT_TICK_CRITICAL,
]

createEventGroup(
  "DmgOut",
  [
    LIBCOMBAT_EVENT_FIGHTRECAP,
    LIBCOMBAT_EVENT_FIGHTSUMMARY,
    LIBCOMBAT_EVENT_DAMAGE_OUT,
    LIBCOMBAT_EVENT_DAMAGE_SELF,
  ],
  (group) => {
    registerEvent(group, EVENT_BOSSES_CHANGED, onBossesChanged)
    for (const filter of DMG_FILTERS) {
      for (const unitType of [COMBAT_UNIT_TYPE_PLAYER, COMBAT_UNIT_TYPE_PLAYER_PET]) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onCombatEventDmg,
          REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
          unitType,
          REGISTER_FILTER_COMBAT_RESULT,
          filter,
          REGISTER_FILTER_IS_ERROR,
          false
        )
      }
    }

    for (const unitType of [COMBAT_UNIT_TYPE_PLAYER, COMBAT_UNIT_TYPE_PLAYER_PET]) {
      registerEvent(
        group,
        EVENT_COMBAT_EVENT,
        onCombatEventShield,
        REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
        unitType,
        REGISTER_FILTER_COMBAT_RESULT,
        ACTION_RESULT_DAMAGE_SHIELDED,
        REGISTER_FILTER_IS_ERROR,
        false
      )
    }

    setGroupActive(group, true)
    return undefined
  }
)

createEventGroup(
  "DmgIn",
  [LIBCOMBAT_EVENT_FIGHTRECAP, LIBCOMBAT_EVENT_FIGHTSUMMARY, LIBCOMBAT_EVENT_DAMAGE_IN],
  (group) => {
    registerEvent(group, EVENT_BOSSES_CHANGED, onBossesChanged)
    for (const filter of DMG_FILTERS) {
      for (const unitType of [COMBAT_UNIT_TYPE_PLAYER, COMBAT_UNIT_TYPE_PLAYER_PET]) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onCombatEventDmgIn,
          REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
          unitType,
          REGISTER_FILTER_COMBAT_RESULT,
          filter,
          REGISTER_FILTER_IS_ERROR,
          false
        )
      }
    }

    for (const unitType of [COMBAT_UNIT_TYPE_PLAYER, COMBAT_UNIT_TYPE_PLAYER_PET]) {
      registerEvent(
        group,
        EVENT_COMBAT_EVENT,
        onCombatEventShield,
        REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
        unitType,
        REGISTER_FILTER_COMBAT_RESULT,
        ACTION_RESULT_DAMAGE_SHIELDED,
        REGISTER_FILTER_IS_ERROR,
        false
      )
    }

    setGroupActive(group, true)
    return undefined
  }
)

const HEAL_FILTERS = [
  ACTION_RESULT_HOT_TICK,
  ACTION_RESULT_HEAL,
  ACTION_RESULT_CRITICAL_HEAL,
  ACTION_RESULT_HOT_TICK_CRITICAL,
]

createEventGroup(
  "HealOut",
  [
    LIBCOMBAT_EVENT_FIGHTRECAP,
    LIBCOMBAT_EVENT_FIGHTSUMMARY,
    LIBCOMBAT_EVENT_HEAL_OUT,
    LIBCOMBAT_EVENT_HEAL_SELF,
  ],
  (group) => {
    registerEvent(group, EVENT_BOSSES_CHANGED, onBossesChanged)
    for (const filter of HEAL_FILTERS) {
      for (const unitType of [COMBAT_UNIT_TYPE_PLAYER, COMBAT_UNIT_TYPE_PLAYER_PET]) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onCombatEventHeal,
          REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
          unitType,
          REGISTER_FILTER_COMBAT_RESULT,
          filter,
          REGISTER_FILTER_IS_ERROR,
          false
        )
      }
    }

    setGroupActive(group, true)
    return undefined
  }
)

createEventGroup(
  "HealIn",
  [LIBCOMBAT_EVENT_FIGHTRECAP, LIBCOMBAT_EVENT_FIGHTSUMMARY, LIBCOMBAT_EVENT_HEAL_IN],
  (group) => {
    registerEvent(group, EVENT_BOSSES_CHANGED, onBossesChanged)
    const filters = [...HEAL_FILTERS, ACTION_RESULT_DAMAGE_SHIELDED]
    for (const filter of filters) {
      for (const unitType of [COMBAT_UNIT_TYPE_PLAYER, COMBAT_UNIT_TYPE_PLAYER_PET]) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onCombatEventHealIn,
          REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
          unitType,
          REGISTER_FILTER_COMBAT_RESULT,
          filter,
          REGISTER_FILTER_IS_ERROR,
          false
        )
      }
    }
    setGroupActive(group, true)
    return undefined
  }
)

createEventGroup("CombatGrp", [LIBCOMBAT_EVENT_FIGHTRECAP, LIBCOMBAT_EVENT_GROUPRECAP], (group) => {
  const filterSets: Array<[RegisteredEventCallback, number[]]> = [
    [
      onCombatEventDmgGrp,
      [
        ACTION_RESULT_DAMAGE,
        ACTION_RESULT_DOT_TICK,
        ACTION_RESULT_BLOCKED_DAMAGE,
        ACTION_RESULT_DAMAGE_SHIELDED,
        ACTION_RESULT_CRITICAL_DAMAGE,
        ACTION_RESULT_DOT_TICK_CRITICAL,
      ],
    ],
    [
      onCombatEventHealGrp,
      [
        ACTION_RESULT_HOT_TICK,
        ACTION_RESULT_HEAL,
        ACTION_RESULT_CRITICAL_HEAL,
        ACTION_RESULT_HOT_TICK_CRITICAL,
        ACTION_RESULT_DAMAGE_SHIELDED,
      ],
    ],
  ]
  for (const [handler, filters] of filterSets) {
    for (const filter of filters) {
      registerEvent(
        group,
        EVENT_COMBAT_EVENT,
        handler,
        REGISTER_FILTER_COMBAT_RESULT,
        filter,
        REGISTER_FILTER_IS_ERROR,
        false
      )
    }
  }
  setGroupActive(group, true)
  return undefined
})
