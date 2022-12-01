import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {

    let {title,description,imgUrl,url,author,date,name}=this.props;
    return (<>
        <div className="card m-3">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'88%',padding:'10px'}}>
    {name}
    <span className="visually-hidden">unread messages</span>
    </span>
        <img src={!imgUrl?"https://media.cnn.com/api/v1/images/stellar/prod/221128085139-01-powerlines-crash.jpg?c=16x9&q=w_800,c_fill":imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={url?url:'404'} target='_blank' rel="noreferrer"  className="btn btn-dark">Read More</a>
        </div>
      </div>
      </>
    )
  }
}
