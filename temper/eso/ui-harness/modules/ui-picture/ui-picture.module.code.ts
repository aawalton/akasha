import {
  CHROMIUM_ARGS,
  CHROMIUM_LAUNCH_ENV,
} from "akasha/code/browser/test-harness/modules/harness-launch/harness-launch.module.code.ts"
import { charcoal } from "akasha/design/interface/color/pages/charcoal.color.ts"
import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import { paintArt } from "akasha/temper/eso/ui-harness/modules/ui-art-painting/ui-art-painting.module.code.ts"
import { faceKey } from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"
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

const DRAWN = engineConstantsTable().numbers

const CT_LABEL = DRAWN.CT_LABEL

const CT_TEXTURE = DRAWN.CT_TEXTURE

const CT_BUTTON = DRAWN.CT_BUTTON

const CT_BACKDROP = DRAWN.CT_BACKDROP

const CT_SCROLL = DRAWN.CT_SCROLL

const SCREEN_WIDTH = 1920

const SCREEN_HEIGHT = 1080

const DEFAULT_FONT_SIZE = 18

const LINE_OVER_SIZE = 4

const FULL = 255

const DEFAULT_BACKDROP = charcoal.hex

const TEXTURE_TINT = 0.3

const FRAME_TINT = 0.35

const DEFAULT_FAMILY =
  "'Liberation Sans Narrow', 'Arial Narrow', 'Nimbus Sans Narrow', 'Liberation Sans', Arial, sans-serif"

const SERIF_FAMILY = "'Liberation Serif', Georgia, serif"

const BOLD = 700

const MEDIUM = 500

const HANDWRITTEN_FAMILY = "'URW Chancery L', 'Apple Chancery', cursive"

const FONT_WEIGHTS: Readonly<Record<string, number>> = {
  BOLD_FONT: BOLD,
  GAMEPAD_BOLD_FONT: BOLD,
  STONE_TABLET_FONT: BOLD,
  MEDIUM_FONT: MEDIUM,
  GAMEPAD_MEDIUM_FONT: MEDIUM,
  univers67: BOLD,
  ftn87: BOLD,
  "trajanpro-regular": BOLD,
  univers57: MEDIUM,
  ftn57: MEDIUM,
}

const FONT_FAMILIES: Readonly<Record<string, string>> = {
  ANTIQUE_FONT: SERIF_FAMILY,
  STONE_TABLET_FONT: SERIF_FAMILY,
  HANDWRITTEN_FONT: HANDWRITTEN_FAMILY,
  proseantiquepsmt: SERIF_FAMILY,
  "trajanpro-regular": SERIF_FAMILY,
  handwritten_bold: HANDWRITTEN_FAMILY,
}

const FONT_SHADOWS: Readonly<Record<string, string>> = {
  shadow: "1px 1px 0 rgba(0, 0, 0, 0.95)",
  "soft-shadow-thin": "0 0 2px rgba(0, 0, 0, 0.95)",
  "soft-shadow-thick": "0 0 4px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.95)",
  "thick-outline":
    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px #000",
}

const START = "flex-start"

const ALIGN_ACROSS: Readonly<Record<number, string>> = {
  [DRAWN.TEXT_ALIGN_LEFT ?? 0]: START,
  [DRAWN.TEXT_ALIGN_CENTER ?? 1]: "center",
  [DRAWN.TEXT_ALIGN_RIGHT ?? 2]: "flex-end",
}

const ALIGN_DOWN: Readonly<Record<number, string>> = {
  [DRAWN.TEXT_ALIGN_TOP ?? 3]: START,
  [DRAWN.TEXT_ALIGN_CENTER ?? 1]: "center",
  [DRAWN.TEXT_ALIGN_BOTTOM ?? 4]: "flex-end",
}

const CLEAR: UiColor = [0, 0, 0, 0]

const UNTINTED: UiColor = [1, 1, 1, 1]

const INK: UiColor = [...TEXT_PRIMARY, 1]

const TINT: UiColor = [...TEXT_PRIMARY, TEXTURE_TINT]

const FRAME: UiColor = [...TEXT_PRIMARY, FRAME_TINT]

export type UiPictureOptions = {
  readonly screen?: UiRect
  readonly backdrop?: string
  readonly whole?: boolean
  readonly origin?: { readonly left: number; readonly top: number }
  readonly textureAt?: (texture: string) => string | null
  readonly fontAt?: (face: string) => string | null
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

const MARKUP: readonly (readonly [RegExp, string])[] = [
  [/\|u[^:|]*:[^:|]*:[^:|]*:([^|]*)\|u/g, "$1"],
  [/\|H[^|]*\|h([^|]*)\|h/g, "$1"],
]

const CODES = /\|c([0-9a-fA-F]{6})|\|r|\|t([^|]*)\|t/g

const PERCENT = 100

function iconSize(said: string | undefined): string {
  const text = (said ?? "").trim()
  if (text.endsWith("%")) return `${Number(text.slice(0, -1)) / PERCENT}em`
  const number = Number(text)
  return Number.isFinite(number) && number > 0 ? `${number}px` : "1em"
}

function iconHtml(said: string, options: UiPictureOptions): string {
  const [width, height, ...rest] = said.split(":")
  const at = options.textureAt?.(rest.join(":")) ?? null
  if (at === null) return ""
  const size = `width:${iconSize(width)};height:${iconSize(height)};`
  return `<img style="${size}vertical-align:middle" src="${escaped(at)}">`
}

function markedHtml(text: string, options: UiPictureOptions): string {
  const plain = MARKUP.reduce((held, [shape, kept]) => held.replace(shape, kept), text)
  const written: string[] = []
  let open = 0
  let from = 0
  for (const matched of plain.matchAll(CODES)) {
    written.push(escaped(plain.slice(from, matched.index)))
    from = matched.index + matched[0].length
    const [code, color, icon] = matched
    if (color !== undefined) {
      written.push(`<span style="color:#${color}">`)
      open += 1
    } else if (icon !== undefined) {
      written.push(iconHtml(icon, options))
    } else if (code === "|r" && open > 0) {
      written.push("</span>")
      open -= 1
    }
  }
  written.push(escaped(plain.slice(from)), "</span>".repeat(open))
  return written.join("")
}

function asCss(color: UiColor): string {
  const [red = 1, green = 1, blue = 1, opacity = 1] = color
  return `rgba(${Math.round(red * FULL)}, ${Math.round(green * FULL)}, ${Math.round(blue * FULL)}, ${opacity})`
}

function faceOf(font: string | undefined): string {
  return (font ?? "").split("|")[0] ?? ""
}

function facesCss(shown: readonly UiControl[], options: UiPictureOptions): string {
  const faces = new Map<string, string>()
  for (const one of shown) {
    const face = faceOf(one.font)
    const at = face === "" ? null : (options.fontAt?.(face) ?? null)
    if (at !== null) faces.set(faceKey(face), at)
  }
  return [...faces]
    .map(([key, at]) => `@font-face{font-family:'eso-${key}';src:url("${at}");}`)
    .join("\n")
}

function fontOf(font: string | undefined, options: UiPictureOptions): FontFace {
  const parts = (font ?? "").split("|")
  const face = parts[0] ?? ""
  const key = faceKey(face)
  const own = face === "" ? null : (options.fontAt?.(face) ?? null)
  const size = Number(parts[1])
  const shadows = parts
    .slice(2)
    .map((one) => FONT_SHADOWS[one] ?? "")
    .filter((one) => one !== "")
  const near = FONT_FAMILIES[key] ?? DEFAULT_FAMILY
  return {
    family: own === null ? near : `'eso-${key}', ${near}`,
    weight: own === null ? (FONT_WEIGHTS[key] ?? 400) : 400,
    size: Number.isFinite(size) && size > 0 ? size : DEFAULT_FONT_SIZE,
    shadow: shadows.join(", "),
  }
}

type Shown = UiControl & { readonly clip?: UiRect }

function clipUnder(one: UiControl, clip: UiRect | undefined): UiRect | undefined {
  if (one.controlType !== CT_SCROLL) return clip
  const own = { left: one.left, top: one.top, width: one.width, height: one.height }
  if (clip === undefined) return own
  const left = Math.max(own.left, clip.left)
  const top = Math.max(own.top, clip.top)
  const right = Math.min(own.left + own.width, clip.left + clip.width)
  const bottom = Math.min(own.top + own.height, clip.top + clip.height)
  return { left, top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) }
}

function outside(one: UiControl, clip: UiRect): boolean {
  return (
    one.left >= clip.left + clip.width ||
    one.top >= clip.top + clip.height ||
    one.left + one.width <= clip.left ||
    one.top + one.height <= clip.top
  )
}

function shownIn(root: UiControl): readonly Shown[] {
  const shown: Shown[] = []
  function walk(one: UiControl, top: boolean, above: number, clip?: UiRect): undefined {
    if (!top && one.hidden) return undefined
    const alpha = one.alpha * above
    if (alpha <= 0) return undefined
    if (clip === undefined) shown.push({ ...one, alpha })
    else if (!outside(one, clip)) shown.push({ ...one, alpha, clip })
    const under = clipUnder(one, clip)
    for (const child of one.children) walk(child, false, alpha, under)
    return undefined
  }
  walk(root, true, 1)
  return shown
}

function clipCss(one: Shown): string {
  const clip = one.clip
  if (clip === undefined || sizedByText(one)) return ""
  const top = Math.max(0, clip.top - one.top)
  const left = Math.max(0, clip.left - one.left)
  const right = Math.max(0, one.left + one.width - (clip.left + clip.width))
  const bottom = Math.max(0, one.top + one.height - (clip.top + clip.height))
  if (top + left + right + bottom === 0) return ""
  return `clip-path:inset(${top}px ${right}px ${bottom}px ${left}px);`
}

function sizedByText(one: UiControl): boolean {
  return one.controlType === CT_LABEL && one.width === 0 && one.height === 0
}

function listed(values: readonly number[] | undefined): string {
  return (values ?? []).join(",")
}

function artHtml(
  one: UiControl,
  style: string,
  told: string,
  art: Readonly<Record<string, string>>
): string {
  const width = Math.max(1, Math.round(one.width))
  const height = Math.max(1, Math.round(one.height))
  const data = Object.entries(art)
    .map(([key, value]) => ` data-${key}="${escaped(value)}"`)
    .join("")
  return `<canvas class="c"${told} width="${width}" height="${height}" style="${style}"${data}></canvas>`
}

function backdropArt(
  one: UiControl,
  options: UiPictureOptions
): Readonly<Record<string, string>> | null {
  const edge = one.edgeTexture === undefined ? null : (options.textureAt?.(one.edgeTexture) ?? null)
  const center =
    one.centerTexture === undefined ? null : (options.textureAt?.(one.centerTexture) ?? null)
  if (edge === null && center === null) return null
  return {
    art: "backdrop",
    edge: edge ?? "",
    center: center ?? "",
    size: String(one.edgeSize ?? 0),
    insets: listed(one.insets),
    "center-tint": listed(one.centerColor),
    "edge-tint": listed(one.edgeColor),
  }
}

function boxHtml(one: Shown, options: UiPictureOptions): string {
  const from = options.origin ?? { left: 0, top: 0 }
  const size = sizedByText(one)
    ? "overflow:visible;"
    : `width:${one.width}px;height:${one.height}px;`
  const place = `left:${one.left - from.left}px;top:${one.top - from.top}px;${size}${clipCss(one)}`
  const fade = one.alpha >= 1 ? "" : `opacity:${one.alpha};`
  const told = one.name === undefined ? "" : ` title="${escaped(one.name)}"`
  const backdrop = one.controlType === CT_BACKDROP ? backdropArt(one, options) : null
  if (backdrop !== null) return artHtml(one, `${place}${fade}`, told, backdrop)
  const pressable =
    one.controlType === CT_BUTTON && one.normalTexture !== undefined
      ? (options.textureAt?.(one.normalTexture) ?? null)
      : null
  const behind =
    pressable === null
      ? ""
      : artHtml(one, `${place}${fade}`, "", {
          art: "texture",
          src: pressable,
          coords: "",
          tint: "",
        })
  if (one.controlType === CT_BACKDROP) {
    const middle = asCss(one.centerColor ?? CLEAR)
    const wide = one.edgeTexture === undefined ? (one.edgeSize ?? 0) : 1
    const edge =
      wide > 0 ? `box-shadow:inset 0 0 0 ${wide}px ${asCss(one.edgeColor ?? UNTINTED)};` : ""
    return `<div class="c"${told} style="${place}${fade}background:${middle};${edge}"></div>`
  }
  if (one.controlType === CT_LABEL || one.controlType === CT_BUTTON) {
    const face = fontOf(one.font, options)
    const ink = asCss(one.color ?? INK)
    const shadow = face.shadow === "" ? "" : `text-shadow:${face.shadow};`
    const framed =
      one.controlType === CT_BUTTON && (one.text ?? "") !== "" && pressable === null
        ? `box-shadow:inset 0 0 0 1px ${asCss(FRAME)};`
        : ""
    const centred = one.controlType === CT_BUTTON
    const acrossBy = centred ? DRAWN.TEXT_ALIGN_CENTER : DRAWN.TEXT_ALIGN_LEFT
    const downBy = centred ? DRAWN.TEXT_ALIGN_CENTER : DRAWN.TEXT_ALIGN_TOP
    const across = ALIGN_ACROSS[one.alignH ?? acrossBy ?? 0] ?? START
    const down = ALIGN_DOWN[one.alignV ?? downBy ?? 0] ?? START
    const laid = `display:flex;justify-content:${across};align-items:${down};`
    const type = `font-family:${face.family};font-weight:${face.weight};font-size:${face.size}px;line-height:${face.size + LINE_OVER_SIZE}px;`
    return `${behind}<div class="c"${told} style="${place}${fade}color:${ink};${type}${shadow}${laid}${framed}">${markedHtml(one.text ?? "", options)}</div>`
  }
  if (one.controlType === CT_TEXTURE) {
    const named = one.texture
    const at = named === undefined ? null : (options.textureAt?.(named) ?? null)
    if (at !== null) {
      const art = {
        art: "texture",
        src: at,
        coords: listed(one.textureCoords),
        tint: listed(one.color),
      }
      return artHtml(one, `${place}${fade}`, told, art)
    }
    const tint = asCss(one.color ?? TINT)
    return `<div class="c"${told} style="${place}${fade}box-shadow:inset 0 0 0 1px ${tint};"></div>`
  }
  return `<div class="c"${told} style="${place}${fade}"></div>`
}

export function pictureHtml(root: UiControl, options: UiPictureOptions = {}): string {
  const shown = shownIn(root)
  const body = shown.map((one) => boxHtml(one, options)).join("\n")
  const behind = options.backdrop ?? DEFAULT_BACKDROP
  return [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="utf-8"><title>eso ui</title><style>',
    facesCss(shown, options),
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
    await page.evaluate(paintArt)
    await page.screenshot({ path: at })
  } finally {
    await browser.close()
  }
  return taken
}
