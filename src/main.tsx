import ReactDOM from 'react-dom/client'
import i18 from './i18n.ts'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../src/redux/store'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
)
