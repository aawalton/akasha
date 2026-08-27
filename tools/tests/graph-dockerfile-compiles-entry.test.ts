import { describe, expect, test } from "bun:test"
import { compiledEntries } from "../lib/graph/producers/file/dockerfile-file/compiled-entries.ts"

const WATCHER = [
  "FROM oven/bun:1.3.14-alpine AS worker-builder",
  "WORKDIR /workspace",
  "COPY . .",
  "RUN bun install --frozen-lockfile",
  "RUN mkdir -p /out && \\",
  "    bun build --compile --target=bun-windows-x64 \\",
  '      --define "__WATCHER_VERSION__=\\"${COMMIT_SHA}\\"" \\',
  "      --outfile=/out/temper-watcher-worker.exe \\",
  "      packages/temper/scripts/src/watcher-exe/main.ts && \\",
  '    echo "${COMMIT_SHA}" > /out/version.txt',
].join("\n")

describe("compiledEntries", () => {
  test("takes the entry a folded bun build command is handed", () => {
    expect(compiledEntries(WATCHER)).toEqual(["packages/temper/scripts/src/watcher-exe/main.ts"])
  })

  test("takes no entry from a Dockerfile that compiles nothing", () => {
    const clean = [
      "FROM alpine:3.22",
      "RUN apk add --no-cache curl",
      "COPY packages/a/src/entry.ts /srv/entry.ts",
      'CMD ["bun", "run", "packages/a/src/server.ts"]',
    ].join("\n")
    expect(compiledEntries(clean)).toEqual([])
  })

  test("takes no flag value as an entry", () => {
    const flagged = "RUN bun build --outfile /out/app.js --tsconfig-override packages/a/tsconfig.json"
    expect(compiledEntries(flagged)).toEqual([])
  })

  test("takes each entry once where a build command names one twice", () => {
    const twice = "RUN bun build a/x.ts && bun build a/x.ts"
    expect(compiledEntries(twice)).toEqual(["a/x.ts"])
  })

  test("takes an entry from a second build command in one instruction", () => {
    const both = "RUN bun build a/x.ts && bun build --compile b/y.tsx"
    expect(compiledEntries(both)).toEqual(["a/x.ts", "b/y.tsx"])
  })

  test("takes no entry from a command that is not bun build", () => {
    expect(compiledEntries("RUN bun run a/x.ts")).toEqual([])
  })
})
