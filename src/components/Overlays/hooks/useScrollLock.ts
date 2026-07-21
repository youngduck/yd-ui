import { useEffect } from 'react'

/**
 * 배경(body) 스크롤 잠금 훅.
 *
 * 모달/다이얼로그처럼 배경 조작을 막아야 하는 오버레이가 열려 있는 동안
 * body 스크롤을 잠급니다. 여러 오버레이가 겹쳐 떠도 올바르게 동작하도록
 * 모듈 단위 참조 카운팅을 사용합니다. (마지막 하나가 닫힐 때만 잠금 해제)
 *
 * 스크롤바가 사라지며 생기는 레이아웃 이동(콘텐츠 밀림)을 막기 위해
 * 사라진 스크롤바 폭만큼 body에 padding-right를 보정합니다.
 */
let lockCount = 0
let originalOverflow = ''
let originalPaddingRight = ''

export function useScrollLock() {
  useEffect(() => {
    const body = document.body

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      originalOverflow = body.style.overflow
      originalPaddingRight = body.style.paddingRight

      body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        const currentPaddingRight = parseInt(window.getComputedStyle(body).paddingRight, 10) || 0
        body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
      }
    }

    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        body.style.overflow = originalOverflow
        body.style.paddingRight = originalPaddingRight
      }
    }
  }, [])
}
