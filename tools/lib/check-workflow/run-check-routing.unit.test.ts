import { describe, expect, test } from "bun:test"
import {
  DECLARED_CHECK_ENTRYPOINTS,
  findCheckInvocations,
  findRoutingViolations,
  findUnjudgedScriptPaths,
  RUN_CHECK_PATH,
  routedCheckCommand,
  unjudgedDeclarations,
} from "./run-check-routing"

const DIR = "infra/cluster-checks/src/checks/"
const ELSEWHERE = "temper/shared-build-deploy-checks/src/"

const cmd = (s: string) => ({
  sourcePath: "infra/x/src/a.workflow.ts",
  workflow: "w",
  step: "s",
  command: s,
})

describe("routedCheckCommand", () => {
  test("is the only spelling of the route, and the scanner recognises what it emits", () => {
    const command = routedCheckCommand({ cwd: "/ws", script: `${DIR}check-bin-mode.ts` })
    expect(command).toBe(`cd /ws && bun $AKASHA_ROOT/${RUN_CHECK_PATH} ${DIR}check-bin-mode.ts`)
    expect(findCheckInvocations(command)).toEqual([
      { script: `${DIR}check-bin-mode.ts`, routed: true },
    ])
  })

  test("appends args after the script, so they reach the check verbatim", () => {
    expect(
      routedCheckCommand({
        cwd: "/ws",
        script: `${DIR}check-repo-paths.ts`,
        args: ["--tree-sha", "abc"],
      })
    ).toBe(`cd /ws && bun $AKASHA_ROOT/${RUN_CHECK_PATH} ${DIR}check-repo-paths.ts --tree-sha abc`)
  })
})

describe("findCheckInvocations", () => {
  test("a direct invocation is unrouted", () => {
    expect(findCheckInvocations(`cd /ws && bun ${DIR}check-build-graph.ts --x y`)).toEqual([
      { script: `${DIR}check-build-graph.ts`, routed: false },
    ])
  })

  test("finds every invocation in a command, not just the first", () => {
    expect(
      findCheckInvocations(`bun ${RUN_CHECK_PATH} ${DIR}check-a.ts && bun ${DIR}check-b.ts`)
    ).toEqual([
      { script: `${DIR}check-a.ts`, routed: true },
      { script: `${DIR}check-b.ts`, routed: false },
    ])
  })

  test("declares no entrypoint outside the check-*.ts naming", () => {
    expect(DECLARED_CHECK_ENTRYPOINTS).toEqual([])
  })

  test("recognises a check outside the checks package, so no directory bounds the scan", () => {
    expect(
      findCheckInvocations(`cd /ws && bun ${ELSEWHERE}check-addon-owned-global-clobber.ts`)
    ).toEqual([{ script: `${ELSEWHERE}check-addon-owned-global-clobber.ts`, routed: false }])
  })

  test("the runner's own path is not read as the check it is running", () => {
    expect(
      findCheckInvocations(`bun ${RUN_CHECK_PATH} ${DIR}check-a.ts`).map((i) => i.script)
    ).toEqual([`${DIR}check-a.ts`])
  })

  test("a .ts script that is not a check is unjudged rather than absent", () => {
    const command =
      "cd /ws && bun infra/ci-workflows/src/lib/write-configs-cache.ts --sha x"
    expect(findCheckInvocations(command)).toEqual([])
    expect(findUnjudgedScriptPaths(command)).toEqual([
      "infra/ci-workflows/src/lib/write-configs-cache.ts",
    ])
  })

  test("naming the directory without naming a script is not an invocation", () => {
    expect(findCheckInvocations(`find ${DIR} -name '*.ts'`)).toEqual([])
  })

  test("a test file whose name starts with check- is not a check invocation", () => {
    expect(findCheckInvocations(`bun test ${DIR}check-phantom-deps.cli.test.ts`)).toEqual([])
  })

  test("a command touching no check script yields nothing", () => {
    expect(findCheckInvocations("cd /ws && bun run typecheck")).toEqual([])
  })
})

describe("findRoutingViolations", () => {
  const clean = {
    commands: [cmd(`bun ${RUN_CHECK_PATH} ${DIR}check-a.ts`)],
    scannedSources: ["infra/x/src/a.workflow.ts"],
    unexaminedSources: [],
    exemptions: [],
    declaredUnexamined: [],
    scriptExists: () => true,
  }

  test("a routed invocation of a script that is not there is a violation", () => {
    expect(
      findRoutingViolations({ ...clean, scriptExists: () => false }).map((v) => v.kind)
    ).toEqual(["missing-script"])
  })

  test("a routed corpus with nothing unexamined is clean", () => {
    expect(findRoutingViolations(clean)).toEqual([])
  })

  test("an unrouted invocation with no exemption is a violation", () => {
    const violations = findRoutingViolations({
      ...clean,
      commands: [...clean.commands, cmd(`bun ${DIR}check-b.ts`)],
    })
    expect(violations.map((v) => v.kind)).toEqual(["unrouted-invocation"])
  })

  test("an exemption carrying a reason clears exactly its own invocation", () => {
    expect(
      findRoutingViolations({
        ...clean,
        commands: [...clean.commands, cmd(`bun ${DIR}check-b.ts`)],
        exemptions: [
          {
            sourcePath: "infra/x/src/a.workflow.ts",
            step: "s",
            script: `${DIR}check-b.ts`,
            reason: "synthetic",
          },
        ],
      })
    ).toEqual([])
  })

  test("a source outside the examined set is a violation unless declared", () => {
    const scanned = {
      ...clean,
      scannedSources: [...clean.scannedSources, "infra/y/src/b.workflow.ts"],
      unexaminedSources: ["infra/y/src/b.workflow.ts"],
    }
    expect(findRoutingViolations(scanned).map((v) => v.kind)).toEqual([
      "undeclared-unexamined-source",
    ])

    expect(
      findRoutingViolations({
        ...scanned,
        declaredUnexamined: [{ sourcePath: "infra/y/src/b.workflow.ts", reason: "synthetic" }],
      })
    ).toEqual([])
  })

  test("a declaration the scan met and found unremarkable is a violation, so neither list can rot", () => {
    expect(
      findRoutingViolations({
        ...clean,
        scannedSources: [...clean.scannedSources, "infra/kept/src/kept.workflow.ts"],
        exemptions: [
          {
            sourcePath: "infra/x/src/a.workflow.ts",
            step: "s",
            script: `${DIR}check-b.ts`,
            reason: "stale",
          },
        ],
        declaredUnexamined: [{ sourcePath: "infra/kept/src/kept.workflow.ts", reason: "stale" }],
      }).map((v) => v.kind)
    ).toEqual(["stale-exemption", "stale-unexamined-declaration"])
  })

  test("a declaration naming a source this scan never met is not reported as stale", () => {
    const exemptions = [
      {
        sourcePath: "infra/gone/src/gone.workflow.ts",
        step: "s",
        script: `${DIR}check-b.ts`,
        reason: "r",
      },
    ]
    const declaredUnexamined = [{ sourcePath: "infra/gone/src/gone.workflow.ts", reason: "r" }]

    expect(findRoutingViolations({ ...clean, exemptions, declaredUnexamined })).toEqual([])
    expect(
      findRoutingViolations({
        ...clean,
        scannedSources: [...clean.scannedSources, "infra/gone/src/gone.workflow.ts"],
        exemptions,
        declaredUnexamined,
      }).map((v) => v.kind)
    ).toEqual(["stale-exemption", "stale-unexamined-declaration"])
  })

  test("what a scan could not judge is counted, so the silence is reported rather than absorbed", () => {
    const lists = {
      exemptions: [
        {
          sourcePath: "infra/gone/src/gone.workflow.ts",
          step: "s",
          script: `${DIR}check-b.ts`,
          reason: "r",
        },
      ],
      declaredUnexamined: [{ sourcePath: "infra/gone/src/gone.workflow.ts", reason: "r" }],
    }
    expect(unjudgedDeclarations({ scannedSources: clean.scannedSources, ...lists })).toEqual({
      exemptions: 1,
      unexamined: 1,
    })
    expect(
      unjudgedDeclarations({ scannedSources: ["infra/gone/src/gone.workflow.ts"], ...lists })
    ).toEqual({ exemptions: 0, unexamined: 0 })
  })
})
