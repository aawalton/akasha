import { describe, expect, test } from "bun:test"
import { binaryOfSegment, commandBinaries, commandSegments } from "./shell-command-binaries.ts"

describe("commandBinaries — reads past the first line", () => {
  test("a binary invoked on a later line is seen", () => {
    expect(commandBinaries("set -e\ncurl -sf https://example.test\n")).toEqual(["curl"])
  })

  test("a binary behind `then` is seen", () => {
    expect(commandBinaries('if [ -f x ]; then curl -sf "$URL"; fi')).toEqual(["curl"])
  })

  test("a binary inside a brace group is seen", () => {
    expect(commandBinaries('[ -f x ] || { wget -q "$URL"; exit 1; }')).toEqual(["wget"])
  })

  test("a binary inside a command substitution is seen", () => {
    expect(commandBinaries('MANIFEST=$(curl -sf "$URL")')).toEqual(["curl"])
    expect(commandBinaries("echo $(kubectl version)")).toEqual(["kubectl"])
  })

  test("every command of a multi-line script is read, in order", () => {
    const script = ["set -e", "mkfifo /tmp/f", "tee /tmp/log", "rm -f /tmp/f"].join("\n")
    expect(commandBinaries(script)).toEqual(["mkfifo", "tee", "rm"])
  })
})

describe("commandBinaries — what is not a command", () => {
  test("a heredoc body is not read as shell", () => {
    const script = [
      "cat <<ENSURE | kubectl apply -f -",
      "apiVersion: batch/v1",
      "curl -sf http://not-a-command-here",
      "ENSURE",
      "kubectl wait --for=condition=complete job/ensure",
    ].join("\n")
    expect(commandBinaries(script)).toEqual(["cat", "kubectl", "kubectl"])
  })

  test("a quoted multi-line argument is not read as shell", () => {
    const script = [
      'bun -e "',
      "const mod = await import('/workspace/rbac.ts');",
      "function inlineArray(arr) { return arr.join(); }",
      "console.log(mod);",
      '" > /tmp/rbac.yaml',
    ].join("\n")
    expect(commandBinaries(script)).toEqual(["bun"])
  })

  test("a comment is not a command", () => {
    expect(commandBinaries("# plain wget; needed for busybox.\nwget -q x")).toEqual(["wget"])
  })

  test("a redirection's target is not a command", () => {
    expect(commandBinaries("kubectl get pods >/dev/null 2>&1")).toEqual(["kubectl"])
    expect(commandBinaries(") 9>/ci-storage/.prep-repo.flock || exit 1")).toEqual([])
    expect(commandBinaries("( kubectl get pods ) > /tmp/out.log")).toEqual(["kubectl"])
    expect(commandBinaries("< /etc/hosts grep localhost")).toEqual(["grep"])
  })

  test("a builtin's argument is not a binary", () => {
    expect(commandBinaries("echo hello")).toEqual([])
    expect(commandBinaries("cd /workspace\nexport PATH=/tools:$PATH")).toEqual([])
  })

  test("arithmetic expansion holds no command", () => {
    expect(commandBinaries("attempts=$((attempts + 1))\ndelay=$((delay * 2))")).toEqual([])
  })

  test("a case pattern is not a command", () => {
    const script = ["case $n in", "1) sleep 1;;", "curlish) sleep 5;;", "esac"].join("\n")
    expect(commandBinaries(script)).toEqual(["sleep", "sleep"])
  })

  test("a quoted assignment value is not a command", () => {
    const script =
      'BB_UNZIP="/ci-storage/tools/ld-musl-x86_64.so.1 /ci-storage/tools/busybox unzip"'
    expect(commandBinaries(script)).toEqual([])
  })

  test("a `;` inside a quoted string does not start a command", () => {
    expect(commandBinaries('echo "refusing; binary not found" && kubectl get pods')).toEqual([
      "kubectl",
    ])
  })

  test("a shell function the step defines is not a binary", () => {
    const script = 'install_atomic() { cp "$1" "$2"; }\ninstall_atomic /bin/busybox /tools/busybox'
    expect(commandBinaries(script)).toEqual(["cp"])
  })

  test("a line continuation does not start a command", () => {
    const script = "buildctl build \\\n  --frontend dockerfile.v0 \\\n  --local x=y"
    expect(commandBinaries(script)).toEqual(["buildctl"])
  })
})

describe("commandBinaries — how a token names its binary", () => {
  test("a path names its last segment", () => {
    expect(commandBinaries("/usr/bin/curl -sf x")).toEqual(["curl"])
  })

  test("a node_modules binary is not judged against the image", () => {
    expect(commandBinaries("./node_modules/.bin/biome check .")).toEqual([])
  })

  test("an env assignment prefix does not hide the command", () => {
    expect(commandBinaries("DEBIAN_FRONTEND=noninteractive apt-get update")).toEqual(["apt-get"])
  })
})

describe("commandSegments and binaryOfSegment", () => {
  test("a quoted word stays one token", () => {
    expect(commandSegments('echo "a b c" d')).toEqual([["echo", '"a b c"', "d"]])
  })

  test("a script with nothing in it has no segments", () => {
    expect(commandSegments("")).toEqual([])
  })

  test("a segment whose command is a builtin invokes no binary", () => {
    expect(binaryOfSegment(["set", "-e"])).toBeNull()
  })
})
