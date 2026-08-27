import { describe, expect, test } from "bun:test"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { resolveRoots } from "../../repo/roots/roots"
import {
  DEPENDENCIES_PROBE,
  instructionsTreeStep,
} from "../lib/main-pipeline-creator/instructions-tree-step.ts"
import { faultsOf } from "../lib/instructions-tree/dependencies.ts"
import { IMAGE_TOOLS, IMAGES } from "../lib/workflow-dsl/images.ts"

const A_COMMIT = "0123456789abcdef0123456789abcdef01234567"

function commandsOf(): readonly string[] {
  const commands = instructionsTreeStep(A_COMMIT).definition.commands
  expect(Array.isArray(commands)).toBe(true)
  return commands as readonly string[]
}

function firstAt(commands: readonly string[], said: string): number {
  const at = commands.findIndex((one) => one.includes(said))
  expect(at).toBeGreaterThanOrEqual(0)
  return at
}

describe("the instructions tree step stands up a tree that runs", () => {
  test("nothing publishes the tree until the install and the probe have both passed", () => {
    const commands = commandsOf()
    const extracted = firstAt(commands, "tar -x -f")
    const installed = firstAt(commands, "bun install --frozen-lockfile")
    const proved = firstAt(commands, `"$INCOMING/$PROBE"`)
    const published = firstAt(commands, 'mv "$INCOMING" "$TREE"')
    expect(extracted).toBeLessThan(installed)
    expect(installed).toBeLessThan(proved)
    expect(proved).toBeLessThan(published)
  })

  test("a tree already standing is taken on the probe rather than on the marker alone", () => {
    const commands = commandsOf()
    const asked = firstAt(commands, `bun "$TREE/$PROBE"`)
    const skipped = firstAt(commands, "already stands at")
    expect(asked).toBeLessThan(skipped)
  })

  test("the install is held to the lockfile this commit carries", () => {
    expect(commandsOf().some((one) => one.includes("bun install --frozen-lockfile"))).toBe(true)
    expect(commandsOf().some((one) => /bun install(?! --frozen-lockfile)/.test(one))).toBe(false)
  })

  test("the image the step names carries both bun and git", () => {
    const image = instructionsTreeStep(A_COMMIT).definition.image
    const keys = Object.keys(IMAGES).filter(
      (key) => IMAGES[key as keyof typeof IMAGES] === image
    ) as (keyof typeof IMAGES)[]
    expect(keys.length).toBeGreaterThan(0)
    for (const key of keys) {
      expect(IMAGE_TOOLS[key]).toContain("bun")
      expect(IMAGE_TOOLS[key]).toContain("git")
    }
  })

  test("the probe the step runs from the tree is a file the tree carries", () => {
    expect(existsSync(`${resolveRoots().akasha}/${DEPENDENCIES_PROBE}`)).toBe(true)
  })

  test("the step asks bun for the cache the node keeps rather than the pod's own", () => {
    const environment = instructionsTreeStep(A_COMMIT).definition.environment
    expect(environment).toMatchObject({ BUN_INSTALL_CACHE_DIR: "/ci-storage/bun-cache" })
  })
})

describe("the probe rules on a tree by what stands in it", () => {
  test("a tree with nothing installed is refused, naming every package it declares", () => {
    const root = realpathSync(mkdtempSync("/var/tmp/instructions-tree-empty-"))
    try {
      expect(faultsOf(root, ["zod", "yaml"])).toEqual([
        `zod has nothing at ${root}/node_modules/zod/package.json`,
        `yaml has nothing at ${root}/node_modules/yaml/package.json`,
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a package reached from the tree but standing outside it is refused", () => {
    const root = realpathSync(mkdtempSync("/var/tmp/instructions-tree-outside-"))
    const elsewhere = realpathSync(mkdtempSync("/var/tmp/instructions-tree-elsewhere-"))
    try {
      mkdirSync(`${elsewhere}/zod`, { recursive: true })
      writeFileSync(`${elsewhere}/zod/package.json`, "{}")
      mkdirSync(`${root}/node_modules`, { recursive: true })
      symlinkSync(`${elsewhere}/zod`, `${root}/node_modules/zod`)
      expect(faultsOf(root, ["zod"])).toEqual([
        `zod stands at ${elsewhere}/zod/package.json, outside the tree`,
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
      rmSync(elsewhere, { recursive: true, force: true })
    }
  })

  test("a package standing in the tree is passed", () => {
    const root = realpathSync(mkdtempSync("/var/tmp/instructions-tree-whole-"))
    try {
      mkdirSync(`${root}/node_modules/zod`, { recursive: true })
      writeFileSync(`${root}/node_modules/zod/package.json`, "{}")
      expect(faultsOf(root, ["zod"])).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
