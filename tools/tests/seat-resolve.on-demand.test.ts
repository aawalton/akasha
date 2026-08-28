import { describe, expect, test } from "bun:test"
import { resolveAttributes, scan } from "../lib/seat-resolve.ts"
import { personaDefaultsOf } from "../lib/compose-seat-name.ts"
import { fromSeat } from "../lib/seat-show.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { plantSeat, seatStore } from "./seat-fixture.ts"

const SEAT_COMMAND = `${import.meta.dir}/../seat.ts`

function plant(at: Fixture): void {
  seatStore(at)
  at.document("pages/domain/global.domain.md", 'page-type-slug: domain\nslug: global\ntitle: "Global"\ndomain-parent-slug: global', 20)
  at.document("pages/domain/code-quality.domain.md", 'page-type-slug: domain\nslug: code-quality\ntitle: "Code quality"\ndomain-parent-slug: global', 20)
  at.document("pages/role/reviewer.role.md", 'page-type-slug: role\nslug: reviewer\ntitle: "Reviewer"\ndomain-parent-slug: global', 20)
  at.document("pages/role/definer.role.md", 'page-type-slug: role\nslug: definer\ntitle: "Definer"\ndomain-parent-slug: global', 20)
  at.document("pages/persona/ryn.persona.md", 'page-type-slug: persona\nslug: ryn\ntitle: "Ryn"\nchampioned-domain-slug: code-quality\ndomain-parent-slug: global', 20)
  at.document("pages/person/alan.person.md", 'page-type-slug: person\nslug: alan\ntitle: "Alan"\ndomain-parent-slug: global', 20)
  at.document("pages/task/build-change.task.md", 'page-type-slug: task\nslug: build-change\ntitle: "Build change"\ndomain-parent-slug: global', 20)
}

function assigned(tokens: readonly string[], root: string, stated = {}): readonly string[] {
  const out = resolveAttributes(stated, tokens, root, scan(root))
  if ("refusals" in out) throw new Error(`refused: ${out.refusals.join("; ")}`)
  return out.assigned.map((one) => `${one.slot}=${one.slug}`)
}

function refusalsOf(tokens: readonly string[], root: string, stated = {}): readonly string[] {
  const out = resolveAttributes(stated, tokens, root, scan(root))
  if ("assigned" in out) throw new Error(`resolved: ${out.assigned.map((o) => o.slug).join(", ")}`)
  return out.refusals
}

describe("the sort", () => {
  test("assigns a role token to role and a domain token to domain", () => {
    const at = fixture()
    try {
      plant(at)
      expect(assigned(["reviewer", "code-quality"], at.root)).toEqual([
        "domain=code-quality",
        "role=reviewer",
      ])
    } finally {
      at.dispose()
    }
  })

  test("assigns the same slots whichever order the tokens arrive in", () => {
    const at = fixture()
    try {
      plant(at)
      expect(assigned(["code-quality", "reviewer"], at.root)).toEqual(
        assigned(["reviewer", "code-quality"], at.root)
      )
    } finally {
      at.dispose()
    }
  })

  test("takes a token whose page is a role page as the role, though it declares a domain too", () => {
    const at = fixture()
    try {
      plant(at)
      expect(scan(at.root).slugs.get("reviewer")).toBe("pages/role/reviewer.role.md")
      expect(assigned(["reviewer"], at.root)).toEqual(["role=reviewer"])
    } finally {
      at.dispose()
    }
  })

  test("refuses two tokens claiming one slot, naming both", () => {
    const at = fixture()
    try {
      plant(at)
      const refused = refusalsOf(["reviewer", "definer"], at.root).join("\n")
      expect(refused).toContain("reviewer")
      expect(refused).toContain("definer")
    } finally {
      at.dispose()
    }
  })

  test("refuses a token that is neither a role nor a domain, naming it and what resolves", () => {
    const at = fixture()
    try {
      plant(at)
      const refused = refusalsOf(["reviewr"], at.root).join("\n")
      expect(refused).toContain("reviewr")
      expect(refused).toContain("reviewer")
    } finally {
      at.dispose()
    }
  })

  test("a task nested under a subdirectory resolves by its stem", () => {
    const at = fixture()
    try {
      plant(at)
      at.document("pages/task/projects/verify-handback.task.md", "slug: verify-handback\ndomain-parent-slug: global", 20)
      expect(assigned([], at.root, { task: "verify-handback" })).toEqual(["task=verify-handback"])
    } finally {
      at.dispose()
    }
  })

  test("two tasks sharing a stem are refused rather than guessed apart", () => {
    const at = fixture()
    try {
      plant(at)
      at.document("pages/task/projects/build-change.task.md", "slug: build-change-nested\ndomain-parent-slug: global", 20)
      const refused = refusalsOf([], at.root, { task: "build-change" }).join("\n")
      expect(refused).toContain("pages/task/build-change.task.md")
      expect(refused).toContain("pages/task/projects/build-change.task.md")
    } finally {
      at.dispose()
    }
  })

  test("resolves a stated slot on the slot named, across all four", () => {
    const at = fixture()
    try {
      plant(at)
      const stated = { persona: "ryn", domain: "code-quality", role: "reviewer", task: "build-change" }
      expect(assigned([], at.root, stated)).toEqual([
        "persona=ryn",
        "domain=code-quality",
        "role=reviewer",
        "task=build-change",
      ])
    } finally {
      at.dispose()
    }
  })

  test("refuses a token that claims a slot a stated flag already holds", () => {
    const at = fixture()
    try {
      plant(at)
      const refused = refusalsOf(["definer"], at.root, { role: "reviewer" }).join("\n")
      expect(refused).toContain("definer")
      expect(refused).toContain("reviewer")
    } finally {
      at.dispose()
    }
  })
})

async function runResolve(at: Fixture, args: readonly string[]): Promise<{ code: number; out: string; err: string }> {
  const child = Bun.spawn(["bun", SEAT_COMMAND, "--resolve", ...args], {
    env: { ...process.env, AKASHA_ROOT: at.root, HOME: at.home },
    stdout: "pipe",
    stderr: "pipe",
  })
  const [out, err] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text()])
  return { code: await child.exited, out, err }
}

describe("--resolve", () => {
  test("prints one line per slot and exits clean", async () => {
    const at = fixture()
    try {
      plant(at)
      const run = await runResolve(at, ["--token", "reviewer", "--token", "code-quality"])
      expect(run.code).toBe(0)
      expect(run.out.trim().split("\n").sort()).toEqual(["domain=code-quality", "role=reviewer"])
    } finally {
      at.dispose()
    }
  })

  test("prints every stated slot, including the two no token can name", async () => {
    const at = fixture()
    try {
      plant(at)
      const run = await runResolve(at, [
        "--persona", "ryn", "--role", "reviewer", "--domain", "code-quality", "--task", "build-change",
      ])
      expect(run.code).toBe(0)
      expect(run.out.trim().split("\n")).toEqual([
        "persona=ryn",
        "domain=code-quality",
        "role=reviewer",
        "task=build-change",
      ])
    } finally {
      at.dispose()
    }
  })

  test("refuses an unresolvable token on stderr with nothing on stdout", async () => {
    const at = fixture()
    try {
      plant(at)
      const run = await runResolve(at, ["--token", "reviewr"])
      expect(run.code).not.toBe(0)
      expect(run.out).toBe("")
      expect(run.err).toContain("reviewr")
    } finally {
      at.dispose()
    }
  })

  test("refuses two tokens claiming one slot, naming both", async () => {
    const at = fixture()
    try {
      plant(at)
      const run = await runResolve(at, ["--token", "reviewer", "--token", "definer"])
      expect(run.code).not.toBe(0)
      expect(run.out).toBe("")
      expect(run.err).toContain("reviewer")
      expect(run.err).toContain("definer")
    } finally {
      at.dispose()
    }
  })

  test("writes nothing on any of those paths", async () => {
    const at = fixture()
    try {
      plant(at)
      const id = "resolve-writes-nothing"
      await runResolve(at, ["--token", "reviewer", "--token", "code-quality"])
      await runResolve(at, ["--token", "reviewr"])
      await runResolve(at, ["--token", "reviewer", "--token", "definer"])
      const shown = Bun.spawnSync(["bun", SEAT_COMMAND, "--agent", id, "--show"], {
        env: { ...process.env, AKASHA_ROOT: at.root, HOME: at.home },
      })
      const text = shown.stdout.toString()
      for (const slot of ["persona", "domain", "role", "task"]) {
        expect(text).toContain(`${slot.padEnd(8)} — not stated`)
      }
    } finally {
      at.dispose()
    }
  })
})
describe("the owned domain", () => {
  test("reads the domain the persona's own document states", () => {
    const at = fixture()
    try {
      plant(at)
      expect(personaDefaultsOf(at.root, "ryn")?.domain ?? null).toBe("code-quality")
    } finally {
      at.dispose()
    }
  })

  test("answers null for a persona whose document states none, rather than a default", () => {
    const at = fixture()
    try {
      plant(at)
      at.document("pages/persona/claude.persona.md", "slug: claude\ndomain-parent-slug: global", 20)
      expect(personaDefaultsOf(at.root, "claude")?.domain ?? null).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("answers null for a persona with no document at all", () => {
    const at = fixture()
    try {
      plant(at)
      expect(personaDefaultsOf(at.root, "nobody")?.domain ?? null).toBeNull()
    } finally {
      at.dispose()
    }
  })
})

const SEAT_AGENT = "00000000-0000-0000-0000-000000017523"

function planSeat(at: Fixture, name: string): void {
  plantSeat(at, { agent: SEAT_AGENT, name })
  Bun.spawnSync(["bun", SEAT_COMMAND, "--agent", SEAT_AGENT, "--mode", "headless"], {
    env: { ...process.env, AKASHA_ROOT: at.root, HOME: at.home },
  })
}

function proposed(at: Fixture): Partial<Record<string, string>> {
  const out = fromSeat(SEAT_AGENT, at.root)
  if ("note" in out) throw new Error(out.note)
  return out.set
}

describe("--from-seat", () => {
  test("proposes the domain and the role her document states beside the persona, off a name that is her slug alone", () => {
    const at = fixture()
    try {
      plant(at)
      at.document(
        "pages/persona/ryn.persona.md",
        'page-type-slug: persona\nslug: ryn\ntitle: "Ryn"\nchampioned-domain-slug: code-quality\nrole-slug: reviewer\ndomain-parent-slug: global',
        20
      )
      planSeat(at, "ryn")

      expect(proposed(at)).toEqual({ persona: "ryn", domain: "code-quality", role: "reviewer" })
    } finally {
      at.dispose()
    }
  })

  test("proposes the domain for a seat named for the persona alone", () => {
    const at = fixture()
    try {
      plant(at)
      planSeat(at, "ryn")

      expect(proposed(at)).toEqual({ persona: "ryn", domain: "code-quality" })
    } finally {
      at.dispose()
    }
  })

  test("proposes no domain for a persona whose document states none", () => {
    const at = fixture()
    try {
      plant(at)
      at.document(
        "pages/persona/claude.persona.md",
        'page-type-slug: persona\nslug: claude\ntitle: "Claude"\ndomain-parent-slug: global',
        20
      )
      planSeat(at, "claude")

      expect(proposed(at)).toEqual({ persona: "claude" })
    } finally {
      at.dispose()
    }
  })
})
