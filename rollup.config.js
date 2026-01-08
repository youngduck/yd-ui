import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'

// 공통 플러그인 설정
const getCommonPlugins = (extractCss = false) => [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
  }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env', '@babel/preset-react'],
  }),
  postcss({
    config: {
      path: './postcss.config.js',
    },
    extensions: ['.css'],
    minimize: true,
    inject: true,
    extract: extractCss ? 'index.css' : false,
  }),
  terser(),
]

// 개별 컴포넌트 entry 정의 (tsup처럼 간단하게!)
const componentEntries = {
  Table: 'src/components/Table/index.ts',
  Overlays: 'src/components/Overlays/index.ts',
  // 새로운 컴포넌트 추가 시 여기에만 추가하면 됨
  // Button: 'src/components/Button/index.ts',
  // Input: 'src/components/Input/index.ts',
  // SelectBox: 'src/components/SelectBox/index.ts',
}

// 컴포넌트별 빌드 설정 생성 함수
const createComponentBuilds = () => {
  const builds = []

  Object.entries(componentEntries).forEach(([name, input]) => {
    // JS 빌드 (CJS + ESM)
    builds.push({
      input,
      output: [
        {
          file: `dist/${name}.cjs.js`,
          format: 'cjs',
          sourcemap: true,
        },
        {
          file: `dist/${name}.esm.js`,
          format: 'esm',
          sourcemap: true,
        },
      ],
      plugins: getCommonPlugins(false),
      external: ['react', 'react-dom'],
    })

    // TypeScript 타입 정의 빌드
    builds.push({
      input,
      output: [{ file: `dist/${name}.d.ts`, format: 'esm' }],
      plugins: [
        typescript({
          declaration: true,
          emitDeclarationOnly: true,
          outDir: 'dist',
        }),
        dts(),
      ],
      external: [/\.css$/],
    })
  })

  return builds
}

export default [
  // 메인 index 빌드
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: getCommonPlugins(true), // 메인만 CSS 추출
    external: ['react', 'react-dom'],
  },
  // 메인 타입 정의
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      typescript({
        declaration: true,
        emitDeclarationOnly: true,
        outDir: 'dist',
      }),
      dts(),
    ],
    external: [/\.css$/],
  },
  // 컴포넌트별 빌드 (자동 생성)
  ...createComponentBuilds(),
]
