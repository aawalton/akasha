import { describe, expect, test } from "bun:test"
import {
  type PageTypeRows,
  countPages,
  type PageNode,
  pageTree,
  type PageTypeRow,
  type PropertyRow,
  type PropertyTypeRow,
  type PageTypeCandidate,
  pageTypeKinds,
  pageTypeRows,
  treeLines,
  VOCABULARY_ID,
} from "../lib/page-tree.ts"

function type(slug: string, extendsSlug: string | null): PageTypeRow {
  return { slug, relPath: `pages/page-type/${slug}.page-type.md`, extendsSlug }
}

function property(key: string, definedOn: string, kind = "text"): PropertyRow {
  const slug = `${definedOn}-${key}`
  return {
    slug,
    relPath: `pages/page-property-definition/${slug}.page-property-definition.md`,
    key,
    definedOn,
    type: kind,
  }
}

function propertyType(
  typeSlug: string,
  kind: string,
  extra: Partial<PropertyTypeRow> = {}
): PropertyTypeRow {
  return {
    typeSlug,
    relPath: `pages/page-property-type/page-property-type-${typeSlug}.page-property-type.md`,
    kind,
    suffix: null,
    of: null,
    value: null,
    ...extra,
  }
}

function pageTypeRowsOf(over: Partial<PageTypeRows> = {}): PageTypeRows {
  return {
    pageTypes: [],
    properties: [],
    propertyTypes: [],
    kindAt: new Map(),
    vocabularyAt: null,
    ...over,
  }
}

function labels(nodes: readonly PageNode[]): readonly string[] {
  return nodes.map((one) => one.label)
}

function under(tree: ReturnType<typeof pageTree>, id: string): PageNode | undefined {
  const walk = (nodes: readonly PageNode[]): PageNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node
      const found = walk(node.children)
      if (found !== undefined) return found
    }
    return undefined
  }
  return walk(tree.roots)
}

function candidate(
  slug: string,
  kind: string | null,
  extendsSlug: string | null,
  relPath = `pages/page-type/${slug}.page-type.md`
): PageTypeCandidate {
  return { slug, relPath, kind, extendsSlug }
}

describe("pageTypeKinds", () => {
  test("the page type page type specifies page types, being one itself", () => {
    expect([...pageTypeKinds([candidate("page-type", "page-type", "domain")])]).toEqual(["page-type"])
  })

  test("a page type extending the page type page type specifies them too", () => {
    const kinds = pageTypeKinds([
      candidate("page-type", "page-type", "domain"),
      candidate("rules-engine-rule-set", "page-type", "page-type"),
      candidate("domain", "page-type", "page"),
    ])
    expect([...kinds].sort()).toEqual(["page-type", "rules-engine-rule-set"])
  })

  test("a page of such a type is a page type, wherever its own type files it", () => {
    const rows = pageTypeRows([
      candidate("page-type", "page-type", "domain"),
      candidate("rules-engine-rule-set", "page-type", "page-type"),
      candidate("email-rule", "rules-engine-rule-set", "page", "pages/rules-engine-rule-set/email-rule.rules-engine-rule-set.md"),
      candidate("email-rule-agent", "page-type", "email-rule"),
    ])
    expect(rows.map((one) => one.slug).sort()).toEqual([
      "email-rule",
      "email-rule-agent",
      "page-type",
      "rules-engine-rule-set",
    ])
    expect(rows.find((one) => one.slug === "email-rule")?.relPath).toBe(
      "pages/rules-engine-rule-set/email-rule.rules-engine-rule-set.md"
    )
  })

  test("a document in the page type folder that no page type specifies is left out", () => {
    const rows = pageTypeRows([
      candidate("page-type", "page-type", "domain"),
      candidate("stray", "readout", "page"),
    ])
    expect(rows.map((one) => one.slug)).toEqual(["page-type"])
  })
})

describe("pageTree", () => {
  test("the one type extending nothing is the root, and the vocabulary stands beside it", () => {
    const tree = pageTree(pageTypeRowsOf({ pageTypes: [type("page", null), type("domain", "page")] }))
    expect(labels(tree.roots)).toEqual(["page", "page property types"])
    expect(tree.roots[1]?.id).toBe(VOCABULARY_ID)
  })

  test("a type extending one that is not there is unreached rather than a second root", () => {
    const tree = pageTree(
      pageTypeRowsOf({ pageTypes: [type("page", null), type("email-rule-agent", "email-rule")] })
    )
    expect(labels(tree.roots)).toEqual(["page", "page property types"])
    expect(tree.unreached).toEqual(["email-rule-agent"])
  })

  test("a page type carries no properties node where it defines none", () => {
    const tree = pageTree(pageTypeRowsOf({ pageTypes: [type("page", null)] }))
    expect(under(tree, "type/page")?.children).toEqual([])
  })

  test("a properties node stands before the subtypes, so what a type carries reads first", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        pageTypes: [type("page", null), type("domain", "page")],
        properties: [property("title", "page")],
      })
    )
    expect(labels(under(tree, "type/page")?.children ?? [])).toEqual(["properties", "domain"])
  })

  test("a property draws its key and carries its type expression beside it", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        pageTypes: [type("page", null)],
        properties: [property("parents", "page", "list(relation-slug, max 30)")],
      })
    )
    const drawn = under(tree, "type/page/properties")?.children[0]
    expect(drawn?.label).toBe("parents")
    expect(drawn?.detail).toBe("list(relation-slug, max 30)")
    expect(drawn?.relPath).toBe("pages/page-property-definition/page-parents.page-property-definition.md")
  })

  test("the vocabulary groups by kind, primitives first and constants last", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        propertyTypes: [
          propertyType("size-lg", "constant", { of: "number", value: "500" }),
          propertyType("option", "record"),
          propertyType("text", "primitive"),
        ],
      })
    )
    expect(labels(under(tree, VOCABULARY_ID)?.children ?? [])).toEqual([
      "primitive",
      "record",
      "constant",
    ])
  })

  test("a record type carries the fields defined on it, exactly as a page type does", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        propertyTypes: [propertyType("option", "record")],
        properties: [property("label", "option"), property("color", "option", "color")],
      })
    )
    const fields = under(tree, "ptype/option/properties")
    expect(labels(fields?.children ?? [])).toEqual(["color", "label"])
  })

  test("a constant reads as the type it narrows and the value it admits", () => {
    const tree = pageTree(
      pageTypeRowsOf({ propertyTypes: [propertyType("size-lg", "constant", { of: "number", value: "500" })] })
    )
    expect(under(tree, "ptype/size-lg")?.detail).toBe("number = 500")
  })

  test("a suffixed type reads as its suffix, which is what names every property of it", () => {
    const tree = pageTree(
      pageTypeRowsOf({ propertyTypes: [propertyType("relation-slug", "primitive", { suffix: "-slug" })] })
    )
    expect(under(tree, "ptype/relation-slug")?.detail).toBe("-slug")
  })

  test("a property defined on a slug that is neither kind of type is said rather than dropped", () => {
    const tree = pageTree(
      pageTypeRowsOf({ pageTypes: [type("page", null)], properties: [property("x", "nowhere")] })
    )
    expect(tree.unreached).toEqual(["nowhere"])
  })

  test("a grouping row is not counted as a page, having no document behind it", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        pageTypes: [type("page", null)],
        properties: [property("title", "page")],
        vocabularyAt: "pages/page-type/page-property-type.page-type.md",
      })
    )
    expect(countPages(tree.roots)).toBe(3)
  })

  test("a slug both a page type and a record answer to draws its fields under each, without collision", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        pageTypes: [type("page", null), type("shared", "page")],
        propertyTypes: [propertyType("shared", "record")],
        properties: [property("width", "shared")],
      })
    )
    const asType = under(tree, "type/shared/properties")?.children[0]
    const asRecord = under(tree, "ptype/shared/properties")?.children[0]
    expect(asType?.label).toBe("width")
    expect(asRecord?.label).toBe("width")
    expect(asType?.id).not.toBe(asRecord?.id)
    expect(tree.unreached).toEqual([])
  })

  test("a grouping row carries no detail, the panel drawing its count from the rows themselves", () => {
    const tree = pageTree(
      pageTypeRowsOf({
        pageTypes: [type("page", null)],
        properties: [property("title", "page")],
        propertyTypes: [propertyType("text", "primitive")],
      })
    )
    expect(under(tree, "type/page/properties")?.detail).toBeNull()
    expect(under(tree, "kind/primitive")?.detail).toBeNull()
    expect(under(tree, VOCABULARY_ID)?.detail).toBeNull()
  })

  test("a cycle between two types leaves both unreached rather than looping", () => {
    const tree = pageTree(
      pageTypeRowsOf({ pageTypes: [type("page", null), type("a", "b"), type("b", "a")] })
    )
    expect(tree.unreached).toEqual(["a", "b"])
    expect(treeLines(tree).at(-1)).toContain("2 slug(s) no root reaches: a, b")
  })
})
