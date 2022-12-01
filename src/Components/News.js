import React, { Component,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

static defaultProps={
    country:'in',
    category:'general'
}
static propTypes={
    country:PropTypes.string,
    category:PropTypes.string
}

constructor(){
    super();
    this.state={
        articles:[],
        loading: false,
        pageNumber:1
    }
}

async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd2e7f14469b49188e1f6700f0295549&page=${this.state.pageNumber}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData=await data.json();
    this.setState({ articles: parsedData.articles,
    loading: false,totalArticles:parsedData.totalResults });
}

handlePrevButton=async()=>{
   
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=fd2e7f14469b49188e1f6700f0295549&page=${this.state.pageNumber -1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({ articles: parsedData.articles,
        loading: false });
        this.setState({pageNumber: this.state.pageNumber -1,loading:false})
    
    
}

handleNextButton=async()=>{
    if(this.state.pageNumber+1>Math.ceil(this.state.totalArticles/this.props.pageSize)){
    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=fd2e7f14469b49188e1f6700f0295549&page=${this.state.pageNumber+1}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData=await data.json();
    this.setState({ articles: parsedData.articles,
    loading: false });
    this.setState({pageNumber: this.state.pageNumber +1,loading:false})
    }
}

  render() {
    return (
        <><div className='container my-3'>
        <h1 className='text-center my-2'>News Realm - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
         <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
                return <div  key={element.url} className='col-md-4' >
                <NewsItem title={element.title?element.title.slice(0,55):""} description={element.content?element.content.slice(0,88):""} imgUrl={element.urlToImage} url={!element.url} date={element.publishedAt} author={element.author} name={element.source.name}/>
            </div>
        })} 
        </div>
        </div>
        <div className=' container d-flex justify-content-between'>
        <button disabled={this.state.pageNumber<=1} type="button" onClick={this.handlePrevButton} className="btn btn-dark">Previous</button>
        <button disabled={this.state.pageNumber+1>Math.ceil(this.state.totalArticles/this.state.pageSize)} type="button" onClick={this.handleNextButton} className="btn btn-dark">Next</button>
        </div>
        </>
    )
  }
}
