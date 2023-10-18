// components
import Navbar from './Navbar';
import NabvarAdmin from './NabvarAdmin';
// views
import Home from '../views/Home.jsx';
import Productos from '../views/Productos';
import Admin from '../views/Admin.jsx';
import About from '../views/About.jsx';
import Contact from '../views/Contact.jsx';
import HomeAdmin from '../views/HomeAdmin.jsx';
// contexto
import {useAuth} from '../context/AuthContext.jsx';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  const {isLoggedIn} = useAuth();
  return (
    <>
      <BrowserRouter>
          {isLoggedIn ? <NabvarAdmin /> : <Navbar />}
          <Routes>
            {isLoggedIn ? (
              <Route path="/AdminRoute" element={<HomeAdmin />}/>
            ) : (
                  <>
                  <Route path="/" element={<Home />} />
                  <Route path='/Productos' element={<Productos/>} />
                  <Route path="/About_us" element={<About/>} />
                  <Route path="/Contact-us" element={<Contact/>} />
                  <Route path="/Admin" element={<Admin/>} />
                  <Route path="*" element={<h3> Page not found 404 </h3>} />
                  </>
            )}
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
