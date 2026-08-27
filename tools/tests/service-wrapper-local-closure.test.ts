import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import {
  localClosure,
  REACHED_CEILING,
  standsIn,
  withoutShebang,
} from "../lib/service-wrapper/local-closure.ts"

const SCRATCH = "/var/tmp"

function fixture(): {
  root: string
  put: (rel: string, body: string) => string
  link: (rel: string, to: string) => void
  drop: () => void
} {
  const root = realpathSync(mkdtempSync(`${SCRATCH}/closure-`))
  return {
    root,
    put: (rel, body) => {
      const at = `${root}/${rel}`
      mkdirSync(dirOf(at), { recursive: true })
      writeFileSync(at, body, "utf8")
      return at
    },
    link: (rel, to) => {
      const at = `${root}/${rel}`
      mkdirSync(dirOf(at), { recursive: true })
      symlinkSync(`${root}/${to}`, at)
    },
    drop: () => rmSync(root, { recursive: true, force: true }),
  }
}

function dirOf(at: string): string {
  return at.slice(0, at.lastIndexOf("/"))
}

function relatives(root: string, files: Iterable<string>): readonly string[] {
  return [...files].map((at) => at.replace(`${root}/`, "")).sort()
}

describe("what a service's local import closure reaches", () => {
  test("an entry carrying a shebang still yields its imports", () => {
    const at = fixture()
    try {
      at.put("lib/a.ts", "export const a = 1\n")
      const entry = at.put(
        "entry.ts",
        '#!/usr/bin/env bun\nimport { a } from "./lib/a.ts"\nexport { a }\n'
      )
      const closure = localClosure(entry, at.root)
      expect(closure.unscanned).toEqual([])
      expect(relatives(at.root, closure.files)).toEqual(["entry.ts", "lib/a.ts"])
    } finally {
      at.drop()
    }
  })

  test("the closure follows imports past the first file", () => {
    const at = fixture()
    try {
      at.put("lib/deep.ts", "export const deep = 3\n")
      at.put("lib/mid.ts", 'import { deep } from "./deep.ts"\nexport { deep }\n')
      const entry = at.put("entry.ts", 'import { deep } from "./lib/mid.ts"\nexport { deep }\n')
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual([
        "entry.ts",
        "lib/deep.ts",
        "lib/mid.ts",
      ])
    } finally {
      at.drop()
    }
  })

  test("an import spelled without its extension reaches the file the runtime loads", () => {
    const at = fixture()
    try {
      at.put("lib/deep.ts", "export const deep = 3\n")
      at.put("lib/mid.ts", 'import { deep } from "./deep"\nexport { deep }\n')
      const entry = at.put("entry.ts", 'import { deep } from "./lib/mid"\nexport { deep }\n')
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual([
        "entry.ts",
        "lib/deep.ts",
        "lib/mid.ts",
      ])
    } finally {
      at.drop()
    }
  })

  test("an import naming a directory reaches the index the runtime loads", () => {
    const at = fixture()
    try {
      at.put("lib/inner/index.ts", "export const inner = 4\n")
      const entry = at.put("entry.ts", 'import { inner } from "./lib/inner"\nexport { inner }\n')
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual([
        "entry.ts",
        "lib/inner/index.ts",
      ])
    } finally {
      at.drop()
    }
  })

  test("a specifier naming a package of ours reaches the files behind it", () => {
    const at = fixture()
    try {
      at.put("packages/held/package.json", '{ "name": "@ours/held", "main": "src/index.ts" }\n')
      at.put("packages/held/src/deep.ts", "export const deep = 5\n")
      at.put("packages/held/src/index.ts", 'export { deep } from "./deep"\n')
      at.link("node_modules/@ours/held", "packages/held")
      const entry = at.put("entry.ts", 'import { deep } from "@ours/held"\nexport { deep }\n')
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual([
        "entry.ts",
        "packages/held/src/deep.ts",
        "packages/held/src/index.ts",
      ])
    } finally {
      at.drop()
    }
  })

  test("a specifier naming a third-party package reaches nothing, because it stands in node_modules", () => {
    const at = fixture()
    try {
      at.put("node_modules/outside/package.json", '{ "name": "outside", "main": "index.js" }\n')
      at.put("node_modules/outside/index.js", "export const out = 6\n")
      const entry = at.put("entry.ts", 'import { out } from "outside"\nexport { out }\n')
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual(["entry.ts"])
    } finally {
      at.drop()
    }
  })

  test("a file standing outside the repository is not followed", () => {
    const at = fixture()
    const away = fixture()
    try {
      away.put("far.ts", "export const far = 7\n")
      const entry = at.put("entry.ts", `import { far } from "${away.root}/far.ts"\nexport { far }\n`)
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual(["entry.ts"])
    } finally {
      at.drop()
      away.drop()
    }
  })

  test("a cycle between two files settles rather than running on", () => {
    const at = fixture()
    try {
      at.put("lib/one.ts", 'import { two } from "./two.ts"\nexport const one = two\n')
      at.put("lib/two.ts", 'import { one } from "./one.ts"\nexport const two = one\n')
      const entry = at.put("entry.ts", 'import { one } from "./lib/one.ts"\nexport { one }\n')
      expect(relatives(at.root, localClosure(entry, at.root).files)).toEqual([
        "entry.ts",
        "lib/one.ts",
        "lib/two.ts",
      ])
    } finally {
      at.drop()
    }
  })

  test("an import resolving to nothing is named rather than passed over in silence", () => {
    const at = fixture()
    try {
      const entry = at.put("entry.ts", 'import { gone } from "./lib/gone.ts"\nexport { gone }\n')
      const closure = localClosure(entry, at.root)
      expect(closure.unresolved).toEqual([{ file: entry, path: "./lib/gone.ts" }])
      expect(relatives(at.root, closure.files)).toEqual(["entry.ts"])
    } finally {
      at.drop()
    }
  })

  test("a builtin is neither followed nor reported as unresolved", () => {
    const at = fixture()
    try {
      const entry = at.put("entry.ts", 'import { readFileSync } from "node:fs"\nexport { readFileSync }\n')
      const closure = localClosure(entry, at.root)
      expect(closure.unresolved).toEqual([])
      expect(relatives(at.root, closure.files)).toEqual(["entry.ts"])
    } finally {
      at.drop()
    }
  })

  test("a file that cannot be scanned is named rather than passed over in silence", () => {
    const at = fixture()
    try {
      at.put("lib/broken.ts", "export const = = =\n")
      const entry = at.put("entry.ts", 'import { x } from "./lib/broken.ts"\nexport { x }\n')
      const closure = localClosure(entry, at.root)
      expect(relatives(at.root, closure.unscanned)).toEqual(["lib/broken.ts"])
      expect(closure.files.size).toBe(2)
    } finally {
      at.drop()
    }
  })

  test("a walk past the ceiling stops and says so", () => {
    const at = fixture()
    const over = REACHED_CEILING + 10
    try {
      for (let n = 0; n < over; n += 1) {
        const next = n + 1 < over ? `import "./f${n + 1}.ts"\n` : ""
        at.put(`lib/f${n}.ts`, `${next}export const f${n} = ${n}\n`)
      }
      const entry = at.put("entry.ts", 'import "./lib/f0.ts"\nexport const entry = 1\n')
      const closure = localClosure(entry, at.root)
      expect(closure.stopped).toBe(true)
      expect(closure.files.size).toBe(REACHED_CEILING)
    } finally {
      at.drop()
    }
  })

  test("a walk inside the ceiling does not say it stopped", () => {
    const at = fixture()
    try {
      at.put("lib/a.ts", "export const a = 1\n")
      const entry = at.put("entry.ts", 'import { a } from "./lib/a.ts"\nexport { a }\n')
      expect(localClosure(entry, at.root).stopped).toBe(false)
    } finally {
      at.drop()
    }
  })

  test("a shebang line is dropped and nothing else is", () => {
    expect(withoutShebang("#!/usr/bin/env bun\nconst a = 1\n")).toBe("const a = 1\n")
    expect(withoutShebang("const a = 1\n")).toBe("const a = 1\n")
  })

  test("what stands in the repository is what is under its root and outside node_modules", () => {
    expect(standsIn("/repo", "/repo/services/a.ts")).toBe(true)
    expect(standsIn("/repo", "/repo/packages/x/src/a.ts")).toBe(true)
    expect(standsIn("/repo", "/repo/node_modules/x/a.js")).toBe(false)
    expect(standsIn("/repo", "/repo/packages/x/node_modules/y/a.js")).toBe(false)
    expect(standsIn("/repo", "/elsewhere/a.ts")).toBe(false)
    expect(standsIn("/repo", "/repository/a.ts")).toBe(false)
  })
})
