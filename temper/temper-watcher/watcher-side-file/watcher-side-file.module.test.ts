import { expect, test } from "bun:test"
import { hashContent } from "../watcher-self-write-guard/watcher-self-write-guard.module.code.ts"
import type { SideFileDisk, SideFileValues } from "./watcher-side-file.module.code.ts"
import {
  absentSideFileValues,
  buildSideFileContent,
  REQUIRED_SIDE_FILE_VALUES,
  writeSideFileIfChanged,
} from "./watcher-side-file.module.code.ts"

const WHOLE: SideFileValues = {
  logging: { level: "info" },
  safety: { destructive: false },
  backpack: { reserved: 10 },
  currencyRates: {},
  crownReplacementCosts: {},
}

function recording(current: string | null): { disk: SideFileDisk; written: string[] } {
  const written: string[] = []
  const disk: SideFileDisk = {
    read: () => {
      if (current === null) throw new Error("no such file")
      return current
    },
    write: (_path, content) => {
      written.push(content)
      return undefined
    },
  }
  return { disk, written }
}

test("a build told nothing for a needed value is refused, naming every one", () => {
  expect(() => buildSideFileContent({ logging: {} })).toThrow(
    "the inventory side file was told nothing for safety, backpack, currencyRates, crownReplacementCosts"
  )
})

test("nothing is absent from a whole set of values", () => {
  expect(absentSideFileValues(WHOLE)).toEqual([])
  expect(REQUIRED_SIDE_FILE_VALUES.length).toBe(5)
})

test("a whole set of values builds the inventory config file", () => {
  expect(buildSideFileContent(WHOLE)).toContain('["version"] = 1,')
})

test("a file already holding what is wanted is left alone", () => {
  const desired = buildSideFileContent(WHOLE)
  const { disk, written } = recording(desired)
  expect(writeSideFileIfChanged("/nowhere/config.lua", desired, disk)).toBe(hashContent(desired))
  expect(written).toEqual([])
})

test("a file holding something else is written", () => {
  const desired = buildSideFileContent(WHOLE)
  const { disk, written } = recording("something else")
  writeSideFileIfChanged("/nowhere/config.lua", desired, disk)
  expect(written).toEqual([desired])
})

test("a file that will not open counts as holding something else", () => {
  const desired = buildSideFileContent(WHOLE)
  const { disk, written } = recording(null)
  writeSideFileIfChanged("/nowhere/config.lua", desired, disk)
  expect(written).toEqual([desired])
})
