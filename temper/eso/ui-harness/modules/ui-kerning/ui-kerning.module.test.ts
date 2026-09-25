import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  faceIn,
  TEMPER_FACES_UNDER,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"
import {
  type Kerning,
  UNKERNED,
} from "akasha/temper/eso/ui-harness/modules/ui-kerning/ui-kerning.module.code.ts"

const GEIST = readFileSync(join(akashaRoot(), TEMPER_FACES_UNDER, "Geist-Regular.ttf"))

const KERNED = faceIn(GEIST)

function between(kerning: Kerning, first: string, second: string): number {
  const row = kerning.pairs.get(kerning.firsts.get(first.codePointAt(0) ?? 0) ?? 0)
  return row?.get(kerning.seconds.get(second.codePointAt(0) ?? 0) ?? 0) ?? 0
}

function widthOf(text: string): number {
  const characters = [...text]
  return characters.reduce(
    (all, one, at) =>
      all +
      (KERNED.advances.get(one.codePointAt(0) ?? 0) ?? KERNED.missing) +
      (at === 0 ? 0 : between(KERNED.kerning, characters[at - 1] ?? "", one)),
    0
  )
}

describe("kerningIn", () => {
  test("reads the adjustment a face's positions give each pair, as HarfBuzz applies them", () => {
    const pairs = ["AV", "To", "BE", "[T", "4%", "ok", "Pr", "ro", "oo"].map((pair) =>
      between(KERNED.kerning, pair.slice(0, 1), pair.slice(1))
    )
    expect(pairs).toEqual([-106, -80, -19, 20, -20, -10, -10, -40, -10])
  })

  test("measures a run of text as HarfBuzz shapes it with the face's kerning", () => {
    const widths = ["AVA", "Tok", "Pro", "[T"].map(widthOf)
    expect(widths).toEqual([1791, 1625, 1552, 919])
  })

  test("reads no kerning from a face the game draws unkerned", () => {
    expect(faceIn(GEIST, false).kerning).toEqual(UNKERNED)
  })
})
