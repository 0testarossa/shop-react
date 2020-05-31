import React from 'react'
import {books} from "./App"

const ProductPage = (props) => {
    console.log("props");
    console.log(props);
    const bookId = props.match.params.id;
    const selectedBook = books.find((book) => {
        return book._id === bookId;
    })
    const selectedBook2 = books.find((book) => {
        return book._id === "3";
    })
    return(
        <>
    <div>ProductPage {bookId}</div>
    <div>Book: {selectedBook.title}</div>
    <div className="d-flex">
        <div style={{"width": "50%"}}>
            <img className="img-rounded img-list" src={selectedBook.image} alt={selectedBook.image}/>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="font-weight-bold">{selectedBook.title}</span> - {selectedBook.header}</li>
            <li className="list-group-item"><span className="font-weight-bold">author: </span>{selectedBook.author}</li>
            <li className="list-group-item"><span className="font-weight-bold">genre: </span>{selectedBook.genre}</li>
            <li className="list-group-item"><span className="font-weight-bold">price: </span>{selectedBook.price}</li>
            <li className="list-group-item"><span className="font-weight-bold">deliver time: </span>{selectedBook.deliverTime}</li>
        </ul>
        {/* <div className="d-flex flex-column">
            <div className="font-weight-bold">{selectedBook.title}</div>
            <div className="font-weight-bold">{selectedBook.header}</div>
        </div> */}
    </div>
    <div className="d-flex">
        <div style={{"width": "50%"}}>
            <img className="img-rounded img-list" src={selectedBook2.image} alt={selectedBook2.image}/>
        </div>
        <div className="d-flex flex-column">
            <div className="font-weight-bold">{selectedBook2.title}</div>
        </div>
    </div>
    <h2>Description</h2>
    <img className="img-rounded img-list" src="description.png" alt="description.png"/>
    <h5>{selectedBook.title} By {selectedBook.author}</h5>
    <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
    </div>
    <div>
        <div className="row">
            <div className="col d-flex flex-column" style={{"backgroundColor": "yellow", "padding": "3rem"}}>
                <div>
                <img className="img-rounded img-list" src={selectedBook.image} alt={selectedBook.image}/>
                </div>
                <br></br>
                <div><span className="font-weight-bold">{selectedBook.title}</span> - {selectedBook.header}</div>
                <div><span className="font-weight-bold">price: </span>{selectedBook.price}</div>
                <div><span className="font-weight-bold">author: </span>{selectedBook.author}</div>
            </div>
            <div className="col d-flex flex-column" style={{"backgroundColor": "orange", "padding": "3rem"}}>
                <div>
                <img className="img-rounded img-list" src={selectedBook.image} alt={selectedBook.image}/>
                </div>
                <br></br>
                <div><span className="font-weight-bold">{selectedBook.title}</span> - {selectedBook.header}</div>
                <div><span className="font-weight-bold">price: </span>{selectedBook.price}</div>
                <div><span className="font-weight-bold">author: </span>{selectedBook.author}</div>
            </div>
            <div className="col d-flex flex-column" style={{"backgroundColor": "yellow", "padding": "3rem"}}>
                <div>
                <img className="img-rounded img-list" src={selectedBook.image} alt={selectedBook.image}/>
                </div>
                <br></br>
                <div><span className="font-weight-bold">{selectedBook.title}</span> - {selectedBook.header}</div>
                <div><span className="font-weight-bold">price: </span>{selectedBook.price}</div>
                <div><span className="font-weight-bold">author: </span>{selectedBook.author}</div>
            </div>
            <div className="col d-flex flex-column" style={{"backgroundColor": "orange", "padding": "3rem"}}>
                <div>
                <img className="img-rounded img-list" src={selectedBook.image} alt={selectedBook.image}/>
                </div>
                <br></br>
                <div><span className="font-weight-bold">{selectedBook.title}</span> - {selectedBook.header}</div>
                <div><span className="font-weight-bold">price: </span>{selectedBook.price}</div>
                <div><span className="font-weight-bold">author: </span>{selectedBook.author}</div>
            </div>
        </div>
    </div>
    </>
    )
}

export default ProductPage