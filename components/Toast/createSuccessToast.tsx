import { useToast } from '@chakra-ui/react'
import Success from './success'

const createSuccessToast = (toast: any, message: any) => {
  toast({
    position: 'top-right',
    render: () => <Success title="" message={message} />,
    duration: 3000,
  })
  return null
}

export default createSuccessToast