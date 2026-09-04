import {
  getFormattedAbilityIcon,
  getFormattedAbilityName,
  LIBCOMBAT_CPTYPE_PASSIVE,
  LIBCOMBAT_CPTYPE_SLOTTED,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import type { CPStarEntry } from "@akasha/temper-combat-addon/combat-lib-types"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import { isNonNullObject } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { getFightData } from "@akasha/temper-combat-addon/combat-ui-state"
import type {
  CPStarControl,
  ScribedSkillControl,
} from "@akasha/temper-combat-addon/combat-ui-tooltips"

const PASSIVE_REQUIREMENTS = [10, 30, 75, 120]

function updateRightInfoPanelLegacy(this: void, panel: Control): undefined {
  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const cp: unknown = fightData.CP
  const cpData = isNonNullObject<Record<number, Record<number, number>>>(cp) ? cp : undefined
  if (cpData == null) {
    return undefined
  }

  for (let i = 1; i <= 9; i++) {
    const discipline = ((7 - i) % 9) + 1

    const signcontrol = panel.GetNamedChild(`StarSign${i}`)
    if (signcontrol == null) {
      continue
    }

    let sum = 0

    for (let id = 1; id <= 4; id++) {
      const cpvalue = cpData[discipline]?.[id] ?? 0

      const row = signcontrol.GetNamedChild(`Row${id}`)
      const value = row?.GetNamedChild<LabelControl>("Value")

      sum = sum + cpvalue

      value?.SetText(tostring(cpvalue))
    }

    for (let k = 1; k <= 4; k++) {
      const passiveControl = signcontrol.GetNamedChild<TextureControl>(`Passive${k}`)

      const show = sum >= (PASSIVE_REQUIREMENTS[k - 1] ?? 0)

      const texture = show
        ? "esoui/art/mainmenu/menubar_champion_down.dds"
        : "esoui/art/mainmenu/menubar_champion_up.dds"
      const alpha = show ? 1 : 0.4

      passiveControl?.SetTexture(texture)
      passiveControl?.SetAlpha(alpha)
    }
  }
  return undefined
}

function setScribedSkillsPanelHidden(this: void, panel: Control, setHidden: boolean): undefined {
  panel.SetHidden(setHidden)
  panel.GetParent()?.GetNamedChild("Sep")?.SetHidden(setHidden)
  return undefined
}

function updateScribedSkillsPanel(this: void, panel: Control): undefined {
  const fightData = getFightData()
  if (fightData == null) {
    setScribedSkillsPanelHidden(panel, true)
    return undefined
  }
  const scribedSkills = fightData.charData?.scribedSkills ?? {}

  let index = 0
  for (const [abilityId, data] of spairs(scribedSkills)) {
    index = index + 1
    const skillControl = panel.GetNamedChild<ScribedSkillControl>(tostring(index))
    if (skillControl == null) {
      break
    }
    skillControl.SetHidden(false)
    const abilityName = getFormattedAbilityName(abilityId)
    const iconTexture = getFormattedAbilityIcon(abilityId)

    skillControl.GetNamedChild<LabelControl>("Name")?.SetText(abilityName)
    skillControl.abilityId = abilityId
    skillControl.scriptIds = data
    GetControl<TextureControl & Control>(skillControl, "IconTexture")?.SetTexture(iconTexture)

    for (let i = 1; i <= 3; i++) {
      const scriptId = data[i - 1]
      if (scriptId == null) {
        continue
      }
      const scriptControl = skillControl.GetNamedChild(`Script${i}`)
      const scriptName = getFormattedAbilityName(scriptId, true)
      const scriptIcon = getFormattedAbilityIcon(scriptId, true)

      scriptControl?.GetNamedChild<LabelControl>("Name")?.SetText(scriptName)
      scriptControl?.GetNamedChild<TextureControl>("Icon")?.SetTexture(scriptIcon)
    }
    if (index === 10) {
      break
    }
  }

  for (let i = index + 1; i <= panel.GetNumChildren(); i++) {
    panel.GetNamedChild(tostring(i))?.SetHidden(true)
  }

  setScribedSkillsPanelHidden(panel, index === 0)
  return undefined
}

function starOrder(this: void, t: Record<number, CPStarEntry>, a: number, b: number): boolean {
  const typeA = t[a]?.[1] ?? 0
  const typeB = t[b]?.[1] ?? 0

  if (typeA > typeB || (typeA === typeB && a < b)) {
    return true
  }
  return false
}

function setStarControlEmpty(this: void, starControl: CPStarControl): undefined {
  starControl.GetNamedChild("Icon")?.SetHidden(true)
  starControl.GetNamedChild("Name")?.SetHidden(true)
  starControl.GetNamedChild("Value")?.SetHidden(true)
  starControl
    .GetNamedChild<TextureControl>("Ring")
    ?.SetTexture("/esoui/art/champion/actionbar/champion_bar_slot_frame_disabled.dds")

  starControl.slotted = undefined
  starControl.starId = undefined
  starControl.points = undefined
  return undefined
}

function fillEmptySlottedStars(this: void, constellationControl: Control, itemNo: number): number {
  if (itemNo > 4) {
    return itemNo
  }
  for (let i = itemNo; i <= 4; i++) {
    const starControl = constellationControl.GetNamedChild<CPStarControl>(`StarControl${i}`)
    if (starControl != null) {
      setStarControlEmpty(starControl)
    }
  }
  return 5
}

function renderStarControl(
  this: void,
  starControl: CPStarControl,
  starId: number,
  points: number,
  slotted: boolean
): undefined {
  const nameControl = starControl.GetNamedChild<LabelControl>("Name")
  const valueControl = starControl.GetNamedChild<LabelControl>("Value")
  const icon = starControl.GetNamedChild<TextureControl>("Icon")
  const ring = starControl.GetNamedChild<TextureControl>("Ring")

  if (slotted) {
    icon?.SetHidden(false)
    ring?.SetTexture("/esoui/art/champion/actionbar/champion_bar_slot_frame.dds")
  } else {
    starControl.SetHidden(false)
    ring?.SetHidden(true)
    icon?.SetTextureCoords(0.25, 0.5, 0.25, 0.5)
    icon?.SetHidden(false)
  }

  nameControl?.SetHidden(false)
  nameControl?.SetText(
    zo_strformat(SI_CHAMPION_CONSTELLATION_NAME_FORMAT, GetChampionSkillName(starId))
  )

  valueControl?.SetHidden(false)
  valueControl?.SetText(tostring(points))

  starControl.slotted = slotted
  starControl.starId = starId
  starControl.points = points
  return undefined
}

export function updateRightInfoPanel(this: void, panel: Control): undefined {
  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const scribedSkillsPanel = panel.GetNamedChild("ScribedSkills")
  if (scribedSkillsPanel != null) {
    updateScribedSkillsPanel(scribedSkillsPanel)
  }
  const cpData = fightData.CP
  if (cpData == null) {
    return undefined
  }

  const legacyPanel = panel.GetParent()?.GetNamedChild("RightOld")
  if (GetAPIVersion() < 100034 || (cpData.version ?? 0) < 2) {
    panel.SetHidden(true)
    legacyPanel?.SetHidden(false)

    if (legacyPanel != null) {
      updateRightInfoPanelLegacy(legacyPanel)
    }
    return undefined
  }

  panel.SetHidden(false)
  legacyPanel?.SetHidden(true)
  const scrollchild = GetControl(panel, "PanelScrollChild")
  if (scrollchild == null) {
    return undefined
  }

  for (const [disciplineId, discipline] of pairs(cpData)) {
    if (typeof discipline !== "object" || typeof disciplineId !== "number") {
      continue
    }
    const constellationControl = scrollchild.GetNamedChild(`Panel${disciplineId}`)
    if (constellationControl == null) {
      continue
    }
    let itemNo = 1
    const title = constellationControl.GetNamedChild<LabelControl>("Title")
    const top = title?.GetTop() ?? 0
    const disciplineName = zo_strformat(
      SI_CHAMPION_CONSTELLATION_NAME_FORMAT,
      GetChampionDisciplineName(disciplineId)
    )

    title?.SetText(ZO_CachedStrFormat("<<1>> (<<2>>)", disciplineName, discipline.total))

    for (const [starId, starData] of spairs(discipline.stars, starOrder)) {
      const [points, state] = starData

      if (state === LIBCOMBAT_CPTYPE_SLOTTED) {
        const starControl = constellationControl.GetNamedChild<CPStarControl>(
          `StarControl${itemNo}`
        )
        if (starControl != null) {
          renderStarControl(starControl, starId, points, true)
        }
        itemNo = itemNo + 1
      } else if (state === LIBCOMBAT_CPTYPE_PASSIVE) {
        itemNo = fillEmptySlottedStars(constellationControl, itemNo)

        const starControl = constellationControl.GetNamedChild<CPStarControl>(
          `StarControl${itemNo}`
        )
        if (starControl == null) {
          break
        }
        renderStarControl(starControl, starId, points, false)
        itemNo = itemNo + 1
      }
    }
    itemNo = fillEmptySlottedStars(constellationControl, itemNo)

    const bottom = constellationControl.GetNamedChild(`StarControl${itemNo - 1}`)?.GetBottom() ?? 0
    constellationControl.SetHeight(bottom - top)

    let starControl = constellationControl.GetNamedChild<CPStarControl>(`StarControl${itemNo}`)
    while (starControl != null) {
      starControl.SetHidden(true)
      setStarControlEmpty(starControl)
      itemNo = itemNo + 1
      starControl = constellationControl.GetNamedChild<CPStarControl>(`StarControl${itemNo}`)
    }
  }
  return undefined
}
