import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
