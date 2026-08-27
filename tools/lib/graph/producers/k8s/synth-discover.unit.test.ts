import { execFileSync } from "node:child_process"
import { posix } from "node:path"
import { describe, expect, test } from "bun:test"
import { resolveRoots } from "../../../../../repo/roots/roots"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { serviceRootOf } from "./synth-discover.ts"

const GIT_OUTPUT_CEILING = 64 * 1024 * 1024

const tracked = (root: string): readonly string[] =>
  execFileSync("git", ["-C", root, "ls-files", "-z"], {
    encoding: "utf-8",
    maxBuffer: GIT_OUTPUT_CEILING,
  })
    .split("\0")
    .filter((one) => one !== "")

const paths = tracked(resolveRoots()[CODE_REPO] as string)

const serviceDirs = paths
  .filter((one) => posix.basename(one) === "synth.ts")
  .map((one) => posix.dirname(one))

const sopsPaths = paths.filter((one) => {
  const name = posix.basename(one)
  return name.endsWith(".sops.yaml") || name.endsWith(".sops.yml")
})

const takenBy = (serviceDir: string): readonly string[] =>
  sopsPaths.filter((one) => one.startsWith(`${serviceRootOf(serviceDir)}/`))

describe("the directory a synth service's encrypted secrets stand in", () => {
  test("a synth entry inside a `k8s` directory deploys from the directory holding it", () => {
    expect(serviceRootOf("packages/alanwalton/web/deploy/k8s")).toBe(
      "packages/alanwalton/web/deploy"
    )
  })

  test("a synth entry that is not inside a `k8s` directory stands as its own service root", () => {
    expect(serviceRootOf("packages/infra/k8s/src/grafana")).toBe("packages/infra/k8s/src/grafana")
  })

  test("the repository holds a synth service of each shape, so neither case here is invented", () => {
    const named = serviceDirs.filter((one) => posix.basename(one) === "k8s")
    const own = serviceDirs.filter((one) => posix.basename(one) !== "k8s")
    expect(named.length).toBeGreaterThan(0)
    expect(own.length).toBeGreaterThan(0)
  })

  test("no encrypted secret is claimed by two services", () => {
    const claims = new Map<string, string[]>()
    for (const serviceDir of serviceDirs) {
      for (const one of takenBy(serviceDir)) {
        claims.set(one, [...(claims.get(one) ?? []), serviceDir])
      }
    }
    const shared = [...claims].filter(([, dirs]) => dirs.length > 1)
    expect(shared).toEqual([])
  })
})
