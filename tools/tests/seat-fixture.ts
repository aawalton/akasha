import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { Mode } from "../lib/attributes.ts"
import { type Fixture, installPages, installRepos } from "./fixture.ts"

const LIVE = dirname(dirname(import.meta.dir))

const PROPERTY_PREFIX = "seat-"

const PROPERTY_PLACE = "pages/page-property-definition"

const PAGE_TYPES = [
  "pages/page-type/page.page-type.md",
  "pages/page-type/page-type.page-type.md",
  "pages/page-type/page-property-definition.page-type.md",
  "pages/page-type/page-body-shape.page-type.md",
  "pages/page-type/agent.page-type.md",
  "pages/page-type/seat.page-type.md",
  "pages/page-type/domain.page-type.md",
  "pages/page-type/persona.page-type.md",
  "pages/page-type/person.page-type.md",
  "pages/page-type/role.page-type.md",
  "pages/page-type/task.page-type.md",
  "pages/page-type/initiative.page-type.md",
  "pages/page-body-shape/task.page-body-shape.md",
  "pages/page-body-shape/initiative.page-body-shape.md",
  "pages/page-body-shape/empty.page-body-shape.md",
  "pages/page-body-shape/domain.page-body-shape.md",
  "pages/page-body-shape/persona.page-body-shape.md",
  "pages/page-property-definition/page-id.page-property-definition.md",
  "pages/page-property-definition/page-title.page-property-definition.md",
  "pages/page-property-definition/page-type-slug.page-property-definition.md",
]

function seatProperties(): readonly string[] {
  return readdirSync(`${LIVE}/${PROPERTY_PLACE}`)
    .filter((name) => name.startsWith(PROPERTY_PREFIX))
    .map((name) => `${PROPERTY_PLACE}/${name}`)
}

const INDEX_BUILD = `${import.meta.dir}/index-fixture.ts`

/**
 * The page index this fixture answers page types from, and the command code a spawned tool runs.
 *
 * THE REGISTRY IS READ OFF THE INDEX RATHER THAN GLOBBED — `page/property/registry.ts` builds
 * every page type out of `loadPages()`, which reads the index under `<AKASHA_ROOT>/.git` — so a
 * temp root carrying no index states no page type at all, and every slug a seat names resolves to
 * nothing with `no page type ... states where its files stand`. The index is built out of what git
 * TRACKS, so the planted pages are staged before it is asked for.
 *
 * THE COMMAND PAGES ARE COPIED AND THEIR CODE IS LINKED, because `tools/lib/tool-argv.ts` spells
 * a spawned tool's file under `akashaRoot()` — this temp root — and `tools/ops/akasha.ts` finds a
 * command by globbing `*.command.md` under that same root. A glob does not walk into a symlinked
 * folder, so linking `ops-cli` whole leaves `ops` holding no command and every tool a command
 * shells out to answers `Usage: ops <command>`. The pages are real files here; each
 * `*.attachment.ts` beside them is a link, so the code that runs is the live checkout's and its
 * own relative imports resolve there rather than in here.
 *
 * WHAT IS PLANTED IS COMMITTED, not merely staged. `ops write` turns a call addressing akasha into
 * a patch against HEAD, and a repository with no commit in it has no HEAD to name — the seat
 * command then reports its page `was not written` with git's `Not a valid object name HEAD`.
 *
 * CALL THIS AFTER THE LAST PAGE IS PLANTED. A page written afterwards is not in the index and does
 * not resolve; plant, then index again.
 */
export function indexFixture(at: Fixture): void {
  installCommands(at)
  Bun.spawnSync(["git", "-C", at.root, "add", "-A"])
  Bun.spawnSync(["git", "-C", at.root, "commit", "-q", "--allow-empty", "-m", "what this fixture plants"])
  const built = Bun.spawnSync(["bun", INDEX_BUILD], {
    cwd: LIVE,
    env: { ...process.env, AKASHA_ROOT: at.root },
  })
  if (built.exitCode !== 0) {
    throw new Error(`the fixture index was not built: ${built.stderr.toString()}`)
  }
}

const COMMANDS = "ops-cli"

/**
 * The command pages a spawned `ops` finds under this temp root, their code linked to the live one.
 *
 * EXPORTED BECAUSE A TEST NEEDS THESE WITHOUT NEEDING AN INDEX. Every tool spawned against a temp
 * `AKASHA_ROOT` reaches `ops` through `tools/lib/tool-argv.ts`, and the dispatcher globs its
 * commands under that same root — so a root without these answers `Usage: ops <command>` and
 * `ops: unknown command` whatever the test was actually checking. See `indexFixture` above for why
 * the pages are copied and only their `*.attachment.ts` is linked.
 */
export function installCommands(at: Fixture): void {
  if (existsSync(`${at.root}/${COMMANDS}`)) return
  cpSync(`${LIVE}/${COMMANDS}`, `${at.root}/${COMMANDS}`, { recursive: true })
  for (const rel of new Bun.Glob(`**/*.attachment.ts`).scanSync({ cwd: `${LIVE}/${COMMANDS}` })) {
    rmSync(`${at.root}/${COMMANDS}/${rel}`, { force: true })
    symlinkSync(`${LIVE}/${COMMANDS}/${rel}`, `${at.root}/${COMMANDS}/${rel}`)
  }
}

export interface Planted {
  readonly agent: string
  readonly name?: string
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
  readonly task?: string
  readonly principal?: string
  readonly above?: string
  readonly mode?: Mode
  readonly onCall?: boolean
  readonly initiative?: string
  readonly session?: string
}

function keyed(key: string, value: string | undefined): readonly string[] {
  return value === undefined ? [] : [`${key}: ${value}`]
}

export function seatPage(seat: Planted): string {
  return [
    "---",
    "page-type-slug: seat",
    `id: ${seat.agent}`,
    `title: "${seat.name ?? seat.agent}"`,
    ...keyed("persona-slug", seat.persona),
    ...keyed("domain-slug", seat.domain),
    ...keyed("role-slug", seat.role),
    ...keyed("task-slug", seat.task),
    ...keyed("person-slug", seat.principal),
    ...keyed("principal-seat-name", seat.above),
    ...keyed("start-mode", seat.mode),
    ...(seat.onCall === true ? ["on-call: true"] : []),
    ...keyed("initiative-slug", seat.initiative),
    ...keyed("claude-code-session-uuid", seat.session),
    "---",
    "",
  ].join("\n")
}

export function plantSeat(at: Fixture, seat: Planted): string {
  const path = `${at.root}/agent/seat/${seat.name ?? seat.agent}.seat.md`
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, seatPage(seat), "utf8")
  at.sweepOnDispose(path)
  return path
}

export function plantProject(at: Fixture, seq: string): void {
  at.document(`projects/${seq}.md`, `page-type-slug: project\ntitle: "Project ${seq}"\nseq: ${seq}`, 20)
}

export function plantInitiative(at: Fixture, relPath: string, slug: string): void {
  at.document(relPath, `page-type-slug: initiative\ntitle: "${slug}"\nslug: ${slug}\ndomain: global`, 20)
}

const VOCABULARIES = ["persona", "person", "role", "task"] as const

export function seatStore(at: Fixture): void {
  installRepos(at.root)
  installPages(at.root, [...PAGE_TYPES, ...seatProperties()])
  for (const under of VOCABULARIES) mkdirSync(`${at.root}/pages/${under}`, { recursive: true })
  at.installRecorder()
}

export function namedIn(at: Fixture): void {
  at.document("pages/domain/global.domain.md", 'page-type-slug: domain\nslug: global\ntitle: "Global"\ndomain-parent-slug: global', 20)
  at.document("pages/persona/athena.persona.md", 'page-type-slug: persona\nslug: athena\ntitle: "Athena"\ndomain-parent-slug: global', 20)
  at.document("pages/person/alan.person.md", 'page-type-slug: person\nslug: alan\ntitle: "Alan"\ndomain-parent-slug: global', 20)
  at.document("pages/role/definer.role.md", 'page-type-slug: role\nslug: definer\ntitle: "Definer"\ndomain-parent-slug: global', 20)
  at.document("pages/task/change-instructions.task.md", 'page-type-slug: task\nslug: change-instructions\ntitle: "Change instructions"\ndomain-parent-slug: global', 20)
}
