import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import Home from "./pages/Home"
import Results from "./pages/Results"
import Film from "./pages/FIlm"
import Watchlist from "./pages/Watchlist"
import Authentication from "./pages/Authentication"
import AuthRequired from "./components/layout/AuthRequired"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/film" element={<Film />} />

          <Route element={<AuthRequired />}>
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
        </Route>

        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
