import { describe, expect, test } from "bun:test"

import type { FunctionalType } from "./functional-type.ts"
import {
  evaluateTsconfigConventions,
  type TsconfigDrains,
  type Violation,
} from "../../../infra/cluster-checks/src/lib/tsconfig-conventions.ts"

const EMPTY_DRAINS: TsconfigDrains = {
  nonCanonicalInclude: new Set(),
  allowImportingTsExtensions: new Set(),
}

const CANONICAL_COMPILER_OPTIONS: Record<string, unknown> = {
  composite: true,
  emitDeclarationOnly: true,
}

const CANONICAL_TSCONFIG: Record<string, unknown> = {
  extends: "../../../tsconfig.base.json",
  compilerOptions: CANONICAL_COMPILER_OPTIONS,
  include: ["src/**/*.ts"],
}

interface TsconfigOverrides {
  extends?: string | undefined
  compilerOptions?: Record<string, unknown> | undefined
  include?: readonly string[] | undefined
  exclude?: readonly unknown[] | undefined
  tstl?: Record<string, unknown> | undefined
}

function withTsconfig(overrides: TsconfigOverrides = {}): Record<string, unknown> {
  const compilerOptions: Record<string, unknown> = {
    ...CANONICAL_COMPILER_OPTIONS,
    ...(overrides.compilerOptions ?? {}),
  }
  const result: Record<string, unknown> = {
    extends: "extends" in overrides ? overrides.extends : "../../../tsconfig.base.json",
    compilerOptions,
    include: "include" in overrides ? overrides.include : ["src/**/*.ts"],
  }
  if (overrides.exclude !== undefined) result.exclude = overrides.exclude
  if (overrides.tstl !== undefined) result.tstl = overrides.tstl
  return result
}

function rules(violations: readonly Violation[]): readonly string[] {
  return violations.map((v) => v.rule)
}

const TYPES_FOR_CANONICAL_TEST = [
  "pure",
  "access",
  "next-ui",
  "service",
  "worker",
  "program",
] as const satisfies readonly FunctionalType[]

describe("evaluateTsconfigConventions — canonical input passes for every type", () => {
  for (const t of TYPES_FOR_CANONICAL_TEST) {
    test(`canonical tsconfig produces zero violations for ${t}`, () => {
      const out = evaluateTsconfigConventions({
        workspace: `packages/x/${t}`,
        tsconfig: CANONICAL_TSCONFIG,
        functionalType: t,
        drains: EMPTY_DRAINS,
      })
      expect(out).toEqual([])
    })
  }
})

describe("Rule 1 — extends tsconfig.base.json", () => {
  test("missing extends triggers `extends` for non-addon types", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ extends: undefined }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("extends")
  })

  test("extends some-other-base.json triggers `extends`", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ extends: "../../../tsconfig.weird.json" }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("extends")
  })

  test("addon is exempt from the extends rule even with no extends", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/addon",
      tsconfig: { compilerOptions: { target: "esnext" }, include: ["src/**/*.ts"] },
      functionalType: "addon",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("extends")
  })

  test("path ending in tsconfig.base.json passes regardless of prefix", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ extends: "../addons/tsconfig.base.json" }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("extends")
  })
})

describe("Rule 2 — composite: true", () => {
  test("missing composite triggers `composite` for library types", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ compilerOptions: { composite: undefined } }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("composite")
  })

  test("missing composite triggers `composite` for service / worker / program", () => {
    for (const t of ["service", "worker", "program"] as const) {
      const out = evaluateTsconfigConventions({
        workspace: `packages/x/${t}`,
        tsconfig: withTsconfig({ compilerOptions: { composite: undefined } }),
        functionalType: t,
        drains: EMPTY_DRAINS,
      })
      expect(rules(out)).toContain("composite")
    }
  })

  test("next-app is exempt — missing composite does not trigger", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/next",
      tsconfig: withTsconfig({ compilerOptions: { composite: undefined } }),
      functionalType: "next-app",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("composite")
  })

  test("addon is exempt — missing composite does not trigger", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/addon",
      tsconfig: { compilerOptions: { target: "esnext" }, include: ["src/**/*.ts"] },
      functionalType: "addon",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("composite")
  })
})

describe("Rule 3 — emitDeclarationOnly: true", () => {
  test("missing emitDeclarationOnly triggers `emitDeclarationOnly` for library types", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ compilerOptions: { emitDeclarationOnly: undefined } }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("emitDeclarationOnly")
  })

  test("next-app and addon are exempt", () => {
    const tsconfig = withTsconfig({ compilerOptions: { emitDeclarationOnly: undefined } })
    for (const t of ["next-app", "addon"] as const) {
      const out = evaluateTsconfigConventions({
        workspace: `packages/x/${t}`,
        tsconfig,
        functionalType: t,
        drains: EMPTY_DRAINS,
      })
      expect(rules(out)).not.toContain("emitDeclarationOnly")
    }
  })
})

describe("Rule 4 — no allowImportingTsExtensions", () => {
  test("allowImportingTsExtensions: true triggers the rule", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ compilerOptions: { allowImportingTsExtensions: true } }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("allowImportingTsExtensions")
  })

  test("drain allowlist suppresses the rule", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ compilerOptions: { allowImportingTsExtensions: true } }),
      functionalType: "pure",
      drains: {
        nonCanonicalInclude: new Set(),
        allowImportingTsExtensions: new Set(["packages/x/core"]),
      },
    })
    expect(rules(out)).not.toContain("allowImportingTsExtensions")
  })
})

describe("Rule 8 — no compilerOptions.outDir (library types only)", () => {
  test("outDir on a library type triggers `noOutDir`", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ compilerOptions: { outDir: "dist" } }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("noOutDir")
  })

  test("outDir on a runtime type does NOT trigger (rule is library-scoped)", () => {
    for (const t of ["service", "worker", "program", "next-app", "addon"] as const) {
      const out = evaluateTsconfigConventions({
        workspace: `packages/x/${t}`,
        tsconfig: withTsconfig({ compilerOptions: { outDir: "dist" } }),
        functionalType: t,
        drains: EMPTY_DRAINS,
      })
      expect(rules(out)).not.toContain("noOutDir")
    }
  })

  test("TSTL bundlers (top-level tstl field) are exempt from the underlying validator", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ compilerOptions: { outDir: "dist" }, tstl: {} }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("noOutDir")
  })
})

describe("Rule 9 — canonical include shape (library types only)", () => {
  test("non-canonical include on a library type triggers `sourceLayout`", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ include: ["src", "scripts"] }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("sourceLayout")
  })

  test("canonical .ts-only include passes", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ include: ["src/**/*.ts"] }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("sourceLayout")
  })

  test("canonical .ts+.tsx include passes (next-ui)", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/ui",
      tsconfig: withTsconfig({ include: ["src/**/*.ts", "src/**/*.tsx"] }),
      functionalType: "next-ui",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("sourceLayout")
  })

  test("non-canonical include on a runtime type does NOT trigger (rule is library-scoped)", () => {
    for (const t of ["service", "worker", "program", "next-app", "addon"] as const) {
      const out = evaluateTsconfigConventions({
        workspace: `packages/x/${t}`,
        tsconfig: withTsconfig({ include: ["src", "scripts"] }),
        functionalType: t,
        drains: EMPTY_DRAINS,
      })
      expect(rules(out)).not.toContain("sourceLayout")
    }
  })

  test("drain allowlist suppresses the rule for a library type", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ include: ["weird/**/*.ts"] }),
      functionalType: "pure",
      drains: {
        nonCanonicalInclude: new Set(["packages/x/core"]),
        allowImportingTsExtensions: new Set(),
      },
    })
    expect(rules(out)).not.toContain("sourceLayout")
  })
})

describe("Rule 11 — canonical exclude shape (library types only)", () => {
  test("an exclude naming non-test source triggers `excludeShape` on a library type", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ exclude: ["node_modules", "dist", "src/legacy"] }),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).toContain("excludeShape")
  })

  test("the same exclude on a runtime type does NOT trigger (rule is library-scoped)", () => {
    for (const t of ["service", "worker", "program", "next-app", "addon"] as const) {
      const out = evaluateTsconfigConventions({
        workspace: `packages/x/${t}`,
        tsconfig: withTsconfig({ exclude: ["node_modules", "dist", "src/legacy"] }),
        functionalType: t,
        drains: EMPTY_DRAINS,
      })
      expect(rules(out)).not.toContain("excludeShape")
    }
  })

  test("the canonical prefix passes, with and without a test-pattern tail", () => {
    for (const exclude of [
      ["node_modules", "dist"],
      ["node_modules", "dist", "**/*.test.ts"],
    ]) {
      const out = evaluateTsconfigConventions({
        workspace: "packages/x/core",
        tsconfig: withTsconfig({ exclude }),
        functionalType: "pure",
        drains: EMPTY_DRAINS,
      })
      expect(rules(out)).not.toContain("excludeShape")
    }
  })

  test("an absent exclude passes on a library type — it removes nothing", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig(),
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect(rules(out)).not.toContain("excludeShape")
  })

  test("rule 11 carries no drain allowlist — a drained include does not suppress it", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: withTsconfig({ exclude: ["node_modules", "dist", "src/legacy"] }),
      functionalType: "pure",
      drains: {
        nonCanonicalInclude: new Set(["packages/x/core"]),
        allowImportingTsExtensions: new Set(["packages/x/core"]),
      },
    })
    expect(rules(out)).toContain("excludeShape")
  })
})

describe("multiple rules can fire on a single workspace", () => {
  test("library type with no extends, no composite, outDir, weird include emits all four", () => {
    const out = evaluateTsconfigConventions({
      workspace: "packages/x/core",
      tsconfig: {
        compilerOptions: { outDir: "dist" },
        include: ["weird/**/*.ts"],
      },
      functionalType: "pure",
      drains: EMPTY_DRAINS,
    })
    expect([...rules(out)].sort()).toEqual(
      ["composite", "emitDeclarationOnly", "extends", "noOutDir", "sourceLayout"].sort()
    )
  })
})
