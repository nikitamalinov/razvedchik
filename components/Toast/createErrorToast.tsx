import { useToast } from '@chakra-ui/react'
import Error from './error'

const createErrorToast = (toast: any, message: any) => {
  toast({
    position: 'top-right',
    render: () => <Error title="" message={message} />,
    duration: 3000,
  })
  return null
}

export default createErrorToast