import { describe, expect, test } from "bun:test"
import { elementTypeOf, readWidgetPayloads } from "./widget-payloads.ts"

const DIR = "native-shell/alanwalton/ios-widget"

const COUNTS = `
import SwiftUI

struct TrackCounts: Decodable {
    let blue: Int
    let green: Int
}

struct ProjectCounts: Decodable {
    let parent: TrackCounts
    let child: TrackCounts
}

enum ProjectCountsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/project-counts")!

    static let previewPayload = ProjectCounts(
        parent: TrackCounts(blue: 2, green: 8),
        child: TrackCounts(blue: 14, green: 67)
    )
}

private struct CountCell: Identifiable {
    let id: Int
    let magenta: TrackCounts
}
`

const sources = (entries: Record<string, string>): ReadonlyMap<string, string> =>
  new Map(Object.entries(entries).map(([name, source]) => [`${DIR}/${name}`, source]))

const names = (payloads: { payloadStructs: readonly { name: string }[] }): readonly string[] =>
  payloads.payloadStructs.map((struct) => struct.name)

describe("widget payloads read from Swift sources", () => {
  test("a feed's payload and everything it holds are members", () => {
    const payloads = readWidgetPayloads(sources({ "ProjectCountsWidget.swift": COUNTS }))
    expect([...names(payloads)].sort()).toEqual(["ProjectCounts", "TrackCounts"])
  })

  test("a struct no feed reaches is not a member", () => {
    const payloads = readWidgetPayloads(sources({ "ProjectCountsWidget.swift": COUNTS }))
    expect(names(payloads)).not.toContain("CountCell")
  })

  test("a feed is recorded whether or not its payload type resolves", () => {
    const payloads = readWidgetPayloads(
      sources({ "X.swift": "enum XFeed: WidgetFeed {\n    static let endpoint = 1\n}\n" })
    )
    expect(payloads.feeds).toHaveLength(1)
    expect(payloads.feeds[0]?.payload).toBeUndefined()
    expect(payloads.payloadStructs).toEqual([])
  })

  test("a payload named by an annotation rather than a call is resolved", () => {
    const payloads = readWidgetPayloads(
      sources({
        "Usage.swift": `
struct ClaudeUsage {
    let avgUsedPct: Int
}

enum ClaudeUsageFeed: WidgetFeed {
    static var previewPayload: ClaudeUsage {
        ClaudeUsage(avgUsedPct: 54)
    }
}
`,
      })
    )
    expect(names(payloads)).toEqual(["ClaudeUsage"])
  })

  test("a payload conforming through an extension is still reached", () => {
    const payloads = readWidgetPayloads(
      sources({
        "Categorize.swift": `
struct Categorization {
    let unreviewed: Int
    let total: Int
    let intake: Int?
}

extension Categorization: Decodable {}

enum CategorizationFeed: WidgetFeed {
    static let previewPayload = Categorization(unreviewed: 19, total: 2951, intake: 246)
}
`,
      })
    )
    expect(names(payloads)).toEqual(["Categorization"])
    expect(payloads.payloadStructs[0]?.fields.map((field) => field.name)).toEqual([
      "unreviewed",
      "total",
      "intake",
    ])
  })

  test("a `let` inside a hand-written decoder is not read as a field", () => {
    const payloads = readWidgetPayloads(
      sources({
        "Inbox.swift": `
struct InboxStoplight: Decodable, Hashable {
    let inbox: String
}

struct InboxStoplightsResponse: Decodable {
    let stoplights: [InboxStoplight]

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([InboxStoplight].self, forKey: .stoplights)
        self.stoplights = decoded
    }
}

enum InboxStoplightsFeed: WidgetFeed {
    static let previewPayload = InboxStoplightsResponse(stoplights: [])
}
`,
      })
    )
    const wrapper = payloads.payloadStructs.find((s) => s.name === "InboxStoplightsResponse")
    expect(wrapper?.fields.map((field) => field.name)).toEqual(["stoplights"])
    expect(names(payloads)).toContain("InboxStoplight")
  })

  test("a directory holding no Swift yields no members rather than a guess", () => {
    expect(readWidgetPayloads(new Map()).payloadStructs).toEqual([])
  })
})

describe("element type", () => {
  test("brackets and optionality are stripped, so an array reaches its element", () => {
    expect(elementTypeOf("[InboxStoplight]")).toBe("InboxStoplight")
    expect(elementTypeOf("TrackCounts?")).toBe("TrackCounts")
    expect(elementTypeOf("  Int  ")).toBe("Int")
  })
})
