import { describe, expect, test } from "bun:test"
import { type Comment, commentsIn, languageOf, UnscannableFile, without } from "../code-comment/comments.ts"
import { classify, formsFrom, FormUnrecognised, handlesIn } from "../code-comment/forms.ts"
import { strip } from "../code-comment/strip.ts"

const LIST = `---
slug: code-comment-forms
---

# List

- **shebang** — \`#!\` on the first line.
- **expect-error** — \`@ts-expect-error\`.
- **eslint suppression** — \`eslint-disable\`.
- **biome suppression** — \`biome-ignore\`.
- **shellcheck directive** — \`shellcheck\` and each of its directives.
- **js type** — JSDoc \`@type\` in a \`.js\` file.
- **js satisfies** — JSDoc \`@satisfies\` in a \`.js\` file.
- **deprecation** — \`@deprecated\`.
- **source map** — \`sourceMappingURL\`.

# Rules

## Form Approval

**Not a member.**
`

const FORMS = formsFrom(LIST)

function raws(relPath: string, body: string): readonly string[] {
  return commentsIn(relPath, body).map((comment) => comment.raw)
}

function only(relPath: string, body: string): Comment {
  const found = commentsIn(relPath, body)
  if (found.length !== 1) throw new Error(`${found.length} comments where the vector holds one`)
  return found[0] as Comment
}

describe("what is a comment and what only looks like one", () => {
  test("a slash pair inside a string opens nothing", () => {
    expect(raws("a.ts", `const url = "http://x//y"\nconst also = '// not this'\n`)).toEqual([])
  })

  test("a slash pair inside a template opens nothing, and one inside a substitution does", () => {
    expect(raws("a.ts", "const t = `a ${ \"b\" } // c`\n")).toEqual([])
    expect(raws("a.ts", "const t = `a ${ /* c */ 1 } b`\n")).toEqual(["/* c */"])
  })

  test("a slash pair inside a regex opens nothing, and division does not swallow the line", () => {
    expect(raws("a.ts", "const r = /a\\/\\/b/\n")).toEqual([])
    expect(raws("a.ts", "const d = a / b // real\n")).toEqual(["// real"])
  })

  test("a block comment is reported at the line it opens on", () => {
    const found = commentsIn("a.ts", "const a = 1\n/**\n * two\n */\nconst b = 2\n")
    expect(found.map((comment) => comment.line)).toEqual([2])
  })

  test("a hash inside a quote, a parameter expansion or a heredoc opens nothing", () => {
    const body = ['echo "#"', "echo '#'", 'echo "${#list[@]}"', "cat <<'EOF'", "# not a comment", "EOF", "x=1 # a comment"].join("\n")
    expect(raws("a.sh", body)).toEqual(["# a comment"])
  })

  test("a dash pair opens a sql comment inside a dollar-quoted body as much as outside one", () => {
    const body = "select 1; -- outer\ncreate function f() returns int language plpgsql as $$\nbegin\n  -- inner\n  return 1;\nend;\n$$;\n"
    expect(raws("a.sql", body)).toEqual(["-- outer", "-- inner"])
    expect(commentsIn("a.sql", body).map((comment) => comment.line)).toEqual([1, 4])
  })

  test("a dash pair inside a sql string or a quoted identifier opens nothing", () => {
    expect(raws("a.sql", "select '-- not this', \"-- nor this\";\n")).toEqual([])
  })

  test("a lua long comment goes whole, and a long string that is not one is left alone", () => {
    const body = "--[[ two\nlines ]]\nlocal s = [[ -- not this ]]\nlocal x = 1 -- real\n"
    expect(raws("a.lua", body)).toEqual(["--[[ two\nlines ]]", "-- real"])
  })

  test("a regex literal is read as one where a comment stands directly above it", () => {
    expect(raws("a.ts", "const list = [\n  // why\n  /^a\\/b$/,\n  'x // y',\n]\n")).toEqual(["// why"])
    expect(raws("a.ts", "// why\nreturn /Safari\\//.test(ua)\n")).toEqual(["// why"])
  })

  test("a jsx closing tag opens no regex, so what follows it is still read", () => {
    expect(raws("a.tsx", "const el = <div>{x}</div> // real\n")).toEqual(["// real"])
  })

  test("a file kind nothing knows is refused rather than counted as clean", () => {
    expect(() => languageOf("a.kt")).toThrow(UnscannableFile)
  })

  test("a rust lifetime does not swallow the comment standing after it", () => {
    expect(raws("a.rs", "fn f<'a>(s: &str) -> u8 { 1 } // real\n")).toEqual(["// real"])
    expect(raws("a.ts", "fn f<'a>(s: &str) -> u8 { 1 } // real\n")).toEqual([])
  })

  test("a nested rust block comment goes whole rather than closing at the inner end", () => {
    expect(raws("a.rs", "/* a /* b */ c */\nlet x = 1;\n")).toEqual(["/* a /* b */ c */"])
  })

  test("a slash pair inside a rust string or raw string opens nothing", () => {
    expect(raws("a.rs", 'let s = "a // b";\nlet t = r#"c // d"#;\n')).toEqual([])
    expect(raws("a.rs", "let c = '/';\nlet d = 1; // real\n")).toEqual(["// real"])
  })

  test("a css block comment is read and a url's slash pair is not", () => {
    expect(raws("a.css", "/* why */\na { background: url(http://x//y); }\n")).toEqual(["/* why */"])
  })

  test("a swift comment is read on either side of a division", () => {
    expect(raws("a.swift", "let d = a / b // real\n/* block */\n")).toEqual(["// real", "/* block */"])
  })

  test("a hash opens a comment in a systemd unit and in a config file", () => {
    expect(raws("a.timer", "# why\nOnCalendar=daily\n")).toEqual(["# why"])
    expect(raws("a.conf", "# why\nset -g mouse on\n")).toEqual(["# why"])
  })

  test("taking the comments out leaves the rest of the file untouched", () => {
    const body = "const a = 1 // one\n/* two */\nconst b = 2\n"
    expect(without(body, commentsIn("a.ts", body))).toBe("const a = 1 \n\nconst b = 2\n")
  })
})

describe("which comments the forms admit", () => {
  test("a directive standing alone is the form; the same words inside prose are not", () => {
    const directive = only("a.ts", "// @ts-expect-error the stand-in is narrower on purpose\n")
    const prose = only("a.ts", "/**\n * Why this file uses @ts-expect-error at all.\n *\n * Because the constructor is wider.\n */\n")
    expect(classify(directive, "a.ts", FORMS)).toBe("form")
    expect(classify(prose, "a.ts", FORMS)).toBe("prose")
  })

  test("a shebang is a form on the first line and a candidate anywhere else", () => {
    const first = only("a.sh", "#!/usr/bin/env bash\necho 1\n")
    const later = only("a.sh", "echo 1\n#!/usr/bin/env bash\n")
    expect(classify(first, "a.sh", FORMS)).toBe("form")
    expect(classify(later, "a.sh", FORMS)).toBe("candidate")
  })

  test("a form naming a tool's whole directive set admits each of them", () => {
    expect(classify(only("a.sh", "# shellcheck disable=SC2001\n"), "a.sh", FORMS)).toBe("form")
    expect(classify(only("a.sh", "# shellcheck source=./lib.sh\n"), "a.sh", FORMS)).toBe("form")
    expect(classify(only("a.sh", "# shellcheck shell=bash\n"), "a.sh", FORMS)).toBe("form")
  })

  test("a directive the list does not name stays a candidate beside its neighbour that it does", () => {
    expect(classify(only("a.ts", "// @ts-expect-error narrower on purpose\n"), "a.ts", FORMS)).toBe("form")
    expect(classify(only("a.ts", "// @ts-ignore\n"), "a.ts", FORMS)).toBe("candidate")
  })

  test("a marker still signals where the comment's own syntax leaves punctuation in front of it", () => {
    expect(classify(only("a.ts", '/// <reference lib="dom" />\n'), "a.ts", FORMS)).toBe("candidate")
    expect(classify(only("a.ts", "//# sourceURL=a.js\n"), "a.ts", FORMS)).toBe("candidate")
  })

  test("a comment carrying an instruction is told apart from one carrying an explanation", () => {
    const instruction = only("a.ts", "// Never call this from the hook.\n")
    const explanation = only("a.ts", "// The hook calls it once per turn.\n")
    expect(classify(instruction, "a.ts", FORMS)).toBe("instruction")
    expect(classify(explanation, "a.ts", FORMS)).toBe("prose")
  })

  test("the admitted set is read off the list rather than restated", () => {
    expect(handlesIn(LIST)).toEqual([
      "shebang",
      "expect-error",
      "eslint suppression",
      "biome suppression",
      "shellcheck directive",
      "js type",
      "js satisfies",
      "deprecation",
      "source map",
    ])
    expect(() => formsFrom(LIST.replace("**shebang**", "**hash-bang**"))).toThrow(FormUnrecognised)
  })
})

describe("what taking them out leaves behind", () => {
  test("a comment on a line of its own takes the line with it", () => {
    expect(strip("a.ts", "const a = 1\n// why\nconst b = 2\n", FORMS)).toBe("const a = 1\nconst b = 2\n")
  })

  test("a comment after code leaves no trailing space where it stood", () => {
    expect(strip("a.ts", "const a = 1 // why\n", FORMS)).toBe("const a = 1\n")
  })

  test("a block over several lines goes whole, and the gap it leaves closes to one line", () => {
    const body = "const a = 1\n\n/**\n * why\n */\n\nconst b = 2\n"
    expect(strip("a.ts", body, FORMS)).toBe("const a = 1\n\nconst b = 2\n")
  })

  test("blank lines the comments did not make are left where they stand", () => {
    const body = "const y = `a\n\n\nb`\n// why\nconst z = 1\n"
    expect(strip("a.ts", body, FORMS)).toBe("const y = `a\n\n\nb`\nconst z = 1\n")
  })

  test("a comment blank on both sides closes to one blank line rather than two", () => {
    expect(strip("a.ts", "const a = 1\n\n// why\n\nconst b = 2\n", FORMS)).toBe("const a = 1\n\nconst b = 2\n")
  })

  test("a file that is all comment strips to nothing, and strips to nothing again", () => {
    const once = strip("a.ts", "// why\n// more\n", FORMS)
    expect(once).toBe("")
    expect(strip("a.ts", once, FORMS)).toBe("")
  })

  test("a form stays where it stands", () => {
    const body = "#!/usr/bin/env bash\n# why\necho 1\n"
    expect(strip("a.sh", body, FORMS)).toBe("#!/usr/bin/env bash\necho 1\n")
  })

  test("a file with nothing to take out comes back byte for byte", () => {
    const blankFirst = "\nconst a = 1\n"
    expect(strip("a.ts", blankFirst, FORMS)).toBe(blankFirst)
    expect(strip("a.ts", "const a = 1\n\n\n", FORMS)).toBe("const a = 1\n\n\n")
    expect(strip("a.sh", "#!/usr/bin/env bash\necho 1\n", FORMS)).toBe("#!/usr/bin/env bash\necho 1\n")
  })
})
