import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { AuthProvider } from './context/AuthContext.jsx';
import DataProvider from './context/DataProvider.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>  {/*checks  authentication*/}
        <DataProvider> {/*listing data*/}
          <App />
        </DataProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>,
)
