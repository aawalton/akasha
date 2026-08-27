import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { codeRoot } from "../code-root.ts"
import { HOSTS } from "./hosts"
import { SERVICES } from "./registry"

describe("SERVICES registry", () => {
  test("service names are unique (prune keys off name)", () => {
    const names = SERVICES.map((s) => s.name)
    expect(new Set(names).size).toBe(names.length)
  })

  test("ports are unique across services (no two services bind the same port)", () => {
    const ports = SERVICES.map((s) => s.port)
    expect(new Set(ports).size).toBe(ports.length)
  })

  test("internalPorts are unique and disjoint from every public port", () => {
    const internal = SERVICES.flatMap((s) => (s.internalPort === undefined ? [] : [s.internalPort]))
    expect(new Set(internal).size).toBe(internal.length)
    const publics = new Set(SERVICES.map((s) => s.port))
    for (const ip of internal) expect(publics.has(ip)).toBe(false)
  })

  test("pool services declare an internalPort; always-on services do not", () => {
    for (const s of SERVICES) {
      if (s.lifecycle === "pool") expect(s.internalPort).toBeDefined()
      else expect(s.internalPort).toBeUndefined()
    }
  })

  test("the traffic-cop service exists and is always-on", () => {
    const cop = SERVICES.find((s) => s.name === "traffic-cop")
    expect(cop).toBeDefined()
    if (cop === undefined) return
    expect(cop.lifecycle).toBe("always-on")
  })

  test("ollama is a pool service fronted on the tailnet", () => {
    const ollama = SERVICES.find((s) => s.name === "ollama")
    expect(ollama).toBeDefined()
    if (ollama === undefined) return
    expect(ollama.lifecycle).toBe("pool")
    expect(ollama.publicBind).toBe("tailnet")
  })

  test("every service targets a host declared in HOSTS", () => {
    for (const service of SERVICES) {
      expect(HOSTS[service.host]).toBeDefined()
    }
  })

  test("every service ships a deploy.sh under its sourceDir", () => {
    const root = codeRoot()
    for (const service of SERVICES) {
      expect(existsSync(join(root, service.sourceDir, "deploy.sh"))).toBe(true)
    }
  })

  test.each([
    ["kokoro", 8083],
    ["csm", 8084],
    ["whisper-stt", 8085],
    ["moss-tts", 8093],
    ["higgs-audio", 8094],
    ["voxcpm2", 8095],
  ])("mlx-audio service %s runs mlx_audio.server on public port %d", (name, port) => {
    const service = SERVICES.find((s) => s.name === name)
    expect(service).toBeDefined()
    if (service === undefined) return
    expect(service.port).toBe(port)
    expect(service.internalPort).toBe(port + 10000)
    expect(service.command).toContain("mlx_audio.server")
    expect(service.command).toEqual(expect.arrayContaining(["--host", "127.0.0.1"]))
    expect(service.command).toEqual(expect.arrayContaining(["--port", String(port + 10000)]))
  })

  test("image-gen runs mlx-openai-server image-generation on public port 8086", () => {
    const service = SERVICES.find((s) => s.name === "image-gen")
    expect(service).toBeDefined()
    if (service === undefined) return
    expect(service.port).toBe(8086)
    expect(service.internalPort).toBe(18086)
    expect(service.command).toContain("mlx-openai-server")
    expect(service.command).toEqual(expect.arrayContaining(["--model-type", "image-generation"]))
    expect(service.command).toEqual(expect.arrayContaining(["--config-name", "z-image-turbo"]))
    expect(service.command).toEqual(expect.arrayContaining(["--host", "127.0.0.1"]))
    expect(service.command).toEqual(expect.arrayContaining(["--port", "18086"]))
  })

  test("exactly moss-tts and image-gen are warm-set members", () => {
    const warmNames = SERVICES.filter((s) => s.warm)
      .map((s) => s.name)
      .sort()
    expect(warmNames).toEqual(["image-gen", "moss-tts"])
    expect(SERVICES.find((s) => s.name === "ollama")?.warm).toBe(false)
  })

  test("mlx-vlm runs mlx_vlm.server with Qwen3-VL on public port 8096", () => {
    const service = SERVICES.find((s) => s.name === "mlx-vlm")
    expect(service).toBeDefined()
    if (service === undefined) return
    expect(service.port).toBe(8096)
    expect(service.internalPort).toBe(18096)
    expect(service.lifecycle).toBe("pool")
    expect(service.command).toContain("mlx_vlm.server")
    expect(service.command).toEqual(
      expect.arrayContaining(["--model", "mlx-community/Qwen3-VL-30B-A3B-Instruct-4bit"])
    )
    expect(service.command).toEqual(expect.arrayContaining(["--host", "127.0.0.1"]))
    expect(service.command).toEqual(expect.arrayContaining(["--port", "18096"]))
  })
})
