import { describe, expect, test } from "bun:test"
import { parseActualState, parseMfluxTools } from "./reconcile"

describe("parseMfluxTools", () => {
  test("returns the mflux-* entry points, trimmed and sorted", () => {
    const raw = "mflux-generate\nmflux-train\n"
    expect(parseMfluxTools(raw)).toEqual(["mflux-generate", "mflux-train"])
  })
  test("drops blank lines and surrounding whitespace", () => {
    const raw = "\n  mflux-generate  \n\n  mflux-train\n"
    expect(parseMfluxTools(raw)).toEqual(["mflux-generate", "mflux-train"])
  })
  test("yields an empty list for the ENV_MISSING sentinel", () => {
    expect(parseMfluxTools("ENV_MISSING\n")).toEqual([])
  })
  test("ignores non-mflux lines that may leak from the shell", () => {
    const raw = "Note: activating env\nmflux-info\nbasename: extra\n"
    expect(parseMfluxTools(raw)).toEqual(["mflux-info"])
  })
})

describe("parseActualState", () => {
  test("assembles dir + launchd + conda tags into one resource, healthy by default", () => {
    const raw = "DIR image-gen abc123\nLAUNCHD image-gen\nCONDA image-gen\n"
    const [r] = parseActualState(raw)
    expect(r).toEqual({
      name: "image-gen",
      dirPresent: true,
      inputsHash: "abc123",
      launchdLoaded: true,
      condaEnvPresent: true,
      condaEnvHealthy: true,
    })
  })

  test("a CONDABAD tag flips condaEnvHealthy false while the env stays present", () => {
    const raw = "DIR image-gen h\nLAUNCHD image-gen\nCONDA image-gen\nCONDABAD image-gen\n"
    const [r] = parseActualState(raw)
    expect(r?.condaEnvPresent).toBe(true)
    expect(r?.condaEnvHealthy).toBe(false)
  })

  test("NONE hash parses to null and a clean host yields no resources", () => {
    expect(parseActualState("DIR x NONE\n")[0]?.inputsHash).toBeNull()
    expect(parseActualState("\n  \n")).toEqual([])
  })
})
