import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (extendsSlug: string): string => page([`extends-slug: ${extendsSlug}`])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/person.page-type.md": kind("none"),
  "pages/page-type/team.page-type.md": kind("none"),
  "pages/page-type/squad.page-type.md": kind("team"),
  "pages/page-type/job.page-type.md": kind("none"),
  "pages/page-type/site.page-type.md": kind("none"),
  "pages/page-type/grade.page-type.md": kind("none"),
  "pages/page-type/gauge.page-type.md": kind("none"),

  "pages/page-property-definition/team-lead.page-property-definition.md": property("team", "lead", ["type: relation-slug", "target-slug: person"]),
  "pages/page-property-definition/team-above.page-property-definition.md": property("team", "above-slugs", [
    "type: list(relation-slug, max 5)",
    "target-slug: team",
  ]),
  "pages/page-property-definition/team-owner.page-property-definition.md": property("team", "owner", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - lead\n  - above-slugs.owner",
  ]),
  "pages/page-property-definition/team-jobs.page-property-definition.md": property("team", "jobs", [
    "type: list(relation-slug)",
    "target-slug: job",
    "computed: true",
    "back-from: job-team",
  ]),
  "pages/page-property-definition/person-leads.page-property-definition.md": property("person", "leads", [
    "type: list(relation-slug)",
    "target-slug: team",
    "computed: true",
    "back-from: team-lead",
  ]),
  "pages/page-property-definition/person-nowhere.page-property-definition.md": property("person", "nowhere", [
    "type: list(relation-slug)",
    "target-slug: team",
    "computed: true",
    "back-from: no-such-property",
  ]),
  "pages/page-property-definition/person-both.page-property-definition.md": property("person", "both", [
    "type: list(relation-slug)",
    "target-slug: team",
    "computed: true",
    "from:\n  - slug",
    "back-from: team-lead",
  ]),
  "pages/page-property-definition/job-grade.page-property-definition.md": property("job", "grade", [
    "type: relation-slug",
    "target-slug: grade",
    "slug-property: grade-slug",
  ]),
  "pages/page-property-definition/job-tone.page-property-definition.md": property("job", "tone", [
    "type: text",
    "computed: true",
    "from:\n  - grade.tone",
  ]),
  "pages/page-property-definition/job-team.page-property-definition.md": property("job", "team-slug", ["type: relation-slug", "target-slug: team"]),
  "pages/page-property-definition/job-title.page-property-definition.md": property("job", "title", ["type: text"]),
  "pages/page-property-definition/job-owner.page-property-definition.md": property("job", "owner", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - team-slug.owner",
  ]),
  "pages/page-property-definition/job-misread.page-property-definition.md": property("job", "misread", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - no-such-key",
  ]),
  "pages/page-property-definition/job-loose.page-property-definition.md": property("job", "loose", [
    "type: relation-slug",
    "target-slug: person",
    "computed: true",
    "from:\n  - title.owner",
  ]),

  "pages/page-property-definition/gauge-used.page-property-definition.md": property("gauge", "used", ["type: number"]),
  "pages/page-property-definition/gauge-budget.page-property-definition.md": property("gauge", "budget", ["type: number"]),
  "pages/page-property-definition/gauge-opened.page-property-definition.md": property("gauge", "opened", ["type: instant"]),
  "pages/page-property-definition/gauge-charged.page-property-definition.md": property("gauge", "charged", [
    "type: number",
    "expression: 'case({used} > 0 -> {used}, otherwise -> {budget})'",
  ]),
  "pages/page-property-definition/gauge-seen.page-property-definition.md": property("gauge", "seen", [
    "type: instant",
    "expression: '{opened}'",
  ]),
  "pages/page-property-definition/gauge-unstated.page-property-definition.md": property("gauge", "unstated", [
    "expression: '{budget}'",
  ]),

  "pages/person/ada.person.md": page(["slug: ada"]),
  "pages/person/grace.person.md": page(["slug: grace"]),

  "pages/team/roots.team.md": page(["lead: ada"]),
  "pages/team/twig.team.md": page(["title: reaches nothing"]),
  "pages/team/branch.team.md": page(["above-slugs:\n  - twig\n  - roots"]),
  "pages/team/loop-a.team.md": page(["above-slugs: loop-b"]),
  "pages/team/loop-b.team.md": page(["above-slugs: loop-a"]),
  "pages/squad/alpha.squad.md": page(["lead: grace"]),

  "pages/job/one.job.md": page(["title: through a written key", "team-slug: roots"]),
  "pages/job/two.job.md": page(["title: through a list", "team-slug: branch"]),
  "pages/job/three.job.md": page(["title: through a subtype", "team-slug: alpha"]),
  "pages/job/four.job.md": page(["title: around a cycle", "team-slug: loop-a"]),
  "pages/job/five.job.md": page(["title: at nothing", "team-slug: absent"]),
  "pages/job/six.job.md": page(["title: through a slug property", "grade: high"]),

  "pages/grade/grade-high.grade.md": page(["grade-slug: high", "tone: warm"]),
  "pages/grade/high.grade.md": page(["grade-slug: taken-by-nobody", "tone: reached by the page's own slug"]),

  "pages/site/here.site.md": page(["slug: here"]),
  "pages/site/bodied.site.md": `${page(["slug: bodied"])}\n# Definition\n\n- **Bodied** — a page holding something under its frontmatter.\n`,

  "pages/page-type/scroll.page-type.md": kind("none"),
  "pages/page-property-definition/scroll-words.page-property-definition.md": property("scroll", "words", ["type: text", "attachment: md"]),
  "pages/page-property-definition/scroll-keeper.page-property-definition.md": property("scroll", "keeper", ["type: text"]),
  "pages/scroll/one.scroll.md": page(["slug: one", "keeper: ada"]),
  "pages/scroll/one.scroll.words.attachment.md": "the words the page does not carry\n",

  "pages/gauge/first.gauge.md": page(["used: 4", "budget: 10", "opened: 5 Jan 2026"]),
  "pages/gauge/second.gauge.md": page(["used: 0", "budget: 20", "opened: 10 Feb 2027"]),
  "pages/gauge/third.gauge.md": page(["used: 3", "budget: 30", "opened: 9 Mar 2026"]),
}

export function plantPages(): { readonly root: string; readonly roots: Roots } {
  const root = mkdtempSync(join("/var/tmp", "page-derive-"))

  for (const [relPath, text] of Object.entries(FILES)) {
    mkdirSync(join(root, relPath, ".."), { recursive: true })
    writeFileSync(join(root, relPath), text)
  }

  return { root, roots: { akasha: root } }
}
