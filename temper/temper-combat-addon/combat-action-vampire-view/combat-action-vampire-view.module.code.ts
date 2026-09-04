import { getBarSettings } from "@akasha/temper-combat-addon/combat-action-bar-settings"
import { onEngineUpdate } from "@akasha/temper-combat-addon/combat-action-engine-context"
import { getStackLabelFont } from "@akasha/temper-combat-addon/combat-action-fonts"
import { vampireStageForAbilityId } from "@akasha/temper-combat-addon/combat-action-vampire-stage"

const SUB_CONTAINERS: readonly string[] = ["Container1", "Container2"]

let stageLabel: LabelControl | undefined

function findActiveStage(): { stage: number; abilityId: number } | undefined {
  const count = GetNumBuffs("player")
  for (let i = 1; i <= count; i = i + 1) {
    const [, , , , , , , , , , abilityId] = GetUnitBuffInfo("player", i)
    const stage = vampireStageForAbilityId(abilityId)
    if (stage !== undefined) {
      return { stage, abilityId }
    }
  }
  return undefined
}

function findStageIcon(stageAbilityId: number): Control | undefined {
  for (const name of SUB_CONTAINERS) {
    const container = ZO_BuffDebuffTopLevelSelfContainer.GetNamedChild(name)
    if (container === undefined) {
      continue
    }
    const childCount = container.GetNumChildren()
    for (let i = 1; i <= childCount; i = i + 1) {
      const child = container.GetChild(i)
      if (
        child !== undefined &&
        child.data !== undefined &&
        child.data.abilityId === stageAbilityId
      ) {
        return child
      }
    }
  }
  return undefined
}

function ensureLabel(): LabelControl {
  if (stageLabel === undefined) {
    const label = WINDOW_MANAGER.CreateControl(
      undefined,
      ZO_BuffDebuffTopLevelSelfContainer,
      CT_LABEL
    )
    label.SetFont(getStackLabelFont(getBarSettings()))
    label.SetColor(1, 1, 1)
    label.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
    label.SetVerticalAlignment(TEXT_ALIGN_TOP)
    label.SetDrawTier(DT_HIGH)
    label.SetHidden(true)
    stageLabel = label
  }
  return stageLabel
}

function onVampireStageUpdate(this: void, _now: number): undefined {
  const label = ensureLabel()
  const active = findActiveStage()
  if (active === undefined) {
    label.SetHidden(true)
    return undefined
  }
  const icon = findStageIcon(active.abilityId)
  if (icon === undefined) {
    label.SetHidden(true)
    return undefined
  }
  label.ClearAnchors()
  label.SetAnchor(TOPRIGHT, icon, TOPRIGHT, -4, 2)
  label.SetText(`${active.stage}`)
  label.SetHidden(false)
  return undefined
}

export function registerVampireStage(this: void): undefined {
  if (!getBarSettings().vampireStageLabelEnabled) {
    return undefined
  }
  onEngineUpdate(onVampireStageUpdate)
  return undefined
}
