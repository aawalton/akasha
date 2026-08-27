import { dontRotateGameCamera } from "./camera"
import { getSavedVariables } from "./saved-variables"
import { BINDING_NAME_NOCAMROTATE_TOGGLE } from "./strings"

declare global {
  var NTY_ToggleRotateGameCamera: (this: void) => undefined
}

ZO_CreateStringId("SI_BINDING_NAME_NOCAMROTATE_TOGGLE", BINDING_NAME_NOCAMROTATE_TOGGLE)

function toggleRotateGameCamera(this: void): undefined {
  const SV = getSavedVariables()
  if (SV.noCameraSpin) {
    SV.noCameraSpin = false
  } else {
    SV.noCameraSpin = true
  }
  dontRotateGameCamera()
}

globalThis.NTY_ToggleRotateGameCamera = toggleRotateGameCamera
