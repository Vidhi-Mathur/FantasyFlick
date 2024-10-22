import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FormCtxProvider } from './components/store/Form-Context.jsx'

createRoot(document.getElementById('root')).render(
  <FormCtxProvider>
    <App />
  </FormCtxProvider>,
)
