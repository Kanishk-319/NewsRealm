import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
        <div className=" container spinner-border text-dark d-flex justify-content-center align-items-center" style={{position:'relative',top:'8rem'}} role="status">
        <span className="visually-hidden text-center  ">Loading...</span>
              </div>
    )
  }
}
