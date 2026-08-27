import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync } from "node:fs"
import { dirname } from "node:path"
import { canonicalize } from "../../repo/path/path"
import { REPOS, resolveRoots, rootEnvName } from "../../repo/roots/roots"

const ROOT_ENV = REPOS.map(rootEnvName)

function withEnv(values: Readonly<Record<string, string | undefined>>, run: () => void): void {
  const saved = new Map<string, string | undefined>()
  for (const [key, next] of Object.entries(values)) {
    saved.set(key, process.env[key])
    if (next === undefined) delete process.env[key]
    else process.env[key] = next
  }
  try {
    run()
  } finally {
    for (const [key, was] of saved) {
      if (was === undefined) delete process.env[key]
      else process.env[key] = was
    }
  }
}

function noOverrides(): Record<string, string | undefined> {
  const cleared: Record<string, string | undefined> = {}
  for (const key of ROOT_ENV) cleared[key] = undefined
  return cleared
}

function namedThrough(prefix: string): { real: string; named: string } {
  const real = realpathSync(mkdtempSync(`/var/tmp/${prefix}-`))
  const named = `${real}-named`
  symlinkSync(real, named)
  return { real, named }
}

function discard(real: string, named: string): void {
  rmSync(named, { force: true })
  rmSync(real, { recursive: true, force: true })
}

describe("resolveRoots holds Real Path", () => {
  test("a root named through a symlink is answered as the directory it reaches", () => {
    const { real, named } = namedThrough("roots-one")
    try {
      withEnv({ ...noOverrides(), MEMORY_ROOT: named }, () => {
        expect(resolveRoots().memory).toBe(real)
      })
    } finally {
      discard(real, named)
    }
  })

  test("a home named through a symlink puts that spelling on none of the roots beside it", () => {
    const { real, named } = namedThrough("roots-home")
    for (const repo of REPOS) mkdirSync(`${real}/${repo}`, { recursive: true })
    try {
      withEnv({ ...noOverrides(), HOME: named }, () => {
        const roots = resolveRoots()
        const beside = REPOS.filter((repo) => repo !== "instructions")
        expect(beside.length).toBeGreaterThan(0)
        for (const repo of beside) {
          expect(roots[repo].startsWith(named)).toBe(false)
          expect(roots[repo]).toBe(canonicalize(`${dirname(roots.instructions)}/${repo}`))
        }
      })
    } finally {
      discard(real, named)
    }
  })

  test("a root that is not there is answered unchanged rather than thrown over", () => {
    const absent = "/var/tmp/no-such-root-for-real-path"
    withEnv({ ...noOverrides(), MEMORY_ROOT: absent }, () => {
      expect(resolveRoots().memory).toBe(absent)
    })
  })
})
