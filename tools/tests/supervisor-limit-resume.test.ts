
import { describe, expect, it } from "bun:test"
import { dirname, resolve } from "node:path"
import { decided, hold } from "../lib/digest-harness.ts"
import { SCENARIOS } from "./supervisor-limit-resume-scenarios.ts"
import { startHarness } from "./supervisor-limit-resume-harness.ts"

describe("startLimitResumeMonitor, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const h = startHarness(scenario.over)
      try {
        await scenario.drive(h)
      } finally {
        h.monitor.stop()
      }
      const observed = decided("ported", { value: scenario.observe(h), notice: null })
      expect(hold(scenario.name, scenario.standing, observed).matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })

  it("nothing this monitor reaches can exit the process", async () => {
    const start = new URL("../lib/supervisor-limit-resume.ts", import.meta.url).pathname
    const seen = new Set<string>()
    const queue = [start]
    const exits: string[] = []
    for (let file = queue.pop(); file !== undefined; file = queue.pop()) {
      if (seen.has(file)) continue
      seen.add(file)
      const source = (await Bun.file(file).text())
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^[ \t]*\/\/.*$/gm, "")
      if (/process\s*\.\s*exit\s*\(/.test(source)) exits.push(file)
      for (const edge of source.matchAll(/^(?:import|export)[^;]*?from "(\.[^"]+)"/gm)) {
        const target = edge[1]
        if (target !== undefined) queue.push(resolve(dirname(file), target))
      }
    }
    expect(seen.size).toBeGreaterThan(1)
    expect(exits).toEqual([])
  })
})
