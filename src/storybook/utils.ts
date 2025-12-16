/**
 * Storybook에서 사용하는 공통 유틸리티 함수들
 */

/**
 * 클립보드에 코드를 복사하고 성공 토스트를 표시합니다.
 * @param code - 클립보드에 복사할 코드 문자열
 */
export const copyCodeToClipboard = (code: string) => {
  navigator.clipboard.writeText(code)
  showCopySuccessToast()
}

/**
 * 클립보드 복사 성공 토스트 메시지를 표시합니다.
 * Tailwind 클래스와 디자인 토큰을 사용합니다.
 */
const showCopySuccessToast = () => {
  const toast = document.createElement('div')
  toast.textContent = '코드가 클립보드에 복사되었습니다!'

  // Tailwind 클래스와 디자인 토큰 사용
  toast.className =
    'fixed top-5 right-5 bg-[var(--color-primary-400)] text-yds-b2 px-6 py-3 rounded-lg z-[9999] shadow-md'

  document.body.appendChild(toast)
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast)
    }
  }, 2000)
}
