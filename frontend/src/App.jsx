
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Bots from './Pages/Bots';
import Integrations from './Pages/Integrations';
import FAQs from './Pages/FAQs';
import AuditLog from  './Pages/AuditLog';
import MngUsers from './Pages/MngUsers';


function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/dashboard' element={ <Home />}>
            <Route path='integrations' element={ <Integrations />} />
            <Route path='bots' element={ <Bots />} />
            <Route path='faqs' element={ <FAQs />} />
            <Route path='auditlogs' element={ <AuditLog />} />
            <Route path='mngusers' element={ <MngUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
