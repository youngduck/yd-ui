import { Meta, StoryObj } from '@storybook/react'
import Toast from './Toast'
import { OverlayProvider } from '../OverlayProvider'
import { Button } from '../../Button/Button'
import { useOverlay } from '../useOverlay'

const ToastPlayground = () => {
    const { toast } = useOverlay()
    return (
        <div className='w-[800px] h-[500px] flex items-center justify-center'>
            <Button size="lg" variant="fill" color="primary" onClick={() => {
                toast({
                    content: '토스트 메시지',
                })
            }}>
                토스트 열기
            </Button>
        </div>
    )
}

const meta: Meta<typeof Toast> = {
    title: 'Components/Overlay/Toast',
    component: ToastPlayground,
    decorators: [
        Story => (
          <OverlayProvider>
            <Story />
          </OverlayProvider>
        ),
      ],
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {}