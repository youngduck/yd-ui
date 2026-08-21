/**
 * @types/node 없이 개발 모드 분기(process.env.NODE_ENV)를 쓰기 위한 최소 ambient 선언.
 * 소비자 번들러(Vite/Next/webpack 등)가 NODE_ENV 값을 정적으로 치환한다.
 */
declare const process: {
  env: {
    NODE_ENV?: 'development' | 'production' | 'test'
    [key: string]: string | undefined
  }
}
