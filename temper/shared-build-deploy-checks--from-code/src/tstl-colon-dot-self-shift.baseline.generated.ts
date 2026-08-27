/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Grandfather baseline for `check-tstl-colon-dot-self-shift` (#12686). Each entry
 * is a pre-existing colon-method dot-call site the strengthened gate flags but
 * which is grandfathered (does not fail the gate) until its owning addon's
 * sibling burn-down unit fixes it and regenerates this file.
 *
 * IT HOLDS 20 ROW(S) OVER 9 BUNDLE DIRECTORY(IES) as generated. A row accepts one
 * (bundleSuffix, method, receiver) triple, so the site count the gate reports can
 * differ from the row count where one row covers a re-emitted bundle path.
 *
 * Regenerate with: `bun temper/shared-build-deploy-checks--from-code/src/check-tstl-colon-dot-self-shift.ts --write-baseline`
 * (run after a full `ops temper addon build --all`).
 * Regeneration REFUSES a dist tree it cannot show is complete and current, so a
 * run over stale output cannot re-admit a site somebody has already repaired.
 *
 * Keyed (bundleSuffix, method, receiver); sorted so each addon's rows are
 * contiguous and regeneration yields stable diffs.
 */

import type { SelfShiftBaselineEntry } from "./tstl-colon-dot-self-shift.baseline"

export const SELF_SHIFT_BASELINE: readonly SelfShiftBaselineEntry[] = [
  { bundleSuffix: "LibAddonMenu-2.0/LibAddonMenu-2.0.lua", method: "UpdateAnchors", receiver: "iconPicker" },
  { bundleSuffix: "LibCharacterKnowledge/LibCharacterKnowledge.lua", method: "FireCallbacks", receiver: "Internal" },
  { bundleSuffix: "LibMapData/LibMapData.lua", method: "GetOwningWindow", receiver: "ov" },
  { bundleSuffix: "LibMapData/LibMapData.lua", method: "GetParent", receiver: "ov" },
  { bundleSuffix: "LibMapData/LibMapData.lua", method: "RegisterCallback", receiver: "WORLD_MAP_SCENE" },
  { bundleSuffix: "LibNotification/LibNotification.lua", method: "SetupRow", receiver: "ZO_SortFilterList" },
  { bundleSuffix: "LibSavedVars/LibSavedVars.lua", method: "FireCallbacks", receiver: "cm" },
  { bundleSuffix: "LibSavedVars/LibSavedVars.lua", method: "RegisterCallback", receiver: "cm" },
  { bundleSuffix: "LibSavedVars/LibSavedVars.lua", method: "UnregisterCallback", receiver: "cm" },
  { bundleSuffix: "LibScrollableMenu/LibScrollableMenu.lua", method: "GetOwningWindow", receiver: "asLsmCastGetOwningWindowThisVoidRecordStringUnknownUnde(mocCtrl)" },
  { bundleSuffix: "LibScrollableMenu/LibScrollableMenu.lua", method: "GetOwningWindow", receiver: "asLsmCastGetOwningWindowThisVoidUnknown(mocCtrl)" },
  { bundleSuffix: "LibScrollableMenu/LibScrollableMenu.lua", method: "IsOwnedByComboBox", receiver: "asLsmCastM_dropdownObjectIsOwnedByComboBoxThisVoidCombo(g_contextMenu).m_dropdownObject" },
  { bundleSuffix: "LibScrollableMenu/LibScrollableMenu.lua", method: "IsOwnedByComboBox", receiver: "dropdownObject" },
  { bundleSuffix: "LibScrollableMenu/LibScrollableMenu.lua", method: "Refresh", receiver: "dropdownObject" },
  { bundleSuffix: "LibScrollableMenu/LibScrollableMenu.lua", method: "SetupEntryBase", receiver: "asLsmCastLocalDropdownSetupEntryBase(self.m_dropdownObject)" },
  { bundleSuffix: "LibSets/LibSets.lua", method: "IsControlHidden", receiver: "popupCtrl" },
  { bundleSuffix: "TemperCompanions/TemperCompanions.lua", method: "GetParent", receiver: "asSlotControl(resolvedSlot)" },
  { bundleSuffix: "TemperCrafting/TemperCrafting.lua", method: "GetColor", receiver: "button" },
  { bundleSuffix: "TemperCrafting/TemperCrafting.lua", method: "Refresh", receiver: "LMM2" },
  { bundleSuffix: "TemperCrafting/TemperCrafting.lua", method: "SetFont", receiver: "asFontControl(control)" },
]
