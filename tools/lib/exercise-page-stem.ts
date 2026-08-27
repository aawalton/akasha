const DIACRITICS = /[̀-ͯ]/g

const APOSTROPHES = /['’]/g

const NOT_ALPHANUMERIC = /[^A-Za-z0-9]+/g

const EDGE_DASHES = /^-+|-+$/g

export function pageStem(title: string): string {
  const stem = title
    .normalize("NFKD")
    .replace(DIACRITICS, "")
    .replace(APOSTROPHES, "")
    .replace(NOT_ALPHANUMERIC, "-")
    .replace(EDGE_DASHES, "")
    .toLowerCase()
  if (stem === "") throw new Error(`\`${title}\` spells no file stem, so nothing names its page`)
  return stem
}
