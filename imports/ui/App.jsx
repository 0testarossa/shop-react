import React, { useState } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Books } from '../api/books.js';
import ReactDOM from 'react-dom';
import useReactRouter from "use-react-router";

export const App = (props) => {
  const books = props.books;
  const [localName, setLocalName] = useState(localStorage.getItem("user"));
  const clearLocalStore = () => {
    localStorage.clear();
    setLocalName("");
  }
  const { history } = useReactRouter();
  const [actualPage, setActualPage] = useState("1");
  
  const getSitePages = () => {
    const amountOfPages = Math.ceil(((books.length)/10));
    const pagesArray = [];
    for(i=0;i<amountOfPages;i++) {
      pagesArray.push((i+1).toString());
    }

    const pagesNumbers = pagesArray.map((pageNumber, index) => {
      const pageNumberClasses = `page-number-square ${actualPage === pageNumber ? "page-number-square-active" : ""}`
      return (
        <div className={pageNumberClasses} key={index} onClick={() => setActualPage(pageNumber)}>
          {pageNumber}
        </div>
      )
    })
    return (
    <div className="site-pages-container d-flex">
      {pagesNumbers}
    </div>
    )
  }

  const getShopItemsList = () => {
      const onItemClick = (bookId) => {
        history.push(`/product/${bookId}`);
      }

      const booksList = books.map((book, index) => {
        const max = actualPage*10;
        const min = max-9;
        if(index+1 >= min && index+1 <=max) {
          return (
            <tr key={index} onClick={() => onItemClick(book._id)}>
                  <td style={{"textAlign": "center", "verticalAlign": "middle"}}>
                    <img className="img-rounded img-list" src={book.image} alt={book.image}/>
                  </td>
                  <td style={{"verticalAlign": "middle"}}>
  
  
                  <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent horizontal-list-element font-weight-bold" >{book.header}</li>
                    <li className="list-group-item bg-transparent">
                    
                    <ul className="d-flex flex-wrap">
                        <li className="list-group-item bg-transparent horizontal-list-element font-weight-bold">Title</li>
                        <li className="list-group-item bg-transparent horizontal-list-element" >{book.title}</li>
                    </ul>
                    <ul className="d-flex flex-wrap">
                        <li className="list-group-item bg-transparent horizontal-list-element font-weight-bold">Author</li>
                        <li className="list-group-item bg-transparent horizontal-list-element" >{book.author}</li>
                    </ul>
                    <ul className="d-flex flex-wrap">
                        <li className="list-group-item bg-transparent horizontal-list-element font-weight-bold">Genre</li>
                        <li className="list-group-item bg-transparent horizontal-list-element" >{book.genre}</li>
                    </ul>
                    <ul className="d-flex flex-wrap">
                        <li className="list-group-item bg-transparent horizontal-list-element font-weight-bold">Price</li>
                        <li className="list-group-item bg-transparent horizontal-list-element" >{book.price}</li>
                    </ul>
                    
                    </li>
                  </ul>
  
  
                    </td>
                  <td className="text-success font-weight-bold" style={{verticalAlign:"middle"}}>{book.availability}</td>
                </tr>
          )
        } else{
          return
        }
      })
      return(
        <div className="product-details-page">
        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a></span></div>
            <div style={{"cursor": "pointer", "paddingRight": "30px"}} onClick={() => clearLocalStore()}> 
                {localName ? `Log out ( ${localName} )` : <span onClick={() => history.push("/login")}>Log in</span>}</div>
        </div>
        <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
          
          <div className="site-pages d-flex" style={{justifyContent: "center"}}>
            {getSitePages()}
          </div>

        <table className="table table-hover table-striped table-dark">
          <tbody>
            {booksList}
          </tbody>
        </table>


        </div>
          </div>
      );
  }

  return (
        getShopItemsList()
        );
}

export default withTracker(() => {
  return {
    books: Books.find({}, { sort: { _id: -1 } }).fetch(),
  };
})(App);
