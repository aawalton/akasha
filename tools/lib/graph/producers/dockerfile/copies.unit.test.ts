import { describe, expect, it } from "bun:test"
import { candidatePaths, copySources, recipeDir } from "./copies.ts"

describe("copySources", () => {
  it("takes the sources a copy line names", () => {
    expect(copySources("COPY annual-dump.sh /usr/local/bin/annual-dump.sh")).toEqual([
      "annual-dump.sh",
    ])
  })

  it("takes every operand but the last", () => {
    expect(copySources("COPY one.txt two.txt /dest/")).toEqual(["one.txt", "two.txt"])
  })

  it("takes nothing from a copy out of an earlier build stage", () => {
    expect(copySources("COPY --from=rust-builder /build/out.exe /build/out.exe")).toEqual([])
  })

  it("takes nothing from a copy out of a named image", () => {
    expect(copySources("COPY --from busybox /bin/sh /bin/sh")).toEqual([])
  })

  it("keeps the source behind a flag that is not --from", () => {
    expect(copySources("COPY --chown=26:26 server.py /app/server.py")).toEqual(["server.py"])
  })

  it("folds a continued line back into one instruction", () => {
    const text = ["COPY --from=pg-net-builder /usr/lib/pg_net.so \\", "     /usr/lib/"].join("\n")
    expect(copySources(text)).toEqual([])
  })

  it("reads nothing out of a comment or a blank line", () => {
    expect(copySources("# COPY commented.sh /x\n\nRUN true")).toEqual([])
  })

  it("reads nothing out of an ADD line", () => {
    expect(copySources("ADD added.tar.gz /opt/")).toEqual([])
  })

  it("names the whole build context as its own source", () => {
    expect(copySources("COPY . .")).toEqual(["."])
  })

  it("takes nothing from a copy line with only a destination", () => {
    expect(copySources("COPY /dest")).toEqual([])
  })

  it("strips the quotes around a source", () => {
    expect(copySources('COPY "src/server.py" /app/server.py')).toEqual(["src/server.py"])
  })
})

describe("candidatePaths", () => {
  it("reads the source against the recipe's own directory first", () => {
    expect(candidatePaths("packages/infra/voice-infer/Containerfile.cu121", "src/server.py")).toEqual([
      "packages/infra/voice-infer/src/server.py",
      "src/server.py",
    ])
  })

  it("reads a repository-root source against the root too", () => {
    expect(
      candidatePaths(
        "packages/infra/k8s/src/temper-watcher/build/Dockerfile",
        "packages/temper/watcher-tray/Cargo.toml"
      )
    ).toEqual([
      "packages/infra/k8s/src/temper-watcher/build/packages/temper/watcher-tray/Cargo.toml",
      "packages/temper/watcher-tray/Cargo.toml",
    ])
  })

  it("resolves the whole build context to the recipe's directory and the root", () => {
    expect(candidatePaths("packages/infra/voice-infer/Containerfile.cu121", ".")).toEqual([
      "packages/infra/voice-infer",
      "",
    ])
  })

  it("refuses a source reaching outside the repository", () => {
    expect(candidatePaths("a/Dockerfile", "../../../etc/passwd")).toEqual([])
  })

  it("refuses an absolute source", () => {
    expect(candidatePaths("a/Dockerfile", "/usr/lib/x.so")).toEqual([])
  })

  it("drops a trailing slash", () => {
    expect(candidatePaths("a/Dockerfile", "src/")).toEqual(["a/src", "src"])
  })
})

describe("recipeDir", () => {
  it("gives the directory the recipe stands in", () => {
    expect(recipeDir("packages/infra/voice-infer/Containerfile.cu121")).toBe(
      "packages/infra/voice-infer"
    )
  })

  it("gives the repository root for a recipe standing there", () => {
    expect(recipeDir("Dockerfile")).toBe("")
  })
})
