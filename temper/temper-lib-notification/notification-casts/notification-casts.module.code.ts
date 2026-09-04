export type GlobalTable = Record<string, unknown>

export function asTextureControl(value: unknown): TextureControl {
  return value as TextureControl
}
