import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Compare from './components/Compare';
import NEODetail from './components/NEODetail';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className="h-screen w-full">
      <div className='z-50 fixed top-0 left-0 w-full'><Navbar/></div>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/neo/:id" element={<NEODetail />} />
      </Routes>
    </div>
  );
};

export default App;
