export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export type ComposedPage = {
  readonly fileName: string
  readonly content: string
}

export type ComposedChapterPage = ComposedPage & {
  readonly slug: string
}

export type ChapterPageArgs = {
  readonly pageTypeSlug: string
  readonly storySlug: string
  readonly chapterNumber: number
  readonly chapterTitle: string
  readonly text: string
  readonly wordCount: number
  readonly standingId?: string | null
}

export type StoryPageArgs = {
  readonly pageTypeSlug: string
  readonly storySlug: string
  readonly worldSlug: string
}

const NUMBER_WIDTH = 4

export function chapterSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function frontmatter(lines: readonly string[]): string {
  return ["---", ...lines, "---", ""].join("\n")
}

function keepingStatedId(standingId: string | null | undefined): readonly string[] {
  return standingId == null || standingId === "" ? [] : [`id: ${standingId}`]
}

const FRONTMATTER_BLOCK = /^---\n([\s\S]*?)\n---/
const ID_LINE = /^id:[ \t]*(\S+)[ \t]*$/m

function parseFirstGroup(found: RegExpExecArray | null): string | null {
  const captured = found?.[1]
  return typeof captured === "string" ? captured : null
}

export function statedIdIn(text: string | null): string | null {
  if (text === null) return null
  const front = parseFirstGroup(FRONTMATTER_BLOCK.exec(text))
  if (front === null) return null
  const stated = parseFirstGroup(ID_LINE.exec(front))
  return stated === null ? null : stated.replace(/^["']|["']$/g, "")
}

export function composeChapterPage(args: ChapterPageArgs): ComposedChapterPage {
  const slug = chapterSlug(args.chapterTitle)
  const numbered = String(args.chapterNumber).padStart(NUMBER_WIDTH, "0")
  const body = args.text.endsWith("\n") ? args.text : `${args.text}\n`
  const head = frontmatter([
    `page-type-slug: ${args.pageTypeSlug}`,
    ...keepingStatedId(args.standingId),
    `title: ${JSON.stringify(args.chapterTitle)}`,
    `slug: ${slug}`,
    `partOf: ${args.storySlug}`,
    `position: ${args.chapterNumber}`,
    `ownLength: ${args.wordCount}`,
    "unit: words",
  ])
  return { slug, fileName: `${numbered}-${slug}.md`, content: `${head}${body}` }
}

export function composeStoryPage(args: StoryPageArgs): ComposedPage {
  const head = frontmatter([
    `page-type-slug: ${args.pageTypeSlug}`,
    `title: ${JSON.stringify(humanizeSlug(args.storySlug))}`,
    `slug: ${args.storySlug}`,
    `world: ${args.worldSlug}`,
    "unit: words",
  ])
  return { fileName: `${args.storySlug}.md`, content: `${head}\n` }
}
