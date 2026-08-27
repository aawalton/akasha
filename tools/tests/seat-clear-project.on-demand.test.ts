
import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { type Fixture, fixture } from "./fixture.ts"
import { indexFixture, namedIn, plantProject, seatStore } from "./seat-fixture.ts"

const SEAT_COMMAND = `${import.meta.dir}/../seat.ts`

function plant(at: Fixture): void {
  seatStore(at)
  namedIn(at)
  at.document("pages/domain/widget.domain.md", 'page-type-slug: domain\nslug: widget\ntitle: "Widget"\ndomain-parent-slug: global', 20)
  plantProject(at, "18233")
  indexFixture(at)
}

const WHOLE = [
  "--domain", "widget", "--role", "definer",
  "--principal", "agent", "--parent-name", "aine",
  "--project", "18233",
] as const

function seat(at: Fixture, agent: string, args: readonly string[]): number {
  const run = Bun.spawnSync(["bun", SEAT_COMMAND, "--agent", agent, ...args], {
    env: {
      ...process.env,
      // `AKASHA_ROOT` NAMES THE TEMP REPO. This set `INSTRUCTIONS_ROOT` and `MEMORY_ROOT`, naming
      // repositories that are gone: nothing reads them, so the child read the live checkout.
      AKASHA_ROOT: at.root,
      HOME: at.home,
      PATH: `${at.home}/bin:${process.env.PATH ?? ""}`,
    },
  })
  return run.exitCode
}

const STUB = ["#!/bin/sh", `for one in "$@"; do echo "$one" >> "$HOME/ops-argv"; done`, "echo renamed", ""].join("\n")

function stubOps(at: Fixture): () => readonly string[] {
  mkdirSync(`${at.home}/bin`, { recursive: true })
  writeFileSync(`${at.home}/bin/ops`, STUB, { mode: 0o755 })
  const said = `${at.home}/ops-argv`
  return () => (existsSync(said) ? readFileSync(said, "utf8").split("\n").filter((one) => one !== "") : [])
}

const ROW = "e6f0d0d4-1f2f-4a2b-9d1c-6b7f5a3c2e10"

describe("a project put down", () => {
  test("tells the row none, and leaves the project out of the name", () => {
    const at = fixture()
    try {
      plant(at)
      const argv = stubOps(at)
      expect(seat(at, ROW, [...WHOLE])).toBe(0)
      expect(argv()).toContain("18233")
      expect(argv()).toContain("18233-widget-definer")
      expect(seat(at, ROW, ["--clear", "project"])).toBe(0)
      const said = argv()
      expect(said[said.lastIndexOf("--project") + 1]).toBe("none")
      expect(said[said.lastIndexOf("--name") + 1]).toBe("widget-definer")
    } finally {
      at.dispose()
    }
  })

  test("tells the row again on a second clearing, what was pushed speaking for this side alone", () => {
    const at = fixture()
    try {
      plant(at)
      const argv = stubOps(at)
      seat(at, ROW, [...WHOLE])
      expect(seat(at, ROW, ["--clear", "project"])).toBe(0)
      const before = argv().length
      expect(seat(at, ROW, ["--clear", "project"])).toBe(0)
      const said = argv()
      expect(said.length).toBeGreaterThan(before)
      expect(said[said.lastIndexOf("--project") + 1]).toBe("none")
    } finally {
      at.dispose()
    }
  })
})
