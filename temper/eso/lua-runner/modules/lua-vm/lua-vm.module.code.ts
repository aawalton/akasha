import { spawnPersistentVm } from "akasha/temper/eso/lua-runner/modules/persistent-vm/persistent-vm.module.code.ts"

export type LuaVm = {
  readonly run: (script: string) => Promise<unknown>
  readonly get: (name: string) => Promise<unknown>
  readonly close: () => Promise<void>
}

export type MakeLuaVmOptions = {
  readonly stubs?: string
}

export async function makeLuaVm(options: MakeLuaVmOptions = {}): Promise<LuaVm> {
  const persistent = await spawnPersistentVm()
  if (options.stubs !== undefined && options.stubs.length > 0) {
    const setup = await persistent.send(options.stubs)
    if (!setup.ok) {
      await persistent.close()
      throw new Error(`stubs failed to load: ${setup.error}`)
    }
  }
  return {
    async run(script: string): Promise<unknown> {
      const answer = await persistent.send(script)
      if (!answer.ok) throw new Error(answer.error)
      return answer.value
    },
    async get(name: string): Promise<unknown> {
      const answer = await persistent.send(`return ${name}`)
      if (!answer.ok) throw new Error(answer.error)
      return answer.value
    },
    async close(): Promise<void> {
      await persistent.close()
    },
  }
}
