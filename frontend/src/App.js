import ReactDOM from 'react-dom/client';
import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useMatch, useParams, useLocation } from 'react-router-dom';

const data = [
  {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
  {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
  {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
  {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
  {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
];

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/gallery">Images</Link> </li>
          <li> <Link to="/slideshow">Slideshow</Link> </li>
        </ul>
      </div>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/slideshow" element={<Slideshow />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <h2>Home</h2>
      <img src="images/component_diagram.png" className="w-100" />
    </>
  );
}

function Gallery() {
  return (
    <>
      <Title name="CUHK Pictures"/>
      <main className="container">
        {data.map((file,index) => <FileCard i={index} key={index} />)}
      </main> 
    </>
  );
}

let Title = (props) => {
  const { name } = props
  return (
    <header className="bg-warning">
      <h1 className="display-4 text-center">{name}</h1>
    </header>
  );
}

let FileCard = (props) =>{
  const { i, key } = props
  const [selected, setSelected] = useState(-1)
  
  const handleMouseOver = (index, e) => {
    if (selected != index)
      setSelected(index);
  } 
  const handleMouseOut = (index, e) => {
      setSelected(-1);
  } 
  return (
    <div
      onMouseOver={(e)=>handleMouseOver(i,e)}
      onMouseLeave={(e)=>handleMouseOut(i,e)}
      className="card d-inline-block m-2"
      style={{width:selected==i? 220 : 200}}
    >
    <img src={`images/${data[i].filename}`} className="w-100" />
    <div className="card-body">
      <h6 className="card-title">{data[i].filename}</h6>
      <p className="card-text">{data[i].year}</p>
      { selected==i && 
        <p className="card-text">{data[i].remarks}</p> 
      }
    </div>
  </div>
  )
}
function Slideshow() {
  const [currentImageID, setCurrentImageID] = useState(0)
  const [intervaltime, setIntervaltime] = useState(1500)
  const [currentInterval, setCurrentInterval] = useState(null)
  const [play, setPlay] = useState(false)


  useEffect(() => {
      if(play) {
        playSlide()
      }
      setPlay(false)
    },[play]
  );

  let playSlide = () =>{
    if(currentInterval) return console.log("adready have")
    let interval = setInterval(()=>{
      setCurrentImageID((perv)=>perv < data.length-1 ? perv+1 : 0)
    }
    , intervaltime)
    setCurrentInterval(interval)
    console.log("start")
  }

  let stopSlide = () =>{
    console.log("stop!")
    clearInterval(currentInterval)
    setCurrentInterval(null)
  }

  let changeSpeed = (time) => {
    if(intervaltime + time <= 200) return 
    setIntervaltime((prev)=>prev+time)
    if (currentInterval){
      stopSlide()
      setPlay(true)
    }
  }
  return (
    <div className="container">
      <button className='btn border m-2' onClick={playSlide}>Start slideshow</button>
      <button className='btn border m-2' onClick={stopSlide}>Stop slideshow</button>
      <button 
        className='btn border m-2'
        onClick={()=>changeSpeed(200)}
      >
        Slower
      </button>
      <button 
        className='btn border m-2'
        onClick={()=>changeSpeed(-200)}
      >
        Faster
      </button>
      <img src={`images/${data[currentImageID].filename}`} className="w-100" />
      <h6 className="card-title">{data[currentImageID].filename}</h6>
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
