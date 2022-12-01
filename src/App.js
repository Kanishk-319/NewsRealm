
import './App.css';
import React, { Component } from 'react'
import News from './Components/News';
import Navbar from './Components/Navbar';
import { Routes, Route} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <Routes>
        <Route exact  path="/" element={<News key="home" pageSize={9}/>}></Route>
        <Route exact  path="/business" element={<News key="business" pageSize={9} category='business'/>}></Route>
        <Route exact  path="/sports" element={<News key="sports" pageSize={9} category='sports'/>}></Route>
        <Route exact  path="/health" element={<News key="health" pageSize={9} category='health'/>}></Route>
        <Route exact  path="/science" element={<News key="science" pageSize={9} category='science'/>}></Route>
        <Route exact  path="/technology" element={<News key="technology" pageSize={9} category='technology'/>}></Route>
      </Routes>
     
     </>
    )
  }
}
