import { ADDON_NAME } from "akasha/temper/combat-addon/combat-actions-constants/combat-actions-constants.module.code.ts"
import { recordCruxDiagnostic } from "akasha/temper/combat-addon/combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"
import { getNow } from "akasha/temper/combat-addon/modules/combat-action-slots/combat-action-slots.module.code.ts"

const CRUX_ICON_KEYWORD = "arcanist_crux"

export function registerCruxDiagnostics(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_crux",
    EVENT_EFFECT_CHANGED,
    function (
      this: void,
      _eventCode: number,
      changeType: number,
      _effectSlot: number,
      _effectName: string,
      unitTag: string,
      _beginTime: number,
      _endTime: number,
      stackCount: number,
      iconName: string,
      _buffType: string,
      _effectType: number,
      _abilityType: number,
      _statusEffectType: number,
      _unitName: string,
      unitId: number,
      abilityId: number,
      sourceType: number
    ): undefined {
      if (!iconName.includes(CRUX_ICON_KEYWORD)) {
        return undefined
      }
      recordCruxDiagnostic({
        t: getNow(),
        changeType,
        sourceType,
        unitTag,
        unitId,
        stackCount,
        abilityId,
        icon: iconName,
      })
      return undefined
    }
  )
  return undefined
}
