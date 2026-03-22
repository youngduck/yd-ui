/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { useEffect } from 'react'
import { IToast } from './ToastTypes'

const Toast = ({ content, duration, onDismiss }: IToast) => {
  //SECTION HOOK호출 영역
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [])
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="yds-toast-container">
      <div className="yds-toast">{content}</div>
    </div>
  )
}

Toast.displayName = 'Toast'

export default Toast
