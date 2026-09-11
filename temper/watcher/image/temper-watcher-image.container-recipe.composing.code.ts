import { basename, dirname } from "node:path"
import {
  type Held,
  pageOf,
} from "akasha/infrastructure/container-image/recipe-page/recipe-page.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { slugsIn, textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const MODULE = "module"

const CRATE = "rust-crate"

const RUST_MODULE = "rust-module"

const TRAY = "watcher-tray"

const WORKER = "watcher-worker"

const CARRIER = "carried-file"

const CODE = "code"

const RUST = "rust"

const ICON = "icon"

const MANIFEST = "cargo-manifest"

const BUILD_SCRIPT = "cargo-build-script"

const MODULES = "modules"

const MODULE_NAME = "module-name"

const MAIN = "main"

const SRC = "./src/"

const CARRIED_AT = "./carried-file.ts"

const CARRIER_AT = "carrier.json"

export type Copied = {
  readonly from: string
  readonly to: string
}

function moduleCopiesIn(given: string | Reading, crate: Held): readonly Copied[] {
  const found: Copied[] = []
  for (const slug of slugsIn(crate.value[MODULES])) {
    const page = pageOf(given, RUST_MODULE, slug)
    const name = textAt(page.value, exportedAs(MODULE_NAME))
    if (name === null) {
      throw new Error(`\`${page.path}\` states no module name, so Cargo reads that module by none`)
    }
    found.push({ from: fileOf(given, page, RUST_MODULE, RUST), to: `${SRC}${name}.rs` })
  }
  found.sort((one, two) => (one.to < two.to ? -1 : one.to > two.to ? 1 : 0))
  const first = `${SRC}${MAIN}.rs`
  return [...found.filter((one) => one.to === first), ...found.filter((one) => one.to !== first)]
}

export function crateCopiesIn(given: string | Reading): readonly Copied[] {
  const crate = pageOf(given, CRATE, TRAY)
  const manifest = fileOf(given, crate, CRATE, MANIFEST)
  const script = fileOf(given, crate, CRATE, BUILD_SCRIPT)
  return [
    { from: manifest, to: `./${basename(manifest)}` },
    { from: script, to: `./${basename(script)}` },
    ...moduleCopiesIn(given, crate),
  ]
}

function copyLine(one: Copied): string {
  return `COPY ${one.from} ${one.to}`
}

function runIcon(name: string): string {
  return [
    `RUN mkdir -p /out && bun -e 'const { carriedIn } = await import("${CARRIED_AT}")`,
    `const one = carriedIn(await Bun.file("${CARRIER_AT}").text(), "${name}")`,
    'await Bun.write("/out/" + one.name, one.bytes)\'',
  ].join("; ")
}

function iconStage(carrier: string, icon: string): readonly string[] {
  return [
    "FROM oven/bun:1.3.14-alpine AS icon-builder",
    "WORKDIR /icon",
    "# The crate's icon is a page property carried beside its page as base64 json, so no",
    "# file in akasha holds a NUL byte. This stage writes the bytes back out under the name",
    "# the carrier states, and carried-file refuses where the sha256 it states is not what",
    "# came out, which fails this RUN rather than baking a wrong icon.",
    `COPY ${carrier} ${CARRIED_AT}`,
    `COPY ${icon} ./${CARRIER_AT}`,
    runIcon(basename(icon)),
    "",
  ]
}

function rustStage(folder: string, copies: readonly Copied[]): readonly string[] {
  return [
    "FROM rust:1.95-alpine3.23 AS rust-builder",
    "ARG COMMIT_SHA",
    "ENV COMMIT_SHA=${COMMIT_SHA}",
    "RUN apk add --no-cache mingw-w64-gcc musl-dev",
    "RUN rustup target add x86_64-pc-windows-gnu",
    "WORKDIR /build",
    `# The crate is held as pages under ${folder}. These COPY lines are`,
    "# the seam rust-crate calls for: each module is copied to the name Cargo reads, which",
    "# is the `moduleName` its page states. The icon comes from icon-builder, which writes",
    "# the bytes the crate's `icon` property carries to the name include_bytes! reads.",
    ...copies.map(copyLine),
    "COPY --from=icon-builder /out ./assets",
    "RUN mkdir -p .cargo && \\",
    "    echo '[target.x86_64-pc-windows-gnu]' > .cargo/config.toml && \\",
    "    echo 'linker = \"x86_64-w64-mingw32-gcc\"' >> .cargo/config.toml && \\",
    "    echo 'ar = \"x86_64-w64-mingw32-ar\"' >> .cargo/config.toml",
    "RUN cargo build --target=x86_64-pc-windows-gnu --release",
    "",
  ]
}

function workerStage(worker: string): readonly string[] {
  return [
    "FROM oven/bun:1.3.14-alpine AS worker-builder",
    "ARG COMMIT_SHA",
    "ENV COMMIT_SHA=${COMMIT_SHA}",
    "WORKDIR /workspace",
    "COPY . .",
    "RUN bun install --frozen-lockfile",
    "RUN mkdir -p /out && \\",
    "    bun build --compile --target=bun-windows-x64 \\",
    '      --define "__WATCHER_VERSION__=\\"${COMMIT_SHA}\\"" \\',
    "      --outfile=/out/temper-watcher-worker.exe \\",
    `      ${worker} && \\`,
    '    echo "${COMMIT_SHA}" > /out/version.txt',
    "",
  ]
}

function finalStage(): readonly string[] {
  return [
    "FROM alpine:3.22 AS final",
    "RUN mkdir -p /build",
    "COPY --from=rust-builder /build/target/x86_64-pc-windows-gnu/release/temper-watcher.exe" +
      " /build/temper-watcher.exe",
    "COPY --from=worker-builder /out/temper-watcher-worker.exe /build/temper-watcher-worker.exe",
    "COPY --from=worker-builder /out/version.txt /build/version.txt",
  ]
}

export function bodyIn(given: string | Reading): string {
  const carrier = fileOf(given, pageOf(given, MODULE, CARRIER), MODULE, CODE)
  const crate = pageOf(given, CRATE, TRAY)
  const icon = fileOf(given, crate, CRATE, ICON)
  const worker = fileOf(given, pageOf(given, MODULE, WORKER), MODULE, CODE)
  const lines = [
    ...iconStage(carrier, icon),
    ...rustStage(dirname(crate.path), crateCopiesIn(given)),
    ...workerStage(worker),
    ...finalStage(),
  ]
  return `${lines.join("\n")}\n`
}
