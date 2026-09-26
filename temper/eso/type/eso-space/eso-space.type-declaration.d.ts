interface Control {
  GetScale: () => number
  SetTransformOffsetX: (x: number) => void
  SetTransformOffsetY: (y: number) => void
  ClearTransformRotation: () => void
  ProjectRectToScreenAndBuildAABB: () => LuaMultiReturn<
    [left: number, top: number, right: number, bottom: number]
  >
}

declare function GetCameraForward(space: number): LuaMultiReturn<[x: number, y: number, z: number]>

declare function zo_rad(degrees: number): number
declare function zo_deg(radians: number): number
declare function zo_tan(radians: number): number
declare function zo_sin(radians: number): number
declare function zo_cos(radians: number): number
declare function zo_mod(dividend: number, divisor: number): number
