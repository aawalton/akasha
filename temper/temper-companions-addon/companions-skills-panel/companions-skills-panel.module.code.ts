import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-10"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { TEXT_PRIMARY, TEXT_SECONDARY, TEXT_TERTIARY } from "@akasha/design-tokens/text-color"
import { requireAt } from "@akasha/utils-narrow/require-at"
import {
  type CompanionBuildData,
  SKILL_SLOT_INDICES,
} from "../companions-codec/companions-codec.module.code.ts"
import { decodeCompanionBuild } from "../companions-decoder/companions-decoder.module.code.ts"
import { getAbilityIdFromSkillIndex } from "../companions-reverse-mappings/companions-reverse-mappings.module.code.ts"
import type { SavedCompanionBuild } from "../companions-saved-variables/companions-saved-variables.module.code.ts"
import {
  createCompanionDropdown,
  DROPDOWN_BOTTOM_MARGIN,
  DROPDOWN_HEIGHT,
  getCleanCompanionName,
  getSavedCompanionBuild,
  getSelectedCompanionId,
  isSelectedCompanionActive,
} from "../companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "../companions-target-build-input/companions-target-build-input.module.code.ts"
export const MINI_ICON_SIZE = 24
export const MINI_CARD_HEIGHT = 32
export const MINI_CARD_PADDING = 4
export const MINI_TEXT_LEFT = MINI_ICON_SIZE + MINI_CARD_PADDING * 2
export const SKILL_ROW_HEIGHT = MINI_CARD_HEIGHT
export const SKILL_ROW_SPACING = 4
export const SKILL_SECTION_COL_WIDTH = 80
export const SKILL_SLOT_COL_WIDTH = 90
export const SKILL_VALUE_COL_LEFT = SKILL_SECTION_COL_WIDTH + SKILL_SLOT_COL_WIDTH
export const SKILL_VALUE_COL_WIDTH = 220
export const SKILL_OPTIMAL_COL_LEFT = SKILL_VALUE_COL_LEFT + SKILL_VALUE_COL_WIDTH + 10

export interface SkillMiniCard {
  container: Control
  icon: TextureControl
  nameLabel: LabelControl
}

export interface SkillRow {
  sectionLabel: LabelControl | undefined
  slotLabel: LabelControl
  currentCard: SkillMiniCard
  optimalCard: SkillMiniCard
}

export interface SkillsPanelState {
  panel: Control
  noCompanionLabel: LabelControl
  dataContainer: Control
  rows: SkillRow[]
}

export let skillsState: SkillsPanelState | undefined

export function createSkillMiniCard(
  parent: Control,
  offsetX: number,
  offsetY: number
): SkillMiniCard {
  const container = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, offsetX, offsetY)
  container.SetDimensions(SKILL_VALUE_COL_WIDTH, MINI_CARD_HEIGHT)

  const icon = WINDOW_MANAGER.CreateControl(undefined, container, CT_TEXTURE)
  icon.SetDimensions(MINI_ICON_SIZE, MINI_ICON_SIZE)
  icon.SetAnchor(TOPLEFT, container, TOPLEFT, 0, MINI_CARD_PADDING)

  const nameLabel = WINDOW_MANAGER.CreateControl(undefined, container, CT_LABEL)
  nameLabel.SetAnchor(TOPLEFT, container, TOPLEFT, MINI_TEXT_LEFT, MINI_CARD_PADDING)
  nameLabel.SetDimensions(SKILL_VALUE_COL_WIDTH - MINI_TEXT_LEFT, MINI_ICON_SIZE)
  nameLabel.SetFont("ZoFontGame")
  nameLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  nameLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  nameLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

  return { container, icon, nameLabel }
}

export function renderMiniCard(card: SkillMiniCard, abilityId: number): undefined {
  if (abilityId !== 0) {
    card.icon.SetTexture(GetAbilityIcon(abilityId))
    card.icon.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    card.nameLabel.SetText(GetAbilityName(abilityId))
    card.nameLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  } else {
    card.icon.SetTexture("")
    card.icon.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    card.nameLabel.SetText("Empty")
    card.nameLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
  }
}

export const SKILL_SLOT_LABELS = ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5", "Ultimate"]
export const SKILL_SECTION_LABELS = ["Active", "", "", "", "", "Ultimate"]

export function createCompanionSkillsPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  createCompanionDropdown(panel)
  const contentTop = DROPDOWN_HEIGHT + DROPDOWN_BOTTOM_MARGIN

  const noCompanionLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  noCompanionLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop + 20)
  noCompanionLabel.SetDimensions(400, 40)
  noCompanionLabel.SetFont("ZoFontGame")
  noCompanionLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
  noCompanionLabel.SetText("Summon a companion to view build details")
  noCompanionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  noCompanionLabel.SetHidden(true)

  const dataContainer = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  dataContainer.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop)
  dataContainer.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  dataContainer.SetHidden(true)

  let offsetY = 0
  const rows: SkillRow[] = []

  for (let i = 0; i < 6; i++) {
    let sectionLabel: LabelControl | undefined

    if (SKILL_SECTION_LABELS[i] !== "") {
      sectionLabel = WINDOW_MANAGER.CreateControl(undefined, dataContainer, CT_LABEL)
      sectionLabel.SetAnchor(TOPLEFT, dataContainer, TOPLEFT, 0, offsetY)
      sectionLabel.SetDimensions(SKILL_SECTION_COL_WIDTH, SKILL_ROW_HEIGHT)
      sectionLabel.SetFont("ZoFontGameBold")
      sectionLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
      sectionLabel.SetText(requireAt(SKILL_SECTION_LABELS, i, "SKILL_SECTION_LABELS"))
      sectionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      sectionLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    }

    const slotLabel = WINDOW_MANAGER.CreateControl(undefined, dataContainer, CT_LABEL)
    slotLabel.SetAnchor(TOPLEFT, dataContainer, TOPLEFT, SKILL_SECTION_COL_WIDTH, offsetY)
    slotLabel.SetDimensions(SKILL_SLOT_COL_WIDTH, SKILL_ROW_HEIGHT)
    slotLabel.SetFont("ZoFontGameBold")
    slotLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    slotLabel.SetText(requireAt(SKILL_SLOT_LABELS, i, "SKILL_SLOT_LABELS"))
    slotLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    slotLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const currentCard = createSkillMiniCard(dataContainer, SKILL_VALUE_COL_LEFT, offsetY)
    const optimalCard = createSkillMiniCard(dataContainer, SKILL_OPTIMAL_COL_LEFT, offsetY)
    optimalCard.container.SetHidden(true)

    rows.push({ sectionLabel, slotLabel, currentCard, optimalCard })
    offsetY = offsetY + SKILL_ROW_HEIGHT + SKILL_ROW_SPACING
  }

  skillsState = {
    panel,
    noCompanionLabel,
    dataContainer,
    rows,
  }

  return panel
}

export function hideOptimalSkillsColumn(): undefined {
  if (!skillsState) return
  for (const row of skillsState.rows) {
    row.optimalCard.container.SetHidden(true)
  }
}

export function refreshSkillsFromLive(): undefined {
  if (!skillsState) return

  for (let i = 0; i < SKILL_SLOT_INDICES.length; i++) {
    const slotIndex = requireAt(SKILL_SLOT_INDICES, i, "SKILL_SLOT_INDICES")
    const row = requireAt(skillsState.rows, i, "skillsState.rows")
    const abilityId = GetSlotBoundId(slotIndex, HOTBAR_CATEGORY_COMPANION)
    renderMiniCard(row.currentCard, abilityId)
  }
}

export function refreshSkillsFromSaved(saved: SavedCompanionBuild): undefined {
  if (!skillsState) return

  for (let i = 0; i < skillsState.rows.length; i++) {
    const row = requireAt(skillsState.rows, i, "skillsState.rows")
    const abilityId = saved.skillAbilityIds[i] ?? 0
    renderMiniCard(row.currentCard, abilityId)
  }
}

export function refreshOptimalSkillsColumn(decoded: CompanionBuildData): undefined {
  if (!skillsState) return

  for (let i = 0; i < skillsState.rows.length; i++) {
    const row = requireAt(skillsState.rows, i, "skillsState.rows")
    const skillIndex = decoded.skills[i] ?? 0
    const abilityId = getAbilityIdFromSkillIndex(skillIndex)
    renderMiniCard(row.optimalCard, abilityId)
    row.optimalCard.container.SetHidden(false)
  }
}

export function refreshOptimalSkills(companionId: number): undefined {
  const hash = getTargetBuildHash(companionId)
  if (hash === undefined) {
    hideOptimalSkillsColumn()
    return
  }

  const decoded = decodeCompanionBuild(hash)
  if (decoded === undefined) {
    hideOptimalSkillsColumn()
    return
  }

  refreshOptimalSkillsColumn(decoded)
}

export function refreshCompanionSkillsPanel(): undefined {
  if (!skillsState) return

  const selectedCompanionId = getSelectedCompanionId()

  if (selectedCompanionId === undefined) {
    skillsState.noCompanionLabel.SetText("Select a companion from the dropdown")
    skillsState.noCompanionLabel.SetHidden(false)
    skillsState.dataContainer.SetHidden(true)
    return
  }

  if (isSelectedCompanionActive()) {
    skillsState.noCompanionLabel.SetHidden(true)
    skillsState.dataContainer.SetHidden(false)
    refreshSkillsFromLive()
    refreshOptimalSkills(selectedCompanionId)
    return
  }

  const saved = getSavedCompanionBuild(selectedCompanionId)
  if (saved) {
    skillsState.noCompanionLabel.SetHidden(true)
    skillsState.dataContainer.SetHidden(false)
    refreshSkillsFromSaved(saved)
    refreshOptimalSkills(selectedCompanionId)
    return
  }

  const companionName = getCleanCompanionName(selectedCompanionId)
  skillsState.noCompanionLabel.SetText(`Summon ${companionName} to capture their build`)
  skillsState.noCompanionLabel.SetHidden(false)
  skillsState.dataContainer.SetHidden(true)
}
