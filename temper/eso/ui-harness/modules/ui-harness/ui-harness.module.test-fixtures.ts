import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  type Face,
  faceIn,
  TEMPER_FACES_UNDER,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"
import {
  openUiHarness,
  type UiHarness,
} from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { UNKERNED } from "akasha/temper/eso/ui-harness/modules/ui-kerning/ui-kerning.module.code.ts"
import { virtualsFrom } from "akasha/temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.code.ts"
import { virtualsLua } from "akasha/temper/eso/ui-harness/modules/ui-virtuals-lua/ui-virtuals-lua.module.code.ts"

const ADDON = `
local window = WINDOW_MANAGER:CreateTopLevelWindow("TemperProbeWindow")
window:SetDimensions(400, 300)
window:SetHidden(true)

local title = WINDOW_MANAGER:CreateControl("TemperProbeWindowTitle", window, CT_LABEL)
title:SetAnchor(TOP, window, TOP, 0, 12)
title:SetText("Probe")
title:SetFont("ZoFontWinH3")

local close = WINDOW_MANAGER:CreateControlFromVirtual("TemperProbeWindowClose", window, "ZO_CloseButton")
close:SetHandler("OnClicked", function(self)
  self:GetParent():SetHidden(true)
end)

TemperProbeShown = false
window:SetHandler("OnShow", function(self)
  TemperProbeShown = true
  self:SetHidden(false)
end)
`

const HELD = `
local frame = WINDOW_MANAGER:CreateTopLevelWindow("TemperHeldFrame")
frame:SetDimensions(400, 300)

local capped = WINDOW_MANAGER:CreateControl("TemperHeldCapped", frame, CT_CONTROL)
capped:SetDimensions(500, 20)
capped:SetDimensionConstraints(0, 0, 200, 0)

local floored = WINDOW_MANAGER:CreateControl("TemperHeldFloored", frame, CT_CONTROL)
floored:SetDimensions(10, 10)
floored:SetDimensionConstraints(50, 40, 0, 0)

local spanned = WINDOW_MANAGER:CreateControl("TemperHeldSpanned", frame, CT_CONTROL)
spanned:SetAnchor(TOPLEFT, frame, TOPLEFT, 10, 10)
spanned:SetAnchor(BOTTOMRIGHT, frame, BOTTOMRIGHT, -10, -10)
spanned:SetDimensionConstraints(0, 0, 100, 50)

local centered = WINDOW_MANAGER:CreateControl("TemperHeldCentered", frame, CT_CONTROL)
centered:SetAnchor(CENTER, frame, CENTER, 0, 0)
centered:SetDimensions(300, 300)
centered:SetDimensionConstraints(0, 0, 100, 100)

local worded = WINDOW_MANAGER:CreateControl("TemperHeldWorded", frame, CT_LABEL)
worded:SetText("a line of text far wider than its greatest")
worded:SetFont("EsoUI/Common/Fonts/Univers57.otf|18")
worded:SetDimensionConstraints(0, 500, 60, 0)
`

export const GAME_SIZE = 18

const FONTS = `return __ui_fonts({ ZoFontWinH3 = { face = "EsoUI/Common/Fonts/Univers67.slug", size = 22, effect = "soft-shadow-thick" }, ZoFontGame = { face = "EsoUI/Common/Fonts/Univers57.slug", size = ${GAME_SIZE}, effect = "soft-shadow-thin" } })`

export const PER_EM = 1000

export const LINE = 1200

export const ADVANCES: readonly (readonly [string, number])[] = [
  ["P", 556],
  ["r", 333],
  ["o", 500],
  ["b", 500],
  ["e", 500],
]

const FACE: Face = {
  perEm: PER_EM,
  line: LINE,
  missing: 250,
  advances: new Map(
    ADVANCES.map(([character, wide]): readonly [number, number] => [
      character.codePointAt(0) ?? 0,
      wide,
    ])
  ),
  kerning: UNKERNED,
}

export const SIZE = 20

const MEASURED = `
local window = WINDOW_MANAGER:CreateTopLevelWindow("TemperProbeMeasuring")
local label = WINDOW_MANAGER:CreateControl("TemperProbeMeasuringLabel", window, CT_LABEL)
label:SetText("Probe\\nPro")
label:SetFont("EsoUI/Common/Fonts/Univers57.otf|${SIZE}")
local unkept = WINDOW_MANAGER:CreateTopLevelWindow("TemperProbeUnkept")
local lost = WINDOW_MANAGER:CreateControl("TemperProbeUnkeptLabel", unkept, CT_LABEL)
lost:SetText("Probe")
lost:SetFont("ZoFontNowhere")
local bare = WINDOW_MANAGER:CreateControl("TemperProbeMeasuringBare", window, CT_LABEL)
bare:SetText("Probe")
local kerned = WINDOW_MANAGER:CreateControl("TemperProbeMeasuringKerned", window, CT_LABEL)
kerned:SetText("AVA")
kerned:SetFont("Temper/bin/fonts/Geist-Regular.slug|${SIZE}")
`

const WRAPPED = `
local page = WINDOW_MANAGER:CreateTopLevelWindow("TemperWrapped")
page:SetDimensions(101, 400)
local function worded(name, width)
  local label = WINDOW_MANAGER:CreateControl(name, page, CT_LABEL)
  label:SetFont("EsoUI/Common/Fonts/Univers57.otf|${SIZE}")
  label:SetText("Probe Probe Probe")
  label:SetWidth(width)
  return label
end
worded("TemperWrappedTwo", 101)
worded("TemperWrappedWord", 30):SetText("Probe")
worded("TemperWrappedCapped", 101):SetMaxLineCount(1)
local cut = worded("TemperWrappedCut", 101)
cut:SetMaxLineCount(1)
cut:SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
local spanning = worded("TemperWrappedSpanning", 0)
spanning:SetAnchor(TOPLEFT, page, TOPLEFT, 0, 0)
spanning:SetAnchor(TOPRIGHT, page, TOPRIGHT, 0, 0)
`

const TIPS = `<GuiXml><Controls>
  <Tooltip name="TemperTipTemplate" virtual="true">
    <ResizeToFitPadding width="24" height="30" />
  </Tooltip>
  <Tooltip name="TemperTipGrowing" virtual="true">
    <ResizeToFitPadding width="25" height="25" />
    <DimensionConstraints maxX="350" />
  </Tooltip>
  <Tooltip name="TemperTipPinching" virtual="true">
    <ResizeToFitPadding width="25" height="25" />
    <DimensionConstraints maxX="10" />
  </Tooltip>
</Controls></GuiXml>`

const ELLIPSED = `<GuiXml><Controls>
  <Label name="TemperEllipsedTemplate" virtual="true" font="EsoUI/Common/Fonts/Univers57.otf|${SIZE}" text="Probe Probe Probe" wrapMode="ELLIPSIS" maxLineCount="1">
    <Dimensions x="101" />
  </Label>
</Controls></GuiXml>`

const DECLARED = `
WINDOW_MANAGER:CreateControlFromVirtual("TemperWrappedDeclared", GuiRoot, "TemperEllipsedTemplate")
`

const TIPPED = `
local tip = WINDOW_MANAGER:CreateControlFromVirtual("TemperTip", GuiRoot, "TemperTipTemplate")
tip:SetWidth(200)
tip:AddLine("Probe")
local grown = WINDOW_MANAGER:CreateControlFromVirtual("TemperTipGrown", GuiRoot, "TemperTipGrowing")
grown:AddLine("Probe")
grown:AddLine("Probe Probe")
local held = WINDOW_MANAGER:CreateControlFromVirtual("TemperTipHeld", GuiRoot, "TemperTipGrowing")
held:AddLine(string.rep("Probe ", 20))
local pinched = WINDOW_MANAGER:CreateControlFromVirtual("TemperTipPinched", GuiRoot, "TemperTipPinching")
pinched:AddLine("Probe")
`

export async function openProbed(): Promise<UiHarness> {
  const geist = faceIn(readFileSync(join(akashaRoot(), TEMPER_FACES_UNDER, "Geist-Regular.ttf")))
  const harness = await openUiHarness({
    faces: { univers57: FACE, univers67: FACE, "geist-regular": geist },
  })
  await harness.load(FONTS)
  await harness.load(ADDON)
  await harness.load(HELD)
  await harness.load(MEASURED)
  await harness.load(WRAPPED)
  await harness.templates(virtualsLua(virtualsFrom([TIPS, ELLIPSED]), 10))
  await harness.load(TIPPED)
  await harness.load(DECLARED)
  return harness
}
