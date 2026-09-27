"use client"

import { markupPieces } from "akasha/temper/eso/string/modules/eso-markup/eso-markup.module.code.ts"

export function EsoMarkupText({ text }: { text: string }) {
  return (
    <>
      {markupPieces(text).map((piece, index) => {
        if (piece.kind === "icon") return null
        if (piece.color === undefined) return <span key={index}>{piece.text}</span>
        return (
          <span key={index} style={{ color: `#${piece.color}` }}>
            {piece.text}
          </span>
        )
      })}
    </>
  )
}
