import { Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';

import React from 'react'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protect Admin Page */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
    )
}

export default App