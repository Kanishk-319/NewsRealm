
import './App.css';
import React, { Component } from 'react'
import News from './Components/News';
import Navbar from './Components/Navbar';
import { Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS
state={
  progress:0
}
setProgress=(progress)=>{
    this.setState({progress:progress})
}

  render() {
    return (
      <>
      <Navbar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
        <Route exact  path="/" element={<News setProgress={this.setProgress} apiKey={this.apikey}   key="home" pageSize={9}/>}></Route>
        <Route exact  path="/business" element={<News setProgress={this.setProgress} apiKey={this.apikey}  key="business" pageSize={9} category='business'/>}></Route>
        <Route exact  path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apikey}  key="sports" pageSize={9} category='sports'/>}></Route>
        <Route exact  path="/health" element={<News setProgress={this.setProgress} apiKey={this.apikey}  key="health" pageSize={9} category='health'/>}></Route>
        <Route exact  path="/science" element={<News setProgress={this.setProgress} apiKey={this.apikey}  key="science" pageSize={9} category='science'/>}></Route>
        <Route exact  path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apikey}  key="technology" pageSize={9} category='technology'/>}></Route>
      </Routes>
     
     </>
    )
  }
}
