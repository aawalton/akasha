import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync } from "node:fs"
import { REPOS, resolveRoots, rootEnvName } from "../../repo/roots/roots.ts"

const CLONED = "code-editor"

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
    mkdirSync(`${real}/.git`, { recursive: true })
    try {
      withEnv({ ...noOverrides(), CODE_EDITOR_ROOT: named }, () => {
        expect(resolveRoots()[CLONED]).toBe(real)
      })
    } finally {
      discard(real, named)
    }
  })
})

describe("resolveRoots names a repository only where it is cloned", () => {
  test("a directory holding no `.git` is not named, though it is there and named through", () => {
    const { real, named } = namedThrough("roots-bare")
    try {
      withEnv({ ...noOverrides(), CODE_EDITOR_ROOT: named }, () => {
        expect(resolveRoots()[CLONED]).toBeUndefined()
      })
    } finally {
      discard(real, named)
    }
  })

  test("a root pointing at nothing on disk is not named either", () => {
    withEnv({ ...noOverrides(), CODE_EDITOR_ROOT: "/var/tmp/no-such-root-for-real-path" }, () => {
      expect(resolveRoots()[CLONED]).toBeUndefined()
    })
  })
})
