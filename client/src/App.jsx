import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"

function App() {

  return (
    <>
    <Header/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
