import {
  asAnyTable,
  asAnyTableMember,
  asDimsGetter,
} from "../minimap-casts/minimap-casts.module.code.ts"
import type { LooseTable } from "../minimap-view-types/minimap-view-types.module.code.ts"

function roundGet(this: void, control: LooseTable, funcName: string): undefined {
  const org = asDimsGetter(control[funcName])
  control[funcName] = asAnyTableMember(function (
    this: void,
    ctrl: LooseTable
  ): LuaMultiReturn<[number, number]> {
    const [rawW, rawH] = org(ctrl)
    const w = zo_round(rawW * 2 + 0.5) * 0.5
    const h = zo_round(rawH * 2 + 0.5) * 0.5
    return $multi(w, h)
  })
}

function roundSet(this: void, control: LooseTable, funcName: string): undefined {
  const org = asAnyTableMember(control[funcName])
  control[funcName] = asAnyTableMember(function (
    this: void,
    ctrl: LooseTable,
    w: number,
    h: number
  ): unknown {
    const roundedW = zo_round(w * 2 + 0.5) * 0.5
    const roundedH = zo_round(h * 2 + 0.5) * 0.5
    return org(ctrl, roundedW, roundedH)
  })
}

export function installDimensionRounding(this: void): undefined {
  roundGet(asAnyTable(ZO_WorldMapContainer), "GetDimensions")
  roundSet(asAnyTable(ZO_WorldMapContainer), "SetDimensions")
  roundGet(asAnyTable(ZO_WorldMapScroll), "GetDimensions")
  roundSet(asAnyTable(ZO_WorldMapScroll), "SetDimensions")
}
