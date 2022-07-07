import React from 'react';
import { 
     BrowserRouter,
     Routes,
     Route
} from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;