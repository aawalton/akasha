import { readFileSync } from "node:fs"
import { PAGE_BODY_SHAPE_GLOBS, PAGE_TYPE_GLOBS } from "../../page/page-types.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { type Roots } from "../../page/page"
import { isInside, normalizeAbsolute } from "../../repo/path/path"
import { AKASHA, targetRepo, targetRoot } from "../../repo/roots/roots"
import { proseOnly } from "./markdown.ts"

const SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i
const LINK_RE = /\]\(([^)]+)\)/g

const SLOT_RE = /^\{[^{}]*\}$/

export type LinkStatus =
  | "ok"
  | "missing"
  | "missing-anchor"
  | "missing-quote"
  | "outside-roots"
  | "external"
  | "empty"
  | "slot"

export type LinkRefusal =
  | { readonly slug: "link-outside-roots"; readonly resolved: string; readonly roots: string }
  | { readonly slug: "link-target-absent"; readonly resolved: string }
  | { readonly slug: "link-quote-absent"; readonly resolved: string }
  | { readonly slug: "link-anchor-absent"; readonly resolved: string; readonly anchor: string }

export interface ResolvedLink {
  readonly href: string
  readonly text: string | null
  readonly status: LinkStatus
  readonly absolutePath: string | null
  readonly refusal: LinkRefusal | null
  readonly line: number
}

export type BrokenLink = ResolvedLink & { readonly refusal: LinkRefusal }

export function linkWords(link: BrokenLink, where: string, instructionsRoot: string): string {
  const said = link.refusal
  const href = link.href
  const resolved = said.resolved
  if (said.slug === "link-outside-roots")
    return refusalText(
      "link-outside-roots",
      { where, href, resolved, roots: said.roots },
      instructionsRoot
    )
  if (said.slug === "link-target-absent")
    return refusalText("link-target-absent", { where, href, resolved }, instructionsRoot)
  if (said.slug === "link-quote-absent")
    return refusalText("link-quote-absent", { where, href, resolved }, instructionsRoot)
  return refusalText(
    "link-anchor-absent",
    { where, href, resolved, anchor: said.anchor },
    instructionsRoot
  )
}

export function extractLinks(
  markdown: string
): readonly { href: string; text: string | null; line: number }[] {
  const found: { href: string; text: string | null; line: number }[] = []
  const raw = markdown.split("\n")
  proseOnly(markdown)
    .split("\n")
    .forEach((line, index) => {
      for (const match of line.matchAll(LINK_RE)) {
        if (match[1] === undefined) continue
        const close = match.index ?? 0
        const open = line.lastIndexOf("[", close)
        const source = raw[index] ?? line
        found.push({
          href: match[1],
          text: open < 0 ? null : source.slice(open + 1, close),
          line: index + 1,
        })
      }
    })
  return found
}

export function linkFrom(fromRelPath: string, toRelPath: string): string {
  const fromDir = fromRelPath.split("/").slice(0, -1)
  const to = toRelPath.split("/")
  let shared = 0
  while (shared < fromDir.length && shared < to.length - 1 && fromDir[shared] === to[shared]) {
    shared += 1
  }
  return [...fromDir.slice(shared).map(() => ".."), ...to.slice(shared)].join("/")
}

export interface LinkInput {
  readonly relPath: string
  readonly body: string
  readonly roots: Roots
  readonly exists: (absolutePath: string) => boolean
  readonly readAt: (absolutePath: string) => string | null
}

export function readFromDisk(absolutePath: string): string | null {
  try {
    return readFileSync(absolutePath, "utf8")
  } catch {
    return null
  }
}

function anchorOf(href: string): string | null {
  const trimmed = href.trim()
  const hash = trimmed.indexOf("#")
  if (hash < 0) return null
  const anchor = trimmed.slice(hash + 1).split("?")[0] ?? ""
  return anchor === "" ? null : anchor
}

function headingSlugs(body: string): ReadonlySet<string> {
  const slugs = new Set<string>()
  for (const line of proseOnly(body).split("\n")) {
    const heading = /^#{1,6}\s+(.*?)\s*$/.exec(line)?.[1]
    if (heading === undefined) continue
    slugs.add(
      heading
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s/g, "-")
    )
  }
  return slugs
}

const QUOTE_RE = /^\s*["“]([^]*\S[^]*)["”]\s*$/

function quotedText(text: string | null): string | null {
  if (text === null) return null
  return QUOTE_RE.exec(text)?.[1] ?? null
}

function collapsed(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

function resolveOne(
  href: string,
  text: string | null,
  line: number,
  fromDir: string,
  selfPath: string,
  template: boolean,
  input: LinkInput
): ResolvedLink {
  const target = href.trim().split("#")[0]?.split("?")[0] ?? ""
  const anchor = anchorOf(href)
  const quote = quotedText(text)
  if (template && SLOT_RE.test(href.trim())) {
    return { href, text, status: "slot", absolutePath: null, refusal: null, line }
  }
  if (SCHEME_RE.test(target)) {
    return { href, text, status: "external", absolutePath: null, refusal: null, line }
  }
  if (target === "" && anchor === null) {
    return { href, text, status: "empty", absolutePath: null, refusal: null, line }
  }
  const absolutePath =
    target === ""
      ? selfPath
      : target.startsWith("/")
        ? normalizeAbsolute(target)
        : normalizeAbsolute(`${fromDir}/${target}`)
  const declared = Object.entries(input.roots)
    .filter(([repo, root]) => repo !== "target" && root !== undefined)
    .map(([, root]) => root as string)
  if (!declared.some((root) => isInside(root, absolutePath))) {
    return {
      href,
      text,
      status: "outside-roots",
      absolutePath,
      refusal: { slug: "link-outside-roots", resolved: absolutePath, roots: declared.join(", ") },
      line,
    }
  }
  if (!input.exists(absolutePath)) {
    return {
      href,
      text,
      status: "missing",
      absolutePath,
      refusal: { slug: "link-target-absent", resolved: absolutePath },
      line,
    }
  }
  const body = anchor === null && quote === null ? null : input.readAt(absolutePath)
  if (body === null) return { href, text, status: "ok", absolutePath, refusal: null, line }
  if (quote !== null && !collapsed(body).includes(collapsed(quote))) {
    return {
      href,
      text,
      status: "missing-quote",
      absolutePath,
      refusal: { slug: "link-quote-absent", resolved: absolutePath },
      line,
    }
  }
  if (anchor === null) return { href, text, status: "ok", absolutePath, refusal: null, line }
  if (headingSlugs(body).has(anchor.toLowerCase())) {
    return { href, text, status: "ok", absolutePath, refusal: null, line }
  }
  return {
    href,
    text,
    status: "missing-anchor",
    absolutePath,
    refusal: { slug: "link-anchor-absent", resolved: absolutePath, anchor },
    line,
  }
}

export function resolveLinks(input: LinkInput): readonly ResolvedLink[] {
  const segments = input.relPath.split("/")
  const fromDir = `${targetRoot(input.roots)}/${segments.slice(0, -1).join("/")}`
  const selfPath = `${targetRoot(input.roots)}/${input.relPath}`
  const shapes = [...PAGE_TYPE_GLOBS, ...PAGE_BODY_SHAPE_GLOBS]
  const template =
    targetRepo(input.roots) === AKASHA &&
    shapes.some((glob) => new Bun.Glob(glob).match(input.relPath))
  return extractLinks(input.body).map((l) =>
    resolveOne(l.href, l.text, l.line, fromDir, selfPath, template, input)
  )
}

export function unresolved(links: readonly ResolvedLink[]): readonly BrokenLink[] {
  return links.filter((l): l is BrokenLink => l.refusal !== null)
}
