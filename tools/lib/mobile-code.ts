import * as altoolModule from "../../alanwalton/mobile-cli/src/lib/altool.ts"
import * as appsModule from "../../alanwalton/mobile-cli/src/lib/apps.ts"
import * as ascClientModule from "../../alanwalton/mobile-cli/src/lib/asc-client.ts"
import * as buildSerializationModule from "../../alanwalton/mobile-cli/src/lib/build-serialization.ts"
import * as buildInputsModule from "../../alanwalton/mobile-cli/src/lib/build-inputs.ts"
import * as buildStampModule from "../../alanwalton/mobile-cli/src/lib/build-stamp.ts"
import * as cutFingerprintModule from "../../alanwalton/mobile-cli/src/lib/cut-fingerprint.ts"
import * as deployScriptModule from "../../alanwalton/mobile-cli/src/lib/deploy-script.ts"
import * as foundationModule from "../../alanwalton/mobile-cli/src/lib/foundation.ts"
import * as gitTreeHashModule from "../../alanwalton/mobile-cli/src/lib/git-tree-hash.ts"
import * as hostModule from "../../alanwalton/mobile-cli/src/lib/host.ts"
import * as localCutLockModule from "../../alanwalton/mobile-cli/src/lib/local-cut-lock.ts"
import * as sshModule from "../../alanwalton/mobile-cli/src/lib/ssh.ts"
import * as testflightPollModule from "../../alanwalton/mobile-cli/src/lib/testflight-poll.ts"
import * as wwwBuildModule from "../../alanwalton/mobile-cli/src/lib/www-build.ts"


export type Altool = typeof altoolModule
export type Apps = typeof appsModule
export type AscClient = typeof ascClientModule
export type BuildSerialization = typeof buildSerializationModule
export type BuildStamp = typeof buildStampModule
export type CutFingerprints = typeof cutFingerprintModule
export type DeployScript = typeof deployScriptModule
export type Foundation = typeof foundationModule
export type GitTreeHash = typeof gitTreeHashModule
export type Host = typeof hostModule
export type LocalCutLock = typeof localCutLockModule
export type Ssh = typeof sshModule
export type TestflightPoll = typeof testflightPollModule
export type WwwBuild = typeof wwwBuildModule

export async function apps(): Promise<Apps> {
  return appsModule
}

export async function foundation(): Promise<Foundation> {
  return foundationModule
}

export async function host(): Promise<Host> {
  return hostModule
}

export async function ssh(): Promise<Ssh> {
  return sshModule
}

export async function gitTreeHash(): Promise<GitTreeHash> {
  return gitTreeHashModule
}

export type BuildInputs = typeof buildInputsModule

export async function buildInputs(): Promise<BuildInputs> {
  return buildInputsModule
}

export async function cutFingerprints(): Promise<CutFingerprints> {
  return cutFingerprintModule
}

export async function ascClient(): Promise<AscClient> {
  return ascClientModule
}

export async function testflightPoll(): Promise<TestflightPoll> {
  return testflightPollModule
}

export async function altool(): Promise<Altool> {
  return altoolModule
}

export async function buildSerialization(): Promise<BuildSerialization> {
  return buildSerializationModule
}

export async function buildStamp(): Promise<BuildStamp> {
  return buildStampModule
}

export async function deployScript(): Promise<DeployScript> {
  return deployScriptModule
}

export async function localCutLock(): Promise<LocalCutLock> {
  return localCutLockModule
}

export async function wwwBuild(): Promise<WwwBuild> {
  return wwwBuildModule
}
