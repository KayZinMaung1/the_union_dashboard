
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routers/PrivateRoute';
import AuthRoute from './routers/AuthRoute';
import Admin from './layouts/Admin';
import Login from '../src/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<PrivateRoute><Login /></PrivateRoute>} />
        <Route path="/admin/*" element={<AuthRoute><Admin /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
