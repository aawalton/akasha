export interface PinTag {
  [slot: number]: number | string | undefined
  texture?: string
  name?: string
  desc?: string
}

export interface MapPinControl {
  m_PinTag: PinTag
}

export type PinTextureFn = (this: void, self: MapPinControl) => string | undefined

export interface PinDef {
  name: string
  done?: boolean
  section?: boolean
  ach?: number
  filter?: number
  maxDistance?: number
  level?: number
  size?: number
  k?: number
  texture?: string | PinTextureFn
  def_texture?: string
  tint?: ZoColorDef | undefined
  id?: Record<number, number>
  pin?: number[]
  [child: number]: PinDef | undefined
}

export type CustomPinTable = Record<number, PinDef | undefined>

export type MapPinCallbackFn = (this: void, i: number, subzone: string) => void
