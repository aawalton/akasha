import { describe, expect, test } from "bun:test"
import { entriesCommandsStart } from "./synth-runs-entry.edge.producer.ts"

const SOURCE_PATH = "packages/infra/example/k8s/synth-deployment.ts"

const ENTRY = "packages/infra/example/src/server.ts"

const standingWith = (...paths: readonly string[]): ReadonlySet<string> => new Set(paths)

describe("which file a synth module's container command starts", () => {
  test("a command array naming a tracked TypeScript path answers with it", () => {
    const text = `export const one = { command: ["bun", "--watch", "${ENTRY}"] }`
    expect(entriesCommandsStart(SOURCE_PATH, text, standingWith(ENTRY))).toEqual([ENTRY])
  })

  test("an args array is read the same way a command array is", () => {
    const text = `export const one = { args: ["run", "${ENTRY}"] }`
    expect(entriesCommandsStart(SOURCE_PATH, text, standingWith(ENTRY))).toEqual([ENTRY])
  })

  test("a path the repository does not track is left alone", () => {
    const text = `export const one = { command: ["bun", "${ENTRY}"] }`
    expect(entriesCommandsStart(SOURCE_PATH, text, standingWith())).toEqual([])
  })

  test("a command naming no TypeScript answers with none", () => {
    const text = `export const one = { command: ["/usr/local/bin/annual-dump.sh"] }`
    expect(entriesCommandsStart(SOURCE_PATH, text, standingWith(ENTRY))).toEqual([])
  })

  test("a TypeScript path standing outside a command or args array is left alone", () => {
    const text = `export const one = { workingDir: "${ENTRY}", env: ["${ENTRY}"] }`
    expect(entriesCommandsStart(SOURCE_PATH, text, standingWith(ENTRY))).toEqual([])
  })

  test("one path named by two containers answers once", () => {
    const text = `export const one = [{ command: ["bun", "${ENTRY}"] }, { args: ["${ENTRY}"] }]`
    expect(entriesCommandsStart(SOURCE_PATH, text, standingWith(ENTRY))).toEqual([ENTRY])
  })
})
