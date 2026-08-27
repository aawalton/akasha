import { inputError } from "./exit.ts"
import { readStdinOrFile } from "./read-stdin-or-file.ts"

export async function resolveMessageContent(opts: {
  readonly contentFlag: string | undefined
  readonly contentFile: string | undefined
}): Promise<string> {
  let text: string
  if (opts.contentFile !== undefined) {
    text = await readStdinOrFile(opts.contentFile)
  } else if (opts.contentFlag !== undefined) {
    if (opts.contentFlag === "-") {
      throw inputError(
        "`--content -` does not read stdin — the literal '-' would be sent as the whole message. Use `--content-file -` to read from stdin, or pass the message text directly to --content."
      )
    }
    text = opts.contentFlag
  } else {
    throw inputError(
      "one of --content or --content-file is required (use `--content-file -` to read from stdin)"
    )
  }

  if (text.trim().length === 0) {
    throw inputError(
      "resolved message content is empty — refusing to send an empty message (check the --content / --content-file source or the stdin pipe)."
    )
  }

  return text
}
