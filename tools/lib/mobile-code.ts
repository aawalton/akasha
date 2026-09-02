import * as altoolModule from "@akasha/mobile-cli/altool"
import * as ascClientModule from "@akasha/mobile-cli/asc-client"
import * as buildInputsModule from "@akasha/mobile-cli/build-input-sources"
import * as buildStampModule from "@akasha/mobile-cli/build-stamp-gate"
import * as cutFingerprintModule from "@akasha/mobile-cli/cut-fingerprint"
import * as foundationModule from "@akasha/mobile-cli/foundation"
import * as gitTreeHashModule from "@akasha/mobile-cli/git-tree-hash"
import * as localCutLockModule from "@akasha/mobile-cli/local-cut-lock"
import * as buildSerializationModule from "@akasha/mobile-cli/mac-build-serialization"
import * as hostModule from "@akasha/mobile-cli/macbook-target"
import * as appsModule from "@akasha/mobile-cli/mobile-app"
import * as sshModule from "@akasha/mobile-cli/mobile-ssh"
import * as deployScriptModule from "@akasha/mobile-cli/testflight-deploy-script"
import * as testflightPollModule from "@akasha/mobile-cli/testflight-poll"
import * as wwwBuildModule from "@akasha/mobile-cli/www-build"

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
