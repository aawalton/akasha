import { asLamFactory } from "../casts"
import { WIDGET_VERSION } from "../constants"
import { lamcc, registerWidget, wm } from "../state"
import type { LamControl, TextureData } from "../types"
import { createBaseControl, setUpTooltip } from "../util"

const MIN_HEIGHT = 26

function createTexture(
  this: void,
  parent: LamControl,
  textureData: TextureData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, textureData, controlName)
  const width = control.GetWidth()
  control.SetResizeToFitDescendents(true)

  if (control.isHalfWidth) {
    control.SetDimensionConstraints(width / 2, MIN_HEIGHT, width / 2, MIN_HEIGHT * 4)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  } else {
    control.SetDimensionConstraints(width, MIN_HEIGHT, width, MIN_HEIGHT * 4)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  }

  const texture = wm.CreateControl(undefined, control, CT_TEXTURE)
  control.texture = texture
  texture.SetAnchor(CENTER)
  texture.SetDimensions(textureData.imageWidth, textureData.imageHeight)
  texture.SetTexture(textureData.image)
  setUpTooltip(texture, textureData)

  return control
}

if (registerWidget("texture", WIDGET_VERSION.texture)) {
  lamcc.texture = asLamFactory(createTexture)
}
