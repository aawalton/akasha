// synthetic fixture — project #14325
// A partial rename: this source was supposed to drop the retired old-author
// fingerprint token, but one site survived in a string literal below.
// (This comment mentions @code65536 in prose — the comment-stripping pass must
//  NOT flag it; only the live string-literal site is residue.)
export const meta = {
  // real residue: a retired token left behind in a live string literal
  author: "@code65536",
  name: "TemperCrafting",
}
