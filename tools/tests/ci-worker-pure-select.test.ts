import { describe, expect, test } from "bun:test"
import { selectPipelineWorkflows } from "../lib/ci-worker-pure/select-workflows.ts"
import type { PipelineConfig } from "../lib/ci-worker-pure/select-workflows-filter.ts"
import { selectWorkflows } from "../lib/ci-worker-pure/select-workflows-filter.ts"
import { codeId, configOf, edgeOf, fileNode, graphOf, packageNode, pipelineOf } from "./ci-worker-pure-arm.ts"

describe("selectWorkflows branch filtering", () => {
  test("returns every workflow when nothing gates them", () => {
    expect(
      selectWorkflows(configOf(), "main")
        .map((w) => w.name)
        .sort()
    ).toEqual(["cleanup", "deploy-api", "lint", "typecheck"])
  })

  test("applies whenBranch on a feature branch", () => {
    const names = selectWorkflows(configOf(), "feat/my-feature").map((w) => w.name)
    expect(names).toContain("typecheck")
    expect(names).toContain("lint")
    expect(names).toContain("cleanup")
    expect(names).not.toContain("deploy-api")
  })

  test("whenBranch '*' matches every branch", () => {
    const config = configOf({
      workflows: [{ name: "anywhere", kind: "checks", whenBranch: "*", config: {} }],
    })
    expect(selectWorkflows(config, "main").map((w) => w.name)).toEqual(["anywhere"])
    expect(selectWorkflows(config, "feat/x").map((w) => w.name)).toEqual(["anywhere"])
  })

  test("whenBranch of a plain name matches exactly that branch", () => {
    const config = configOf({
      workflows: [{ name: "only-main", kind: "checks", whenBranch: "main", config: {} }],
    })
    expect(selectWorkflows(config, "main").map((w) => w.name)).toEqual(["only-main"])
    expect(selectWorkflows(config, "feat/x")).toEqual([])
  })

  test("whenBranch '!main' matches every branch but main", () => {
    const config = configOf({
      workflows: [{ name: "check", kind: "checks", whenBranch: "!main", config: {} }],
    })
    expect(selectWorkflows(config, "main")).toEqual([])
    expect(selectWorkflows(config, "feat/x").map((w) => w.name)).toEqual(["check"])
    expect(selectWorkflows(config, "release").map((w) => w.name)).toEqual(["check"])
  })
})

const fooReachesX = graphOf(
  [packageNode("@foo", "packages/foo"), fileNode("ts-file", "packages/foo/x.ts")],
  [
    edgeOf(
      "workflow-depends-on",
      codeId("package", "@foo"),
      codeId("ts-file", "packages/foo/x.ts")
    ),
  ]
)

describe("selectWorkflows graph-direct gate", () => {
  test("a dispatchNodes seed reaching a changed path selects the workflow", () => {
    const config: PipelineConfig = {
      workflows: [
        {
          name: "foo-checks",
          kind: "checks",
          config: {},
          dispatchNodes: [codeId("package", "@foo")],
        },
      ],
      changedPaths: ["packages/foo/x.ts"],
      graph: fooReachesX,
    }
    expect(selectWorkflows(config, "main").map((w) => w.name)).toEqual(["foo-checks"])
  })

  test("a dispatchNodes seed reaching nothing changed drops the workflow", () => {
    const graph = graphOf(
      [
        packageNode("@foo", "packages/foo"),
        fileNode("ts-file", "packages/foo/x.ts"),
        fileNode("ts-file", "packages/bar/x.ts"),
      ],
      [
        edgeOf(
          "workflow-depends-on",
          codeId("package", "@foo"),
          codeId("ts-file", "packages/foo/x.ts")
        ),
      ]
    )
    const config: PipelineConfig = {
      workflows: [
        {
          name: "foo-checks",
          kind: "checks",
          config: {},
          dispatchNodes: [codeId("package", "@foo")],
        },
      ],
      changedPaths: ["packages/bar/x.ts"],
      graph,
    }
    expect(selectWorkflows(config, "main").map((w) => w.name)).not.toContain("foo-checks")
  })

  test("a nodeTypes population seed selects when a changed path stands in the population", () => {
    const graph = graphOf(
      [fileNode("md-file", "docs/readme.md"), fileNode("md-file", "docs/guide.md")],
      []
    )
    const config: PipelineConfig = {
      workflows: [{ name: "md-population", kind: "checks", config: {}, dispatchNodeTypes: ["md-file"] }],
      changedPaths: ["docs/readme.md"],
      graph,
    }
    expect(selectWorkflows(config, "main").map((w) => w.name)).toEqual(["md-population"])
  })
})

describe("selectWorkflows alwaysRun short-circuit", () => {
  test("alwaysRun keeps a workflow whose closure misses every changed path", () => {
    const config: PipelineConfig = {
      workflows: [
        {
          name: "check",
          kind: "checks",
          config: {},
          dispatchNodeTypes: ["package"],
          alwaysRun: true,
        },
      ],
      changedPaths: [".claude/skills/p/SKILL.md"],
      graph: fooReachesX,
    }
    expect(selectWorkflows(config, "feat/x").map((w) => w.name)).toEqual(["check"])
  })

  test("without alwaysRun the same workflow is dropped", () => {
    const config: PipelineConfig = {
      workflows: [
        { name: "check", kind: "checks", config: {}, dispatchNodeTypes: ["package"] },
      ],
      changedPaths: [".claude/skills/p/SKILL.md"],
      graph: fooReachesX,
    }
    expect(selectWorkflows(config, "feat/x").map((w) => w.name)).not.toContain("check")
  })

  test("alwaysRun does not bypass the branch filter", () => {
    const config: PipelineConfig = {
      workflows: [
        {
          name: "check",
          kind: "checks",
          config: {},
          dispatchNodeTypes: ["package"],
          alwaysRun: true,
          whenBranch: "!main",
        },
      ],
      changedPaths: [".claude/skills/p/SKILL.md"],
      graph: graphOf([packageNode("@foo", "packages/foo")], []),
    }
    expect(selectWorkflows(config, "main")).toEqual([])
    expect(selectWorkflows(config, "feat/x").map((w) => w.name)).toEqual(["check"])
  })
})

describe("selectPipelineWorkflows absorption", () => {
  test("a stateful carry-forward drops dependsOn targets nothing carries", () => {
    const result = selectPipelineWorkflows({
      pipeline: pipelineOf({ branch: "feature-x" }),
      config: configOf({
        workflows: [{ name: "typecheck", kind: "checks", config: {} }],
        changedPaths: [],
      }),
      sameBranchPipelines: [
        pipelineOf({ id: "older", seq: 99, status: "running", branch: "feature-x" }),
      ],
      sameBranchWorkflows: {
        older: [
          {
            id: "wf-state",
            pipelineId: "older",
            pipelineSeq: 99,
            status: "pending",
            name: "state-machine",
            kind: "stateful",
            dependsOn: ["bootstrap-foo", "state-machine-helper", "typecheck"],
          },
          {
            id: "wf-helper",
            pipelineId: "older",
            pipelineSeq: 99,
            status: "pending",
            name: "state-machine-helper",
            kind: "stateful",
          },
        ],
      },
    })

    const stateMachine = result.absorbedFromPriorPipelines.find(
      (a) => a.workflow.name === "state-machine"
    )
    expect(stateMachine).toBeDefined()
    expect(stateMachine?.config.dependsOn).toEqual(["state-machine-helper", "typecheck"])
  })

  test("the absorbed set is dropped whole when merging it would close a cycle", () => {
    const result = selectPipelineWorkflows({
      pipeline: pipelineOf({ branch: "feature-x" }),
      config: configOf({
        workflows: [
          { name: "cleanup", kind: "cleanup", dependsOn: ["older-aggregator"], config: {} },
        ],
        changedPaths: ["packages/api/src/index.ts"],
      }),
      sameBranchPipelines: [
        pipelineOf({ id: "older", seq: 99, status: "running", branch: "feature-x" }),
      ],
      sameBranchWorkflows: {
        older: [
          {
            id: "wf-older-aggregator",
            pipelineId: "older",
            pipelineSeq: 99,
            status: "pending",
            name: "older-aggregator",
            kind: "stateful",
            dependsOn: ["cleanup"],
          },
        ],
      },
    })

    expect(result.absorbedFromPriorPipelines).toEqual([])
    expect(result.absorptionDropped).toEqual({ reason: "cycle", droppedNames: ["older-aggregator"] })
    expect(result.selected.map((s) => s.workflow.name)).toEqual(["cleanup"])
  })
})
