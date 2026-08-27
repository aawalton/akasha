import { describe, expect, it } from "bun:test"
import { forestRow, parentsToFetch, type SeatStanding } from "../lib/seat-forest.ts"

function seat(name: string, frontmatter: Record<string, unknown>, live = true): SeatStanding {
  return { name, frontmatter, live }
}

describe("forestRow", () => {
  it("reads a seat opened by a person as that person's, launched opened", () => {
    expect(
      forestRow(seat("alan", { id: "a", "person-slug": "alan" }))
    ).toEqual({
      id: "a",
      name: "alan",
      parent_agent_id: null,
      principal: "alan",
      launch: "opened",
      mode: null,
      live: true,
    })
  })

  it("reads a seat naming a seat above it as spawned, principal the fleet", () => {
    const read = forestRow(seat("global-worker", { id: "b", "principal-seat-name": "nowhere-at-all" }, false))
    expect(read.principal).toBe("agent")
    expect(read.launch).toBe("spawned")
    expect(read.live).toBe(false)
  })

  it("reads a value that is not a string as absent rather than as its own rendering", () => {
    const read = forestRow(seat("odd", { id: 5, "person-slug": false, "principal-seat-name": { at: 1 } }))
    expect(read.id).toBe("")
    expect(read.principal).toBeNull()
    expect(read.launch).toBeNull()
    expect(read.parent_agent_id).toBeNull()
  })

  it("carries the live flag it was handed rather than reading one off the page", () => {
    expect(forestRow(seat("x", { id: "a", "person-slug": "alan" }, false)).live).toBe(false)
  })

  it("reads the mode the seat states rather than inferring one from how it launched", () => {
    const read = forestRow(seat("y", { id: "a", "person-slug": "alan", "start-mode": "headless" }))
    expect(read.mode).toBe("headless")
    expect(read.launch).toBe("opened")
  })
})

describe("parentsToFetch", () => {
  it("names the seat above one in hand", () => {
    expect(parentsToFetch([seat("child", { "principal-seat-name": "parent" })], new Set())).toEqual(["parent"])
  })

  it("names nothing for a seat a person opened, which has none above it", () => {
    expect(parentsToFetch([seat("chair", { "person-slug": "alan" })], new Set())).toEqual([])
  })

  it("names nothing for a seat already in hand", () => {
    expect(
      parentsToFetch(
        [seat("child", { "principal-seat-name": "parent" }), seat("parent", {})],
        new Set()
      )
    ).toEqual([])
  })

  it("names nothing already asked for, so a seat whose page is gone ends the walk", () => {
    expect(parentsToFetch([seat("child", { "principal-seat-name": "parent" })], new Set(["parent"]))).toEqual([])
  })

  it("asks once for a seat several name", () => {
    expect(
      parentsToFetch(
        [seat("a", { "principal-seat-name": "p" }), seat("b", { "principal-seat-name": "p" }), seat("c", { "principal-seat-name": "p" })],
        new Set()
      )
    ).toEqual(["p"])
  })

  it("names nothing where every seat is a root", () => {
    expect(parentsToFetch([seat("a", {}), seat("b", {})], new Set())).toEqual([])
  })
})
