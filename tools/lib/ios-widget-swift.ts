import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { readoutCatalog } from "../../readouts/readout-catalog.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

const WIDGET_PAGE_TYPE = "readout-widget"

const WIDGET_DIR = "readouts/widget"

export interface WidgetDoc {
  readonly slug: string
  readonly appSlug: string
  readonly groupSlugs: readonly string[]
  readonly caption: string | null
  readonly galleryName: string
  readonly galleryDescription: string
  readonly families: readonly string[]
  readonly kind: string
  readonly feed: string
  readonly opens: string | null
  readonly place: number
}

export interface ReadingDoc {
  readonly slug: string
  readonly label: string | null
  readonly place: number
  readonly wireKey: string
}

export interface ResolvedWidget {
  readonly doc: WidgetDoc
  readonly extensionDir: string
  readonly stem: string
  readonly readings: readonly ReadingDoc[]
}

const FAMILY_CASE: Readonly<Record<string, string>> = {
  small: ".systemSmall",
  medium: ".systemMedium",
  large: ".systemLarge",
}

function read(path: string): ReturnType<typeof parseFrontmatter> {
  return parseFrontmatter(readFileSync(path, "utf8"))
}

function pascal(kebab: string): string {
  return kebab
    .split("-")
    .filter((part) => part !== "")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function widgetDoc(slug: string): WidgetDoc {
  const fm = read(join(akashaRoot(), WIDGET_DIR, `${slug}.${WIDGET_PAGE_TYPE}.md`))
  const need = (key: string): string => {
    const value = textField(fm, key)
    if (value === null) throw new Error(`${WIDGET_PAGE_TYPE} \`${slug}\` states no \`${key}\``)
    return value
  }
  const groupSlugs = listField(fm, "group-slugs")
  if (groupSlugs.length === 0) {
    throw new Error(`${WIDGET_PAGE_TYPE} \`${slug}\` names no group`)
  }
  return {
    slug,
    appSlug: need("app-slug"),
    groupSlugs,
    caption: textField(fm, "caption"),
    galleryName: need("gallery-name"),
    galleryDescription: need("gallery-description"),
    families: listField(fm, "families"),
    kind: need("kind"),
    feed: need("feed"),
    opens: textField(fm, "opens"),
    place: Number(need("place")),
  }
}

function extensionDir(root: string, appSlug: string): string {
  const fm = read(join(root, "pages", "ios-app", `${appSlug}.ios-app.md`))
  const shell = textField(fm, "native-shell-repo-path")
  if (shell === null) throw new Error(`ios-app \`${appSlug}\` states no \`native-shell-repo-path\``)
  return `${shell}/ios-widget`
}

function readingsOfGroups(groups: readonly string[]): readonly ReadingDoc[] {
  const wanted = new Set(groups)
  const found: ReadingDoc[] = []
  for (const [slug, row] of readoutCatalog().readouts) {
    if (!row.groupSlugs.some((group) => wanted.has(group))) continue
    if (row.wireKey === null) {
      throw new Error(
        `readout \`${slug}\` states no \`wire-key\`, so nothing says which key the widget ` +
          "already shipped finds its circle under"
      )
    }
    found.push({ slug, label: row.label, place: row.place ?? 0, wireKey: row.wireKey })
  }
  return [...found].sort((a, b) => a.place - b.place || a.slug.localeCompare(b.slug))
}

export function resolveWidget(root: string, slug: string): ResolvedWidget {
  const doc = widgetDoc(slug)
  const appStem = doc.appSlug.replace(/-ios$/, "")
  if (!doc.slug.startsWith(`${appStem}-`)) {
    throw new Error(`ios-widget \`${slug}\` does not stand under its app stem \`${appStem}\``)
  }
  return {
    doc,
    extensionDir: extensionDir(root, doc.appSlug),
    stem: pascal(doc.slug.slice(appStem.length + 1)),
    readings: readingsOfGroups(doc.groupSlugs),
  }
}

function families(doc: WidgetDoc): string {
  return doc.families.map((family) => FAMILY_CASE[family] ?? family).join(", ")
}

function widgetURL(doc: WidgetDoc, indent: string): string {
  if (doc.opens === null) return ""
  return `\n${indent}.widgetURL(\n${indent}    URL(\n${indent}        string:\n${indent}            "${doc.opens}"\n${indent}    )\n${indent})`
}

export function ringWidgetSwift(resolved: ResolvedWidget): string {
  const { doc, stem, readings } = resolved
  const [reading] = readings
  if (reading === undefined || readings.length !== 1) {
    throw new Error(
      `ios-widget \`${doc.slug}\` draws ${readings.length} readings, and this emitter states the ` +
        "one-ring form only; the strip and grid forms are not written yet"
    )
  }
  const key = reading.wireKey
  const upper = key.toUpperCase()
  const ring = `${pascal(key)}Ring`
  const caption = doc.caption ?? reading.label ?? doc.galleryName
  return `// Generated from akasha:${WIDGET_DIR}/${doc.slug}.${WIDGET_PAGE_TYPE}.md by \`ops mobile widget-emit\`. Change the document, not this file.
import SwiftUI
import WidgetKit

private let ${upper}_KEY = "${key}"

private let ${upper}_CAPTION = "${caption}"

struct ${stem}Payload: Decodable {
    let stoplights: [HabitStoplight]

    init(stoplights: [HabitStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([HabitStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one stoplight, got none"
            )
        }
        stoplights = decoded
    }

    var drawn: HabitStoplight? {
        stoplights.first { $0.habit == ${upper}_KEY }
    }
}

enum ${stem}Feed: WidgetFeed {
    static let endpoint = URL(string: "${doc.feed}")!

    static let previewPayload = ${stem}Payload(
        stoplights: [
            HabitStoplight(
                habit: ${upper}_KEY, tier: .yellow, reading: "2.5", nextTier: .green,
                progress: 0.50, label: ${upper}_CAPTION
            )
        ]
    )
}

struct ${stem}HomeView: View {
    let entry: FeedEntry<${stem}Payload>

    var body: some View {
        Group {
            switch entry.state {
            case .refused:
                RefusedView()
            case .neverLoaded:
                NeverLoadedView()
            case .loaded:
                ring
                    .padding(LARGE_RING_TILE_PADDING)
                    .containerBackground(for: .widget) { Color(.systemBackground) }
            }
        }${widgetURL(doc, "        ")}
    }

    private var drawn: HabitStoplight? {
        guard case .loaded(let payload) = entry.state, let circle = payload.drawn else { return nil }
        if circle.tier == .black, circle.nextTier == nil, circle.progress == nil { return nil }
        return circle
    }

    private var caption: String? {
        guard case .loaded(let payload) = entry.state else { return ${upper}_CAPTION }
        return payload.drawn?.label ?? ${upper}_CAPTION
    }

    private var ring: some View {
        ${ring}(
            tier: drawn?.tier,
            reading: drawn?.reading,
            caption: caption,
            nextTier: drawn?.nextTier,
            progress: drawn?.progress
        )
    }
}

struct ${stem}Widget: Widget {
    let kind = "${doc.kind}"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<${stem}Feed>()) { entry in
            ${stem}HomeView(entry: entry)
        }
        .configurationDisplayName("${doc.galleryName}")
        .description("${doc.galleryDescription}")
        .supportedFamilies([${families(doc)}])
    }
}
`
}

export function emittedPath(resolved: ResolvedWidget): string {
  return `${resolved.extensionDir}/${resolved.stem}Widget.swift`
}
