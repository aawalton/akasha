import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  crateCopiesIn,
  recipeIn,
} from "akasha/temper/watcher/image/temper-watcher-image.container-recipe.composing.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const RECIPE = "Containerfile"

const OWN = "temper-watcher-image.container-recipe.composing.code.ts"

const MOVED = "code-system"

const COPY = "COPY "

const OUTSIDE = "--"

const SELF = "."

function committed(): string {
  return readFileSync(join(HERE, RECIPE), "utf8")
}

function copiedFrom(recipe: string): readonly string[] {
  const found: string[] = []
  for (const line of recipe.split("\n")) {
    if (!line.startsWith(COPY)) continue
    const from = line.slice(COPY.length).split(" ")[0]
    if (from === undefined || from.startsWith(OUTSIDE) || from === SELF) continue
    found.push(from)
  }
  return found
}

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(recipeIn(ROOT)).toBe(committed())
})

test("the code composing the recipe spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every path the recipe copies out of this repository is a file that is there", () => {
  const gone = copiedFrom(recipeIn(ROOT)).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the recipe copies ten paths out of this repository", () => {
  expect(copiedFrom(recipeIn(ROOT))).toHaveLength(10)
})

test("the crate's manifest and build script are copied before any module of that crate", () => {
  const said = crateCopiesIn(ROOT).map((one) => one.to)
  expect(said.slice(0, 3)).toEqual(["./Cargo.toml", "./build.rs", "./src/main.rs"])
})

test("every module the crate names is copied to the name that module states for Cargo", () => {
  const said = crateCopiesIn(ROOT).map((one) => one.to)
  expect(said.slice(3)).toEqual([
    "./src/installer.rs",
    "./src/logger.rs",
    "./src/supervisor.rs",
    "./src/tray.rs",
    "./src/updater.rs",
  ])
})
