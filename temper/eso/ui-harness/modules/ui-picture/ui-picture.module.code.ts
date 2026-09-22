import {
  CHROMIUM_ARGS,
  CHROMIUM_LAUNCH_ENV,
} from "akasha/code/browser/test-harness/modules/harness-launch/harness-launch.module.code.ts"
import { charcoal } from "akasha/design/interface/color/pages/charcoal.color.ts"
import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import type {
  UiColor,
  UiControl,
} from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { chromium } from "playwright-core"

export type UiRect = {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
}

const CT_LABEL = 2

const CT_TEXTURE = 3

const CT_BUTTON = 4

const CT_BACKDROP = 8

const SCREEN_WIDTH = 1920

const SCREEN_HEIGHT = 1080

const DEFAULT_FONT_SIZE = 18

const LINE_OVER_SIZE = 4

const FULL = 255

const DEFAULT_BACKDROP = charcoal.hex

const TEXTURE_TINT = 0.3

const FRAME_TINT = 0.35

const DEFAULT_FAMILY =
  "'Liberation Sans Narrow', 'Arial Narrow', 'Liberation Sans', Arial, sans-serif"

const SERIF_FAMILY = "'Liberation Serif', Georgia, serif"

const FONT_WEIGHTS: Readonly<Record<string, number>> = {
  BOLD_FONT: 700,
  GAMEPAD_BOLD_FONT: 700,
  STONE_TABLET_FONT: 700,
  MEDIUM_FONT: 500,
  GAMEPAD_MEDIUM_FONT: 500,
}

const FONT_FAMILIES: Readonly<Record<string, string>> = {
  ANTIQUE_FONT: SERIF_FAMILY,
  STONE_TABLET_FONT: SERIF_FAMILY,
  HANDWRITTEN_FONT: "'URW Chancery L', 'Apple Chancery', cursive",
}

const FONT_SHADOWS: Readonly<Record<string, string>> = {
  shadow: "1px 1px 0 rgba(0, 0, 0, 0.95)",
  "soft-shadow-thin": "0 0 2px rgba(0, 0, 0, 0.95)",
  "soft-shadow-thick": "0 0 4px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.95)",
  "thick-outline":
    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px #000",
}

const FONT_NAMED = /\$\(([A-Z_0-9]+)\)/

const ALIGN_START = 0

const ALIGN_MIDDLE = 1

const ALIGN_WAYS: Readonly<Record<number, string>> = {
  0: "flex-start",
  1: "center",
  2: "flex-end",
}

const CLEAR: UiColor = [0, 0, 0, 0]

const INK: UiColor = [...TEXT_PRIMARY, 1]

const TINT: UiColor = [...TEXT_PRIMARY, TEXTURE_TINT]

const FRAME: UiColor = [...TEXT_PRIMARY, FRAME_TINT]

export type UiPictureOptions = {
  readonly screen?: UiRect
  readonly backdrop?: string
  readonly whole?: boolean
  readonly origin?: { readonly left: number; readonly top: number }
  readonly textureAt?: (texture: string) => string | null
}

type FontFace = {
  readonly family: string
  readonly weight: number
  readonly size: number
  readonly shadow: string
}

function escaped(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function asCss(color: UiColor): string {
  const [red = 1, green = 1, blue = 1, opacity = 1] = color
  return `rgba(${Math.round(red * FULL)}, ${Math.round(green * FULL)}, ${Math.round(blue * FULL)}, ${opacity})`
}

function fontOf(font: string | undefined): FontFace {
  const parts = (font ?? "").split("|")
  const matched = FONT_NAMED.exec(parts[0] ?? "")
  const key = matched === null ? "" : (matched[1] ?? "")
  const size = Number(parts[1])
  const shadows = parts
    .slice(2)
    .map((one) => FONT_SHADOWS[one] ?? "")
    .filter((one) => one !== "")
  return {
    family: FONT_FAMILIES[key] ?? DEFAULT_FAMILY,
    weight: FONT_WEIGHTS[key] ?? 400,
    size: Number.isFinite(size) && size > 0 ? size : DEFAULT_FONT_SIZE,
    shadow: shadows.join(", "),
  }
}

function shownIn(root: UiControl): readonly UiControl[] {
  const shown: UiControl[] = []
  function walk(one: UiControl, top: boolean): undefined {
    if (!top && one.hidden) return undefined
    shown.push(one)
    for (const child of one.children) walk(child, false)
    return undefined
  }
  walk(root, true)
  return shown
}

function boxHtml(one: UiControl, options: UiPictureOptions): string {
  const from = options.origin ?? { left: 0, top: 0 }
  const place = `left:${one.left - from.left}px;top:${one.top - from.top}px;width:${one.width}px;height:${one.height}px;`
  const fade = one.alpha >= 1 ? "" : `opacity:${one.alpha};`
  const told = one.name === undefined ? "" : ` title="${escaped(one.name)}"`
  if (one.controlType === CT_BACKDROP) {
    const middle = asCss(one.centerColor ?? CLEAR)
    const edge = asCss(one.edgeColor ?? CLEAR)
    return `<div class="c"${told} style="${place}${fade}background:${middle};box-shadow:inset 0 0 0 1px ${edge};"></div>`
  }
  if (one.controlType === CT_LABEL || one.controlType === CT_BUTTON) {
    const face = fontOf(one.font)
    const ink = asCss(one.color ?? INK)
    const shadow = face.shadow === "" ? "" : `text-shadow:${face.shadow};`
    const framed =
      one.controlType === CT_BUTTON ? `box-shadow:inset 0 0 0 1px ${asCss(FRAME)};` : ""
    const middled = one.controlType === CT_BUTTON ? ALIGN_MIDDLE : ALIGN_START
    const across = ALIGN_WAYS[one.alignH ?? middled] ?? ALIGN_WAYS[ALIGN_START]
    const down = ALIGN_WAYS[one.alignV ?? middled] ?? ALIGN_WAYS[ALIGN_START]
    const laid = `display:flex;justify-content:${across};align-items:${down};`
    const type = `font-family:${face.family};font-weight:${face.weight};font-size:${face.size}px;line-height:${face.size + LINE_OVER_SIZE}px;`
    return `<div class="c"${told} style="${place}${fade}color:${ink};${type}${shadow}${laid}${framed}">${escaped(one.text ?? "")}</div>`
  }
  if (one.controlType === CT_TEXTURE) {
    const named = one.texture
    const at = named === undefined ? null : (options.textureAt?.(named) ?? null)
    if (at !== null) {
      return `<img class="c"${told} style="${place}${fade}" src="${escaped(at)}">`
    }
    const tint = asCss(one.color ?? TINT)
    return `<div class="c"${told} style="${place}${fade}box-shadow:inset 0 0 0 1px ${tint};"></div>`
  }
  return `<div class="c"${told} style="${place}${fade}"></div>`
}

export function pictureHtml(root: UiControl, options: UiPictureOptions = {}): string {
  const body = shownIn(root)
    .map((one) => boxHtml(one, options))
    .join("\n")
  const behind = options.backdrop ?? DEFAULT_BACKDROP
  return [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="utf-8"><title>eso ui</title><style>',
    `html,body{margin:0;padding:0;background:${behind};}`,
    ".c{position:absolute;box-sizing:border-box;overflow:hidden;white-space:pre;}",
    "</style></head><body>",
    body,
    "</body></html>",
  ].join("\n")
}

export async function takePicture(
  root: UiControl,
  at: string,
  options: UiPictureOptions = {}
): Promise<UiRect> {
  const screen: UiRect = options.screen ?? {
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
  const taken: UiRect =
    options.whole === true
      ? screen
      : { left: root.left, top: root.top, width: root.width, height: root.height }
  const wide = Math.max(1, Math.round(taken.width))
  const tall = Math.max(1, Math.round(taken.height))
  const browser = await chromium.launch({
    headless: true,
    args: CHROMIUM_ARGS,
    env: CHROMIUM_LAUNCH_ENV,
  })
  try {
    const page = await browser.newPage({ viewport: { width: wide, height: tall } })
    await page.setContent(pictureHtml(root, { ...options, screen, origin: taken }), {
      waitUntil: "load",
    })
    await page.screenshot({ path: at })
  } finally {
    await browser.close()
  }
  return taken
}
