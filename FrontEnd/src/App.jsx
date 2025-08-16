
import './App.css'
import { BrowserRouter, Router } from 'react-router-dom'

import { getApps } from './Util/helper'


function App() {
  const CurrentApp = getApps()

  return (
    <>
    <BrowserRouter>
      <CurrentApp/>
     </BrowserRouter>

    </>
  )
}

export default App
