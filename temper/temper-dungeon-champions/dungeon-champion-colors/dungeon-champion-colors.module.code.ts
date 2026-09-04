export function newColorDef(color: readonly number[]): ZoColorDef {
  return ZO_ColorDef.New(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1, color[3])
}

export function unpackRgba(
  color: readonly number[]
): LuaMultiReturn<[number, number, number, number | undefined]> {
  return $multi(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1, color[3])
}

export function setTextureColor(
  texture: TextureControl | undefined,
  color: readonly number[]
): undefined {
  if (texture !== undefined) {
    texture.SetColor(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1, color[3])
  }
  return undefined
}
