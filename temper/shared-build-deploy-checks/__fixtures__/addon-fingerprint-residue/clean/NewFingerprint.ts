// synthetic fixture — project #14325
// A COMPLETED rename: every retired old-author fingerprint token is gone from
// live source. The retired tokens may still appear in COMMENTS (provenance
// prose) — @code65536, CraftStore — and must NOT be flagged, because the
// comment-stripping pass removes them before the scan.
export const meta = {
  author: "Temper",
  name: "TemperCrafting",
}

// A name that merely LOOKS adjacent is not residue: TemperCraftingStore does
// not carry the bytes of CraftStore at all (the port's own brand, then Store).
export const store = "TemperCraftingStore"

// The keep mask, which is the only thing that forgives real retired bytes in
// live source: WritWorthyVars is a byte-locked SavedVariables global standing in
// KEEP_NAME_EXCEPTIONS, so the WritWorthy inside it is not a residue.
export const savedVariables = "WritWorthyVars"
