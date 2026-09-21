import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export function unpackRgba(
  color: readonly number[]
): LuaMultiReturn<[number, number, number, number | undefined]> {
  return $multi(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1, color[3])
}
