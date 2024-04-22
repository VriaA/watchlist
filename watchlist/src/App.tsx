import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Results from "./pages/Results"
import Film from "./pages/Film"
import Watchlist from "./pages/Watchlist"
import Authentication from "./pages/Authentication"
import AuthRequired from "./components/layout/AuthRequired"

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Results />} />
          <Route path="/movie/:id" element={<Film />} />
          <Route path="/tv/:id" element={<Film />} />

          <Route element={<AuthRequired />}>
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>

          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App