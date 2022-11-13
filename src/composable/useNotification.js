import { ElNotification } from 'element-plus'

export default function useNotification() {
  const success = (message, title = 'Sukces') => {
    ElNotification({
      title,
      message,
      type: 'success'
    })
  }

  const error = (message, title = 'Error') => {
    ElNotification({
      title,
      message,
      type: 'error'
    })
  }

  return {
    success,
    error
  }
}
