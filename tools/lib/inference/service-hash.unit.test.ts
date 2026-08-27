import { describe, expect, test } from "bun:test"
import { foldServiceManifest } from "./service-hash"

const BASE_FILES_HASH = "abcdef012345"

const KOKORO = {
  command: ["python", "-m", "mlx_audio.server", "--host", "0.0.0.0", "--port", "8083"],
  port: 8083,
  workdir: ".",
} as const

describe("foldServiceManifest", () => {
  test("is deterministic for the same files-hash and manifest", () => {
    expect(foldServiceManifest(BASE_FILES_HASH, KOKORO)).toBe(
      foldServiceManifest(BASE_FILES_HASH, KOKORO)
    )
  })

  test("returns a 12-char lowercase hex inputs-hash", () => {
    expect(foldServiceManifest(BASE_FILES_HASH, KOKORO)).toMatch(/^[0-9a-f]{12}$/)
  })

  test("a different port yields a different hash (same files, same command)", () => {
    const csm = { ...KOKORO, command: [...KOKORO.command.slice(0, -1), "8084"], port: 8084 }
    expect(foldServiceManifest(BASE_FILES_HASH, csm)).not.toBe(
      foldServiceManifest(BASE_FILES_HASH, KOKORO)
    )
  })

  test("a different command yields a different hash", () => {
    const other = { ...KOKORO, command: [...KOKORO.command, "--verbose"] }
    expect(foldServiceManifest(BASE_FILES_HASH, other)).not.toBe(
      foldServiceManifest(BASE_FILES_HASH, KOKORO)
    )
  })

  test("a different workdir yields a different hash", () => {
    const other = { ...KOKORO, workdir: "sub" }
    expect(foldServiceManifest(BASE_FILES_HASH, other)).not.toBe(
      foldServiceManifest(BASE_FILES_HASH, KOKORO)
    )
  })

  test("a different files-hash yields a different hash (same manifest)", () => {
    expect(foldServiceManifest("0123456789ab", KOKORO)).not.toBe(
      foldServiceManifest(BASE_FILES_HASH, KOKORO)
    )
  })
})
