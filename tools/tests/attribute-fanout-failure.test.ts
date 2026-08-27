import { describe, expect, test } from "bun:test"
import { AT } from "./triage-fanout-test-support.ts"
import { renderFailureHeadline } from "../lib/ci-test-fanout/attribute-fanout-failure.ts"
import { analyzeFanoutLog } from "../lib/triage-fanout-log.ts"

function taggedBlock(pkgRoot: string, failing: boolean): readonly string[] {
  const tag = (line: string): string => `[fanout-ws:${pkgRoot}] ${line}`
  return [
    `[run-workspace-tests] ${pkgRoot}: running 2 selected test file(s)`,
    tag("src/thing.unit.test.ts:"),
    tag(failing ? "(fail) thing > holds [0.50ms]" : "(pass) thing > holds [0.50ms]"),
    tag(""),
    tag(failing ? " 1 fail" : " 0 fail"),
    tag("Ran 2 tests across 1 file. [1.00s]"),
  ]
}

const announce = (n: number): string =>
  `[run-typed-tests] unit: ${n} test-bearing workspace(s), fan-out -P 12`

const headlineOver = (lines: readonly string[]): string =>
  renderFailureHeadline(analyzeFanoutLog(lines, AT), "unit")

describe("renderFailureHeadline — the last line a red step prints", () => {
  test("names the workspace, the file and the failing test", () => {
    const out = headlineOver([announce(2), ...taggedBlock("packages/foo", true)])
    expect(out).toContain("packages/foo")
    expect(out).toContain("src/thing.unit.test.ts")
    expect(out).toContain("thing > holds")
  })

  test("claims no location where attribution was declined, and hands over the test name", () => {
    const out = headlineOver([
      announce(2),
      "[run-workspace-tests] packages/foo: running 2 selected test file(s)",
      "(fail) untagged suite > breaks [0.50ms]",
      " 1 fail",
    ])
    expect(out).not.toContain("packages/foo")
    expect(out).toContain("untagged suite > breaks")
  })

  test("a refusal leads, even beside a genuine test failure", () => {
    const out = headlineOver([
      announce(2),
      "[run-workspace-tests] packages/bar: NO eligible test files, though declared test-bearing — refusing",
      ...taggedBlock("packages/foo", true),
    ])
    expect(out).toContain("executed no test")
    expect(out).toContain("packages/bar")
  })

  test("names no location where the log holds no failure at all", () => {
    const out = headlineOver([announce(1), ...taggedBlock("packages/foo", false)])
    expect(out).toContain("FAILED")
    expect(out).not.toContain("src/thing.unit.test.ts")
  })
})
