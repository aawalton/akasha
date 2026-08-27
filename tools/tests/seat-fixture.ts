import { mkdirSync, readdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { Mode } from "../lib/attributes.ts"
import { type Fixture, installPages } from "./fixture.ts"

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

function gitRepos(at: Fixture): void {
  Bun.spawnSync(["git", "init", "-q", at.memory])
  Bun.spawnSync(["git", "-C", at.memory, "config", "user.email", "seat@fixture"])
  Bun.spawnSync(["git", "-C", at.memory, "config", "user.name", "seat fixture"])
  Bun.spawnSync(["git", "-C", at.memory, "commit", "-q", "--allow-empty", "-m", "the memory a seat page lands in"])
  Bun.spawnSync(["git", "init", "-q", at.root])
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
  const path = `${at.akasha}/agent/seat/${seat.name ?? seat.agent}.seat.md`
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, seatPage(seat), "utf8")
  at.sweepOnDispose(path)
  return path
}

export function plantProject(at: Fixture, seq: string): void {
  at.memoryDocument(`projects/${seq}.md`, `page-type-slug: project\ntitle: "Project ${seq}"\nseq: ${seq}`, 20)
}

export function plantInitiative(at: Fixture, relPath: string, slug: string): void {
  at.memoryDocument(relPath, `page-type-slug: initiative\ntitle: "${slug}"\nslug: ${slug}\ndomain: global`, 20)
}

const VOCABULARIES = ["persona", "person", "role", "task"] as const

export function seatStore(at: Fixture): void {
  gitRepos(at)
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
