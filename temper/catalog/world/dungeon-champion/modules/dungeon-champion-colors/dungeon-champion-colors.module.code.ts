import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function newColorDef(color: readonly number[]): ZoColorDef {
  return ZO_ColorDef.New(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1, color[3])
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
