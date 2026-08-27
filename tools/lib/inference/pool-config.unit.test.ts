import { describe, expect, test } from "bun:test"
import { getHost } from "./hosts"
import {
  buildPoolConfig,
  buildWritePoolConfigScript,
  foldPoolConfigHash,
  serializePoolConfig,
} from "./pool-config"
import { SERVICES } from "./registry"
import type { InferenceService } from "./schema"
import { trafficCopPoolConfigSchema } from "./traffic-cop-config.ts"

const macbookServices = SERVICES.filter((s) => s.host === "macbook")

describe("buildPoolConfig", () => {
  const config = buildPoolConfig(macbookServices, 8099)

  test("includes every pool service and excludes always-on services", () => {
    const poolNames = macbookServices.filter((s) => s.lifecycle === "pool").map((s) => s.name)
    expect(config.services.map((s) => s.name).sort()).toEqual([...poolNames].sort())
    expect(config.services.find((s) => s.name === "traffic-cop")).toBeUndefined()
  })

  test("warmSet is exactly the pool members flagged warm (moss-tts + image-gen)", () => {
    expect([...config.warmSet].sort()).toEqual(["image-gen", "moss-tts"])
    expect(config.services.find((s) => s.name === "moss-tts")).toBeDefined()
    expect(config.services.find((s) => s.name === "image-gen")).toBeDefined()
  })

  test("maps public/internal ports and the launchd label for a pool member", () => {
    const img = config.services.find((s) => s.name === "image-gen")
    expect(img).toEqual({
      name: "image-gen",
      publicPort: 8086,
      publicHost: "0.0.0.0",
      internalPort: 18086,
      launchdLabel: "com.alanwalton.inference.image-gen",
    })
  })

  test("tailnet exposure for ollama (#13130) and the voices", () => {
    expect(config.services.find((s) => s.name === "ollama")?.publicHost).toBe("0.0.0.0")
    expect(config.services.find((s) => s.name === "kokoro")?.publicHost).toBe("0.0.0.0")
  })

  test("adminPort is the cop's own port", () => {
    expect(config.adminPort).toBe(8099)
  })

  test("throws on a pool service missing internalPort (defensive, no !-assert)", () => {
    const broken: InferenceService = {
      name: "broken",
      host: "macbook",
      pythonVersion: "3.12",
      sourceDir: "x",
      workdir: ".",
      command: ["x"],
      port: 9000,
      lifecycle: "pool",
      publicBind: "tailnet",
      warm: false,
    }
    expect(() => buildPoolConfig([broken], 8099)).toThrow(/internalPort/)
  })
})

describe("buildWritePoolConfigScript", () => {
  const script = buildWritePoolConfigScript({
    host: getHost("macbook"),
    services: macbookServices,
    copName: "traffic-cop",
    adminPort: 8099,
  })

  test("writes pool.json into the cop service home via a quoted heredoc", () => {
    expect(script).toContain("mkdir -p '/Users/walton/inference/traffic-cop'")
    expect(script).toContain(
      "cat > '/Users/walton/inference/traffic-cop/pool.json' <<'POOLJSON_EOF'"
    )
    expect(script).toContain("POOLJSON_EOF")
  })

  test("embeds valid JSON that round-trips to the same pool config", async () => {
    const body = script.split("<<'POOLJSON_EOF'\n")[1]?.split("\nPOOLJSON_EOF")[0]
    expect(body).toBeDefined()
    if (body === undefined) return
    const parsed = (await trafficCopPoolConfigSchema()).parse(JSON.parse(body))
    expect(parsed).toEqual(buildPoolConfig(macbookServices, 8099))
  })
})

describe("foldPoolConfigHash", () => {
  test("is deterministic and changes when the pool config changes", () => {
    const base = "deadbeef0000"
    const a = serializePoolConfig(buildPoolConfig(macbookServices, 8099))
    const b = serializePoolConfig(buildPoolConfig(macbookServices, 9000))
    expect(foldPoolConfigHash(base, a)).toBe(foldPoolConfigHash(base, a))
    expect(foldPoolConfigHash(base, a)).not.toBe(foldPoolConfigHash(base, b))
  })
})
