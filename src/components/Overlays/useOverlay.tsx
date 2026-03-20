import { useContext } from 'react'
import { OverlayContext } from './OverlayProvider'
import { Modal } from './Modal/Modal'
import { IModalOpenRequestData } from './Modal/ModalTypes'
import Toast from './Toast/Toast'
import { IToastOpenRequestData } from './Toast/ToastTypes'

let overlayIdCounter = 0
const DEFAULT_TOAST_DURATION = 2000

export const useOverlay = () => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlay는 OverlayProvider 내에서만 사용할 수 있습니다.')
  }
  const { mount, unmount } = context

  const modalOpen = (modalData: IModalOpenRequestData) => {
    const id = ++overlayIdCounter

    const content =
      typeof modalData.content === 'function' ? modalData.content(() => modalClose(id)) : modalData.content

    mount({
      id,
      component: (
        <Modal onClose={() => modalClose(id)} size={modalData.config.size}>
          {content}
        </Modal>
      ),
    })
  }

  const modalClose = (id: number) => {
    unmount(id)
  }

  const toast = (toastData: IToastOpenRequestData) => {
    const id = ++overlayIdCounter

    mount({
      id,
      component: (
        <Toast
          content={toastData.content}
          duration={toastData.duration ?? DEFAULT_TOAST_DURATION}
          onDismiss={() => unmount(id)}
        />
      ),
    })
  }

  return { modalOpen, modalClose, toast }
}
