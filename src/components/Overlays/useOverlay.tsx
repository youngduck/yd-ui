import { useContext, useState } from 'react'
import { OverlayContext } from './OvelayProvider'
import { Modal } from './Modal/Modal'
import { IModalOpenRequestData } from './Modal/ModalTypes'

export const useOverlay = () => {
  const context = useContext(OverlayContext)
  const { mount, unmount } = context
  const [activeOverlayId, setActiveOverlayId] = useState(0)
  if (!context) {
    throw new Error('useOverlay는 OvelayProvider 내에서만 사용할 수 있습니다.')
  }

  const modalOpen = (modalData: IModalOpenRequestData) => {
    const id = activeOverlayId + 1
    setActiveOverlayId(id)

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

  const toastOpen = () => {}

  return { modalOpen, modalClose, toastOpen }
}
