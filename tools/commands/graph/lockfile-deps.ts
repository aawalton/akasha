
export const summary = "List every resolution of an npm package name in `bun.lock` — versions, integrity hashes, and the workspaces / parent packages that pull each"

import type { CommandHelp } from "../../ops/surface.ts"
import { changeBranchWorktree } from "../../lib/branch-worktree.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { git } from "../../../repo/git/git.ts"
import { createEngine } from "../../lib/graph/engine.ts"
import lockfilePackageEdgeProducer from "../../lib/graph/producers/lockfile-package/lockfile-package.edge.producer.ts"
import lockfilePackageNodeProducer from "../../lib/graph/producers/lockfile-package/lockfile-package.node.producer.ts"
import { registerLockfilePackageTypes } from "../../lib/graph/producers/lockfile-package/register.ts"
import {
  LOCKFILE_DEPENDS_EDGE_TYPE,
  LOCKFILE_PACKAGE_NODE_TYPE,
  LOCKFILE_RESOLVES_EDGE_TYPE,
  LockfileDependsAttrsSchema,
  LockfilePackageAttrsSchema,
  LockfileResolvesAttrsSchema,
} from "../../lib/graph/producers/lockfile-package/types.ts"
import { registerPackageTypes } from "../../lib/graph/producers/package/register.ts"
import { PACKAGE_NODE_TYPE } from "../../lib/graph/producers/package/types.ts"
import { readRepos } from "../../lib/graph/repos.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description:
        "Branch sequence number. A worktree belongs to one branch, so this names the worktree outright. The lockfile is read from the code repository as it stands at that worktree's HEAD commit.",
    },
    {
      name: "--name",
      argLabel: "<pkg>",
      valueShape: "token",
      required: true,
      description:
        "npm package name. May include an exact `@<version>` suffix to filter to a single resolution (e.g., `react@19.2.0`). Scoped names supported — the version delimiter is the *last* `@`.",
    },
    { name: "--json", description: "Emit JSON result instead of human text" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description:
        "Branch sequence number. A worktree belongs to one branch, so this names the worktree outright. The lockfile is read from the code repository as it stands at that worktree's HEAD commit.",
    },
  ],
  exits: [
    { code: 0, meaning: "one or more matching resolutions printed" },
    { code: 1, meaning: "input error: bad args" },
    { code: 2, meaning: "no matching resolution found in the lockfile" },
    { code: 3, meaning: "operational error: the worktree's HEAD commit could not be read" },
  ],
  examples: [
    "ops graph lockfile-deps 10068 --name react",
    "ops graph lockfile-deps --seq 10068 --name react",
    "ops graph lockfile-deps --seq 10068 --name react@19.2.0",
    "ops graph lockfile-deps --seq 10068 --name @tanstack/react-virtual --json",
  ],
}

const keyOf = (id: string, type: string): string => {
  const prefix = `${type}:`
  if (!id.startsWith(prefix)) return id
  const rest = id.slice(prefix.length)
  const mark = rest.indexOf(":")
  return mark < 0 ? rest : rest.slice(mark + 1)
}

const parseNameArg = (raw: string): { name: string; version: string | undefined } => {
  const lastAt = raw.lastIndexOf("@")
  if (lastAt <= 0) return { name: raw, version: undefined }
  const version = raw.slice(lastAt + 1)
  const name = raw.slice(0, lastAt)
  return { name, version }
}

type Resolution = {
  readonly name: string
  readonly version: string
  readonly integrity: string
  readonly directConsumers: readonly { workspace: string; kind: string; range: string }[]
  readonly parentPackages: readonly {
    parent: string
    kind: string
    range: string | null
  }[]
}

export default async function graphLockfileDeps(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const nameArg = parsed.requireString("--name")
  const json = parsed.boolean("--json")
  const { name, version: filterVersion } = parseNameArg(nameArg)

  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw inputError(worktree.why)
  const head = git(worktree.path, ["rev-parse", "HEAD"])
  if (head.code !== 0) {
    throw operationalError(
      `${worktree.name} has its worktree at ${worktree.path}, whose HEAD commit could not be ` +
        `read, so there is no state to read a lockfile from: ${head.stderr}`
    )
  }

  const engine = createEngine()
  registerPackageTypes(engine)
  registerLockfilePackageTypes(engine)
  engine.registerProducer(lockfilePackageNodeProducer)
  engine.registerProducer(lockfilePackageEdgeProducer)
  const graph = await engine.build(readRepos(head.stdout))

  const candidates = graph.nodes(LOCKFILE_PACKAGE_NODE_TYPE).filter((n) => {
    const a = LockfilePackageAttrsSchema.parse(n.attrs)
    if (a.name !== name) return false
    if (filterVersion !== undefined && a.version !== filterVersion) return false
    return true
  })

  if (candidates.length === 0) {
    process.stderr.write(
      `no matching resolution: ${name}${filterVersion === undefined ? "" : `@${filterVersion}`}\n`
    )
    process.exit(2)
  }

  const resolutions: Resolution[] = candidates.map((node) => {
    const attrs = LockfilePackageAttrsSchema.parse(node.attrs)
    const resolves = graph.inEdges(node.id, [LOCKFILE_RESOLVES_EDGE_TYPE])
    const depends = graph.inEdges(node.id, [LOCKFILE_DEPENDS_EDGE_TYPE])
    const directConsumers = resolves
      .map((e) => {
        const edgeAttrs = LockfileResolvesAttrsSchema.parse(e.attrs)
        return {
          workspace: keyOf(e.from, PACKAGE_NODE_TYPE),
          kind: edgeAttrs.kind,
          range: edgeAttrs.range,
        }
      })
      .sort((a, b) => a.workspace.localeCompare(b.workspace))
    const parentPackages = depends
      .map((e) => {
        const edgeAttrs = LockfileDependsAttrsSchema.parse(e.attrs)
        return {
          parent: keyOf(e.from, LOCKFILE_PACKAGE_NODE_TYPE),
          kind: edgeAttrs.kind,
          range: edgeAttrs.range,
        }
      })
      .sort((a, b) => a.parent.localeCompare(b.parent))
    return {
      name: attrs.name,
      version: attrs.version,
      integrity: attrs.integrity,
      directConsumers,
      parentPackages,
    }
  })

  if (json) {
    process.stdout.write(`${JSON.stringify({ name, resolutions }, null, 2)}\n`)
    return
  }

  const lines: string[] = []
  lines.push(`${name} — ${resolutions.length} resolution${resolutions.length === 1 ? "" : "s"}`)
  for (const r of resolutions) {
    lines.push("")
    lines.push(`${r.name}@${r.version}`)
    lines.push(`  integrity: ${r.integrity}`)
    if (r.directConsumers.length > 0) {
      lines.push(`  direct consumers (${r.directConsumers.length}):`)
      for (const c of r.directConsumers) {
        lines.push(`    ${c.workspace}  [${c.kind}]  ${c.range}`)
      }
    }
    if (r.parentPackages.length > 0) {
      lines.push(`  parent packages (${r.parentPackages.length}):`)
      for (const p of r.parentPackages) {
        const range = p.range === null ? "(no range)" : p.range
        lines.push(`    ${p.parent}  [${p.kind}]  ${range}`)
      }
    }
    if (r.directConsumers.length === 0 && r.parentPackages.length === 0) {
      lines.push(`  (no incoming edges — orphan resolution)`)
    }
  }
  process.stdout.write(`${lines.join("\n")}\n`)
}
