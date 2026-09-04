import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import type { SetTextFields } from "../lib-sets-set-text-set-text-fields/lib-sets-set-text-set-text-fields.module.code.ts"
import { checkTraitsNeededGiven } from "../lib-sets-tip-helpers/lib-sets-tip-helpers.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

export function fillSetInfoParts(
  this: void,
  setData: { [key: string]: unknown },
  fields: SetTextFields,
  setInfoParts: { [key: string]: unknown } | undefined
): undefined {
  const {
    isReconstructableSet,
    reconstructionCostText,
    reconstructionCostTextClean,
    setTypeText,
    setTypeTexture,
    setTypeTextClean,
    setNeededTraitsText,
    setNeededTraitsTextClean,
    setDLCText,
    setDLCTextClean,
    setDropMechanicText,
    setDropMechanicTextClean,
    setDropZoneStr,
    setDropZoneStrClean,
    setDropLocationsText,
    setDropLocationsTextClean,
    setDropOverallTextsPerZone,
    setDropOverallTextsPerZoneClean,
  } = fields
  const parts = asPresent(setInfoParts)
  const scratch = STATE.scratch
  parts["reconstruction"] = {
    enabled: isReconstructableSet,
    text: reconstructionCostText,
    textClean: reconstructionCostTextClean,
  }
  parts["setType"] = {
    enabled: setTypeText !== undefined,
    data: setData["setType"],
    text: setTypeText,
    textClean: setTypeTextClean,
    icon: setTypeTexture,
  }
  parts["crafted"] = {
    enabled: !isReconstructableSet && checkTraitsNeededGiven(setData),
    data: setData["traitsNeeded"],
    text: setNeededTraitsText,
    textClean: setNeededTraitsTextClean,
  }
  parts["DLC"] = {
    enabled: setDLCText !== undefined,
    data: setData["dlcid"],
    text: setDLCText,
    textClean: setDLCTextClean,
  }
  parts["dropMechanics"] = {
    enabled: !ZO_IsTableEmpty(scratch.dropMechanicNames),
    data: scratch.dropMechanicNames,
    dataClean: scratch.dropMechanicNamesClean,
    text: setDropMechanicText,
    textClean: setDropMechanicTextClean,
  }
  parts["dropZones"] = {
    enabled: !ZO_IsTableEmpty(scratch.dropZoneNames),
    data: scratch.dropZoneNames,
    text: setDropZoneStr,
    textClean: setDropZoneStrClean,
  }
  parts["dropLocations"] = {
    enabled: !ZO_IsTableEmpty(scratch.dropLocationNames),
    data: scratch.dropLocationNames,
    text: setDropLocationsText,
    textClean: setDropLocationsTextClean,
  }
  parts["overallTextsPerZone"] = {
    enabled: !ZO_IsTableEmpty(setDropOverallTextsPerZone),
    data: setDropOverallTextsPerZone,
    dataClean: setDropOverallTextsPerZoneClean,
  }
}
