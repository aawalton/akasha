import { describe, expect, test } from "bun:test"
import {
  findPopulationSeedFindings,
  type PopulationSeedFinding,
  SCOPE_TERM_REMEDIATION,
} from "./bare-ts-population-seeds.ts"
import type { CheckConfig } from "./check-configs-types.ts"

const EMPTY_ALLOWLIST: ReadonlyMap<string, string> = new Map()

const FILES: readonly string[] = [
  "infra/cluster-checks/src/shared/spawn.ts",
  "infra/cluster-checks/src/lib/population.ts",
  "infra/ci-workflows/src/dsl/types.ts",
  "alanwalton/web/app/root.tsx",
  "temper/watcher-tray/src/tray.rs",
  "temper/watcher-tray/src/main.rs",
  "shared/dotfiles/install.sh",
  "docs/architecture.md",
]

const config = (
  name: string,
  dispatchNodeTypes: CheckConfig["dispatchNodeTypes"]
): CheckConfig => ({
  name,
  dispatchNodeTypes,
  script: `infra/cluster-checks/src/checks/check-${name}.ts`,
})

const rules = (findings: readonly PopulationSeedFinding[]): readonly string[] =>
  findings.map((f) => f.rule)

describe("a scope term that selects the whole population", () => {
  test("is refused, because it dispatches as the bare population while reading as a narrowing", () => {
    const findings = findPopulationSeedFindings(
      [config("generated-suffix", [{ kind: "ts-file", under: "infra" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(rules(findings)).toEqual(["no-op-scope-term"])
    expect(findings[0]?.name).toBe("generated-suffix")
  })

  test("states the count it measured beside the claim it drew from it", () => {
    const findings = findPopulationSeedFindings(
      [config("generated-suffix", [{ kind: "ts-file", under: "infra" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings[0]?.message).toContain("3 of 3")
  })

  test("is refused for any population kind, not only the TS ones", () => {
    const findings = findPopulationSeedFindings(
      [
        config("eso-live-dir-candidate-order", [
          { kind: "rust-file", under: "temper/watcher-tray" },
        ]),
      ],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(rules(findings)).toEqual(["no-op-scope-term"])
    expect(findings[0]?.message).toContain("2 of 2")
  })

  test("is refused even where the prefix names a deep path rather than the tree root", () => {
    const findings = findPopulationSeedFindings(
      [config("systemd-unit-wiring", [{ kind: "sh-file", under: "shared/dotfiles" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(rules(findings)).toEqual(["no-op-scope-term"])
  })
})

describe("a scope term that genuinely narrows", () => {
  test("is accepted", () => {
    const findings = findPopulationSeedFindings(
      [config("git-guard-both-forms", [{ kind: "ts-file", under: "infra/ci-workflows" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings).toEqual([])
  })

  test("is accepted when it narrows by a single member, since the rule is fewer and not few", () => {
    const findings = findPopulationSeedFindings(
      [config("lib-sets-stale-capture", [{ kind: "ts-file", under: "infra/cluster-checks" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings).toEqual([])
  })

  test("is accepted where the prefix selects nothing, because an empty population is not a false claim", () => {
    const findings = findPopulationSeedFindings(
      [config("some-check", [{ kind: "ts-file", under: "media" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings).toEqual([])
  })
})

describe("a population whose membership is not readable from a file list", () => {
  test("yields no scope-term verdict, because nothing here can measure what it selects", () => {
    const findings = findPopulationSeedFindings(
      [config("a-package-scoped-check", [{ kind: "package", under: "temper" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings).toEqual([])
  })
})

describe("a bare population", () => {
  test("is refused for a TS kind with no allowlist entry", () => {
    const findings = findPopulationSeedFindings(
      [config("generated-suffix", ["ts-file"])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(rules(findings)).toEqual(["bare-population"])
  })

  test("is accepted for a TS kind carrying an allowlist entry", () => {
    const findings = findPopulationSeedFindings(
      [config("file-length", ["ts-file", "tsx-file"])],
      FILES,
      new Map([["file-length", "Enforces per-extension line caps on every TS/TSX file."]])
    )

    expect(findings).toEqual([])
  })

  test("is accepted for a non-TS kind, which is the exit a refused non-TS scope term takes", () => {
    const findings = findPopulationSeedFindings(
      [config("eso-live-dir-candidate-order", ["rust-file"])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings).toEqual([])
  })
})

describe("an allowlist entry", () => {
  test("is refused when it names no registered check", () => {
    const findings = findPopulationSeedFindings(
      [config("file-length", ["ts-file"])],
      FILES,
      new Map([
        ["file-length", "still real"],
        ["renamed-away", "names nothing"],
      ])
    )

    expect(rules(findings)).toEqual(["orphan-allowlist-entry"])
    expect(findings[0]?.name).toBe("renamed-away")
  })

  test("is refused when its check no longer declares a bare population", () => {
    const findings = findPopulationSeedFindings(
      [config("file-length", [{ kind: "ts-file", under: "infra/cluster-checks" }])],
      FILES,
      new Map([["file-length", "tightened since this was written"]])
    )

    expect(rules(findings)).toEqual(["orphan-allowlist-entry"])
  })
})

describe("the printed remediation", () => {
  test("names no scope term, so an author who follows it has none to copy", () => {
    expect(SCOPE_TERM_REMEDIATION).not.toContain("under:")
    expect(SCOPE_TERM_REMEDIATION).not.toContain("kind:")
  })

  test("reaches the author of a no-op term, since that is who has to act on it", () => {
    const findings = findPopulationSeedFindings(
      [config("generated-suffix", [{ kind: "ts-file", under: "infra" }])],
      FILES,
      EMPTY_ALLOWLIST
    )

    expect(findings[0]?.message).toContain(SCOPE_TERM_REMEDIATION)
  })
})

describe("an author who follows the printed act", () => {
  const candidatesIn = (message: string): readonly string[] =>
    [...message.matchAll(/"([^"]+)" \(\d+ of \d+\)/g)].flatMap((match) =>
      match[1] === undefined ? [] : [match[1]]
    )

  const refusalFor = (kind: string, under: string): PopulationSeedFinding => {
    const findings = findPopulationSeedFindings(
      [config("generated-suffix", [{ kind, under }])],
      FILES,
      EMPTY_ALLOWLIST
    )
    const finding = findings[0]
    if (finding === undefined) throw new Error(`expected a refusal for "${under}"`)
    return finding
  }

  test("is offered at least one prefix, since advice naming no act is not advice", () => {
    expect(candidatesIn(refusalFor("ts-file", "infra").message).length).toBeGreaterThan(0)
  })

  test("lands on a seed this same rule accepts, whichever of them they take", () => {
    for (const candidate of candidatesIn(refusalFor("ts-file", "infra").message)) {
      const findings = findPopulationSeedFindings(
        [config("generated-suffix", [{ kind: "ts-file", under: candidate }])],
        FILES,
        EMPTY_ALLOWLIST
      )

      expect({ candidate, rules: rules(findings) }).toEqual({ candidate, rules: [] })
    }
  })

  test("is never offered back the term they already wrote", () => {
    const candidates = candidatesIn(refusalFor("ts-file", "infra").message)

    expect(candidates).not.toContain("infra")
    for (const candidate of candidates) expect(candidate.startsWith("infra/")).toBe(true)
  })

  test("is offered no term at all where the population has a single member", () => {
    const finding = refusalFor("tsx-file", "alanwalton")

    expect(candidatesIn(finding.message)).toEqual([])
    expect(finding.message).toContain(SCOPE_TERM_REMEDIATION)
  })
})
