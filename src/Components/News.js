import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      pageNumber: 1,
      totalArticles:0
    };
  }

  async update() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pageNumber}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalArticles: parsedData.totalResults,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.update();
  }

  handlePrevButton = async () => {
    await this.setState({ pageNumber: this.state.pageNumber - 1, loading: false });
    this.update();
  };

  handleNextButton = async () => {
    await this.setState({ pageNumber: this.state.pageNumber + 1, loading: false });
    this.update();
  };
  fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd2e7f14469b49188e1f6700f0295549&page=${this.state.pageNumber}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalArticles: parsedData.totalResults,
      pageNumber:this.state.pageNumber +1
  })
  }


  render() {
    return (
      <>
      <h1 className="text-center my-2">News Realm - Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          style={{overflowY:'hidden'}}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element,index) => {
                return (
                  <div key={index} className="col-md-4"> 
                    <NewsItem
                      title={element.title ? element.title.slice(0, 55) : ""}
                      description={
                        element.content ? element.content.slice(0, 88) : ""
                      }
                      imgUrl={element.urlToImage}
                      url={!element.url}
                      date={element.publishedAt}
                      author={element.author}
                      name={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          </div>
          </InfiniteScroll>
        {/* <div className=" container d-flex justify-content-between">
          <button
            disabled={this.state.pageNumber <= 1}
            type="button"
            onClick={this.handlePrevButton}
            className="btn btn-dark"
          >
            Previous
          </button>
          <button
            disabled={
              this.state.pageNumber + 1 >
              Math.ceil(this.state.totalArticles / this.state.pageSize)
            }
            type="button"
            onClick={this.handleNextButton}
            className="btn btn-dark"
          >
            Next
          </button>
        </div> */}
      </>
    );
  }
}
