import {
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface EideticRuntimeEntry {
  c?: number
  b?: number
  pm?: number
  zm?: number
  sm?: number
  px?: number
  py?: number
  pnx?: number
  pny?: number
  zx?: number
  zy?: number
  znx?: number
  zny?: number
  fp?: boolean
  d?: boolean
  q?: number
  qp?: boolean
  qc?: boolean
  xLoc?: number
  yLoc?: number
}

interface BookshelfRuntimeEntry {
  readonly x: number
  readonly y: number
  readonly z: number
  texture?: string
  pinName?: string
}

export type ShalidorMapPinLayout = MapPinLayoutData & {
  grayscale?: (this: void) => boolean
}

export type LoreBooksCompassPinLayout = CompassPinLayout & {
  sizeCallback?: (
    this: void,
    pin: Control,
    angle: number,
    normalizedAngle: number,
    normalizedDistance: number
  ) => void
}

export interface CompassPinControl extends Control {
  pinTag?: unknown
}

interface ShalidorCompassPinTag {
  readonly [SHALIDOR_COLLECTIONINDEX]: number
  readonly [SHALIDOR_BOOKINDEX]: number
}

interface BookshelfCompassPinTag {
  z?: number
}

interface EideticCompassPinTag {
  c?: number
  b?: number
}

export interface ShalidorClickPin extends MapPin {
  m_PinTag: ShalidorCompassPinTag
}
export interface EideticClickPin extends MapPin {
  m_PinTag: EideticCompassPinTag
}

export function asShalidorCompassPinTag(pinTag: unknown): ShalidorCompassPinTag {
  return pinTag as ShalidorCompassPinTag
}
export function asBookshelfCompassPinTag(pinTag: unknown): BookshelfCompassPinTag {
  return pinTag as BookshelfCompassPinTag
}
export function asEideticCompassPinTag(pinTag: unknown): EideticCompassPinTag {
  return pinTag as EideticCompassPinTag
}
export function asTextureControl(control: Control): TextureControl {
  return control as TextureControl
}
type EideticRuntimeEntries = EideticRuntimeEntry[] | undefined
type BookshelfRuntimeEntries = BookshelfRuntimeEntry[] | undefined
export function asEideticRuntimeEntries(value: unknown): EideticRuntimeEntries {
  return value as EideticRuntimeEntries
}
export function asBookshelfRuntimeEntries(value: unknown): BookshelfRuntimeEntries {
  return value as BookshelfRuntimeEntries
}
