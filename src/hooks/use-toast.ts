export type ToastProps = {
    title?: string
    description?: string
    action?: React.ReactNode
  }
  
  export const useToast = () => {
    const toast = (props: ToastProps) => {
      // Implement actual toast functionality here
      console.log('Toast:', props)
    }
  
    return { toast }
  }