import type { SurfaceLevel } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  colorOf,
  styleText,
  styleTextOverPlay,
  type TextRole,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { fontOf } from "akasha/temper/window/modules/type-scale/type-scale.module.code.ts"
import { buildButton } from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type DataState = "loading" | "empty" | "failed" | "loaded"

export interface DataStateWords {
  empty: string
  loading?: string
  failed?: string
  retry?: (this: void) => undefined
  level: SurfaceLevel
  overPlay?: boolean
}

export interface DataStateView {
  control: Control
  show: (this: void, state: DataState, detail?: string) => undefined
}

type Spinning = TextureControl & {
  SetTextureRotation: (radians: number, centerX?: number, centerY?: number) => undefined
}

const SPINNER_TEXTURE = "Temper/bin/textures/loader.dds"

const SPINNER_SIZE = 16

const TURN = 2 * math.pi

const TURNS_A_SECOND = 1

const TITLE_GAP = 8

const ACTION_GAP = 16

const TEXT_WIDTH = 384

const FAILED_TITLE = "Failed to load"

const TRY_AGAIN = "Try again"

const OPAQUE = 1

const SPIN_HANDLER = "TemperDataStateSpin"

function styled(label: LabelControl, role: TextRole, overPlay: boolean): LabelControl {
  if (overPlay) styleTextOverPlay(label, role)
  else styleText(label, role)
  label.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  label.SetWidth(TEXT_WIDTH)
  return label
}

function buildSpinner(parent: Control): Spinning {
  const spinner = WINDOW_MANAGER.CreateControl(undefined, parent, CT_TEXTURE) as Spinning
  spinner.SetTexture(SPINNER_TEXTURE)
  spinner.SetDimensions(SPINNER_SIZE, SPINNER_SIZE)
  const [red, green, blue] = colorOf("muted")
  spinner.SetColor(red, green, blue, OPAQUE)
  return spinner
}

function spin(spinner: Spinning, on: boolean): undefined {
  if (!on) {
    spinner.SetHandler("OnUpdate", undefined, SPIN_HANDLER)
    return undefined
  }
  spinner.SetHandler(
    "OnUpdate",
    () => {
      const turned = (GetFrameTimeSeconds() * TURNS_A_SECOND) % 1
      spinner.SetTextureRotation(-turned * TURN)
    },
    SPIN_HANDLER
  )
  return undefined
}

export function buildDataState(parent: Control, words: DataStateWords): DataStateView {
  const overPlay = words.overPlay === true
  const control = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  control.SetAnchorFill()
  const stack = WINDOW_MANAGER.CreateControl(undefined, control, CT_CONTROL)
  stack.SetWidth(TEXT_WIDTH)
  stack.SetAnchor(CENTER, control, CENTER, 0, 0)
  const spinner = buildSpinner(stack)
  const title = styled(
    WINDOW_MANAGER.CreateControl(undefined, stack, CT_LABEL),
    "heading",
    overPlay
  )
  title.SetFont(fontOf("lg", 500))
  title.SetText(FAILED_TITLE)
  const detail = styled(WINDOW_MANAGER.CreateControl(undefined, stack, CT_LABEL), "muted", overPlay)
  const again = words.retry
  const retry =
    again === undefined
      ? undefined
      : buildButton(stack, undefined, TRY_AGAIN, "secondary", words.level)
  if (retry !== undefined && again !== undefined) retry.SetHandler("OnClicked", () => again())

  function place(shown: readonly Control[]): undefined {
    let top = 0
    for (let at = 0; at < shown.length; at += 1) {
      const one = shown[at]
      if (one === undefined) continue
      if (at > 0) top += one === retry ? ACTION_GAP : TITLE_GAP
      one.ClearAnchors()
      one.SetAnchor(TOP, stack, TOP, 0, top)
      top += one.GetHeight()
    }
    stack.SetHeight(top)
    return undefined
  }

  function show(state: DataState, given?: string): undefined {
    control.SetHidden(state === "loaded")
    const loading = state === "loading"
    const failed = state === "failed"
    spinner.SetHidden(!loading)
    spin(spinner, loading)
    title.SetHidden(!failed)
    retry?.SetHidden(!failed)
    const text = given ?? (loading ? words.loading : failed ? words.failed : words.empty) ?? ""
    detail.SetText(text)
    const hasDetail = state !== "loaded" && text !== ""
    detail.SetHidden(!hasDetail)
    const shown: Control[] = []
    if (loading) shown.push(spinner)
    if (failed) shown.push(title)
    if (hasDetail) {
      detail.SetHeight(detail.GetTextHeight())
      shown.push(detail)
    }
    if (failed && retry !== undefined) shown.push(retry)
    place(shown)
    return undefined
  }

  show("loaded")
  return { control, show }
}
