import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      treeShaking: true,
    },
    dts: {
      compilerOptions: {
        // TODO 暂时避免ts错误导致的build失败
        noEmit: true,
      },
    },
  },
})
