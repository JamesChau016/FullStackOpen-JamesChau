import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotiProvider } from './NotiContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client= {queryClient}>
    <NotiProvider>
      <App />
    </NotiProvider>
  </QueryClientProvider>
)