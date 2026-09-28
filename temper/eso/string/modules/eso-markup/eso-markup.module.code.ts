type MarkupPiece =
  | { readonly kind: "text"; readonly text: string; readonly color: string | undefined }
  | { readonly kind: "icon"; readonly icon: string; readonly color: string | undefined }

const WRAPPED: readonly (readonly [RegExp, string])[] = [
  [/\|u[^:|]*:[^:|]*:[^:|]*:([^|]*)\|u/g, "$1"],
  [/\|H[^|]*\|h([^|]*)\|h/g, "$1"],
  [/\|l[^|]*\|l/g, ""],
]

const CODES = /\|c([0-9a-fA-F]{6})|\|t([^|]*)\|t|\|[a-zA-Z]?/g

export function markupPieces(text: string): readonly MarkupPiece[] {
  const plain = WRAPPED.reduce((held, [shape, kept]) => held.replace(shape, kept), text)
  const pieces: MarkupPiece[] = []
  const colors: string[] = []
  const said = (words: string): undefined => {
    if (words === "") return undefined
    const color = colors.at(-1)
    const last = pieces.at(-1)
    if (last?.kind === "text" && last.color === color) {
      pieces[pieces.length - 1] = { kind: "text", text: last.text + words, color }
      return undefined
    }
    pieces.push({ kind: "text", text: words, color })
    return undefined
  }
  let from = 0
  for (const matched of plain.matchAll(CODES)) {
    said(plain.slice(from, matched.index))
    from = matched.index + matched[0].length
    const [code, color, icon] = matched
    if (color !== undefined) colors.push(color)
    else if (icon !== undefined) pieces.push({ kind: "icon", icon, color: colors.at(-1) })
    else if (code === "|r") colors.pop()
  }
  said(plain.slice(from))
  return pieces
}
