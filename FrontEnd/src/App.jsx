
import './App.css'
import { BrowserRouter, Router } from 'react-router-dom'

import { getApps } from './Util/helper'


function App() {
  const CurrentApp = getApps()

  return (
    <>

      <CurrentApp/>

    </>
  )
}

export default App
