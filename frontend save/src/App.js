import ReactDOM from 'react-dom/client';
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useMatch, useParams, useLocation } from 'react-router-dom';
import Sidebar from './components/SideBar.js'
import LoginPage from './page/loginPage'
import useFirebase from "./hook/firebase";


import handleSubmit from './handlesubmit';


function App() {
  useFirebase();
  return (
    <div className='App'>
      <div>
        <div xs={2} className='min-vh-100'>
          <Sidebar />
        </div>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const dataRef = useRef()

  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }

  return (
    <div>
      <h2>Home</h2>
      <div className="App">
        {/* <LoginPage /> */}
        {/* <form onSubmit={submithandler}>
          <input type="text" ref={dataRef} />
          <button type="submit">Save</button>
        </form> */}
      </div>
    </div>
  );
}


function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}



export default App;
