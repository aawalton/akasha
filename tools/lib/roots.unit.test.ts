import { readdirSync } from "node:fs"
import { expect, test } from "bun:test"
import { ownRepoRoot, REPOS } from "../../repo/roots/roots"

const REPO_PAGES = "pages/repo"

const ENDING = "-repo"

test("some repository is named, so nothing downstream reads an empty set as an answer", () => {
  expect(REPOS.length).toBeGreaterThan(0)
})

test("every repo page standing in the directory names a repository", () => {
  const stems = readdirSync(`${ownRepoRoot()}/${REPO_PAGES}`)
    .filter((one) => one.endsWith(".md"))
    .map((one) => (one.indexOf(".") <= 0 ? one : one.slice(0, one.indexOf("."))))
    .filter((one) => one.endsWith(ENDING))
  expect(stems.length).toBeGreaterThan(0)
  for (const stem of stems) {
    expect(REPOS).toContain(stem.slice(0, -ENDING.length))
  }
})
