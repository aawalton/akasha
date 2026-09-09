import { asLamFactory } from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { HeaderData, LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createBaseControl,
  createFAQTexture,
  getStringFromValue,
  registerForRefreshIfNeeded,
  setUpTooltip,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

const MIN_HEIGHT = 30

function updateValue(this: LamControl): undefined {
  const header = this.header
  if (header !== undefined) {
    header.SetText(getStringFromValue(this.data.name ?? ""))
  }
}

function createHeader(
  this: void,
  parent: LamControl,
  headerData: HeaderData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, headerData, controlName)
  const isHalfWidth = control.isHalfWidth === true
  const width = control.GetWidth()
  control.SetDimensions(isHalfWidth ? width / 2 : width, MIN_HEIGHT)

  const divider = wm.CreateControlFromVirtual<TextureControl>(
    undefined,
    control,
    "ZO_Options_Divider"
  )
  control.divider = divider
  divider.SetWidth(isHalfWidth ? width / 2 : width)
  divider.SetAnchor(TOPLEFT)

  const header = wm.CreateControlFromVirtual<LabelControl>(
    undefined,
    control,
    "ZO_Options_SectionTitleLabel"
  )
  control.header = header
  header.SetAnchor(TOPLEFT, divider, BOTTOMLEFT)
  header.SetAnchor(BOTTOMRIGHT)
  header.SetText(getStringFromValue(headerData.name))
  setUpTooltip(header, headerData)
  const faqTexture = createFAQTexture(control)
  if (faqTexture) {
    faqTexture.SetAnchor(RIGHT, header, RIGHT, 0, 0)
  }

  control.UpdateValue = updateValue

  registerForRefreshIfNeeded(control)

  return control
}

if (registerWidget("header", WIDGET_VERSION.header)) {
  LAMCC.header = asLamFactory(createHeader)
}
