import React, {useState} from 'react'
import {books} from "./App"
import useReactRouter from "use-react-router";

const ProductPage = (props) => {
    const lessOperator = '<';
    const { history } = useReactRouter();

    const getRecommendedProducts = () => {
        const allItems = [selectedBook._id];
        const recommendedItems = [];
        for(i=0;i<3;i){
            const rand = Math.floor( 1 + Math.random() * (books.length) )-1;
            if(allItems.includes(books[rand]._id)) {
                recommendedItems.push(books[rand]._id);
                i++;
                continue;
            }else {
                allItems.push(books[rand]._id);
                recommendedItems.push(books[rand]._id);
                i++;
            }
        }
        const updatedRecommendedItems = recommendedItems.map((element) => {
            const foundedBook = books.find((book) => {
                return book._id === element;
            })
            return foundedBook
        })
        return updatedRecommendedItems;
    }

    const bookId = props.match.params.id;
    const selectedBook = books.find((book) => {
        return book._id === bookId;
    })

    const [recommendedProducts, setRecommendedProducts] = useState(getRecommendedProducts());
    const [itemAmount, setItemAmount] = useState(1);

    const goToAnotherProduct = (productIndex) => {
        productId = recommendedProducts[productIndex]._id;
        history.push(`/product/${productId}`);
    }

    const getNewItemAmount = (event) => {
        const data = event.target.value
        if(Number(data) === parseInt(data, 10)) {
            setItemAmount(data);
        }
        if(data === "") {
            setItemAmount("");
        }
    }

    const validateItemAmount = (event) => {
        const data = event.target.value
        const splittedData = data.split("").map((element) => {
            if(element =="0") {
                return "";
            } else{
                return element;
            }
    })
        const joinedData = splittedData.join("") || "1";
        setItemAmount(joinedData);
    }

    const plusOrMinusItemAmount = (type) => {
        if(type === "plus") {
            setItemAmount((previousValue) => setItemAmount(previousValue + 1));
        } else {
            setItemAmount((previousValue) => setItemAmount(previousValue > 2 ? previousValue - 1 : 1));
        }
    }

    console.log("props");
    console.log(props);

    return(
    <div className="product-details-page">
        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} {selectedBook.title}</div>
        </div>
        <div className="product-details-container">
            <div className="d-flex">
                <div style={{"width": "50%", "padding": "50px"}}>
                    <img className="img-rounded img-list" src={selectedBook.image} alt={selectedBook.image}/>
                </div>
                <ul className="list-group list-group-flush" style={{ "backgroundColor": "inherit", paddingTop: "50px", "paddingLeft": "50px"}}>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">{selectedBook.title}</span></li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><h2 className="font-weight-bold" style={{ "borderTop": "none"}}>{selectedBook.price}</h2></li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">delivery time: </span>{selectedBook.deliveryTime}</li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit", paddingTop: "30px"}}>
                        <span className="font-weight-bold plus-minus-button" style={{ borderColor: "#fff", cursor: "pointer"}}>
                            <span style={{ backgroundColor: "inherit", cursor: "pointer", padding: "12px"}} onClick={() => plusOrMinusItemAmount("plus")}>+</span>
                            <input style={{ backgroundColor: "inherit", cursor: "pointer", width: "10%", borderColor: "rgba(255,255,255,0)", color: "#fff"}} 
                            onBlur={(event) => validateItemAmount(event)} value={itemAmount} onChange={(event) => getNewItemAmount(event)}/>
                            <span style={{ backgroundColor: "inherit", cursor: "pointer", padding: "12px"}} onClick={() => plusOrMinusItemAmount("minus")}>-</span>
                            </span>
                        <span onClick={() => {}} className="font-weight-bold plus-minus-button" style={{ marginLeft: "30px", backgroundColor: "#6593F5", cursor: "pointer"}}>ADD TO CART</span></li>
                </ul>
            </div>
        </div>

        <div className="product-details-container">
            <h2 style={{"padding": "1rem"}}>Details</h2>
            <div style={{"padding": "1rem"}}>
            <ul className="list-group list-group-flush" style={{ "backgroundColor": "inherit", paddingTop: "50px"}}>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit", "position": "relative"}}><span className="font-weight-bold">{selectedBook.title}</span ><span style={{ "position": "absolute", "right":"0"}}>{selectedBook.header}</span></li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">author: </span>{selectedBook.author}</li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">genre: </span>{selectedBook.genre}</li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">price: </span>{selectedBook.price}</li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">state: </span>{selectedBook.state}</li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">delivery time: </span>{selectedBook.deliveryTime}</li>
                    <li className="list-group-item" style={{ "backgroundColor": "inherit"}}>As the shooting light and color displays, actual product and photos may have some differences. Contact us in order to get additional photos of our product.</li>
                </ul>
            </div>
        </div>

        <div className="product-details-container">
            <h2 style={{"padding": "1rem"}}>Description</h2>
            <img className="img-rounded img-list" src="description.png" alt="description.png"/>
            <h5 style={{"padding": "1rem"}}>{selectedBook.title} By {selectedBook.author}</h5>
            <div style={{"padding": "1rem"}}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nobis voluptates aut illum illo assumenda deleniti repudiandae harum dolore velit, ex officiis molestiae dicta, voluptate, animi rerum id tempore culpa.
            </div>
        </div>
        
        <div className="product-details-container">
            <div>
                <div className="row" style={{"cursor": "pointer"}}>
                    <div className="col d-flex flex-column" style={{ "padding": "3rem"}} onClick={() => goToAnotherProduct(0)}>
                        <div>
                        <img className="img-rounded img-list" src={recommendedProducts[0].image} alt={recommendedProducts[0].image}/>
                        </div>
                        <br></br>
                        <div><span className="font-weight-bold">{recommendedProducts[0].title}</span> - {recommendedProducts[0].header}</div>
                        <div><span className="font-weight-bold">price: </span>{recommendedProducts[0].price}</div>
                        <div><span className="font-weight-bold">author: </span>{recommendedProducts[0].author}</div>
                    </div>
                    <div className="col d-flex flex-column" style={{"backgroundColor": "rgba(255,255,255,.04)", "padding": "3rem"}} onClick={() => goToAnotherProduct(1)} >
                        <div>
                        <img className="img-rounded img-list" src={recommendedProducts[1].image} alt={recommendedProducts[1].image}/>
                        </div>
                        <br></br>
                        <div><span className="font-weight-bold">{recommendedProducts[1].title}</span> - {recommendedProducts[1].header}</div>
                        <div><span className="font-weight-bold">price: </span>{recommendedProducts[1].price}</div>
                        <div><span className="font-weight-bold">author: </span>{recommendedProducts[1].author}</div>
                    </div>
                    <div className="col d-flex flex-column" style={{ "padding": "3rem"}} onClick={() => goToAnotherProduct(2)}>
                        <div>
                        <img className="img-rounded img-list" src={recommendedProducts[2].image} alt={recommendedProducts[2].image}/>
                        </div>
                        <br></br>
                        <div><span className="font-weight-bold">{recommendedProducts[2].title}</span> - {recommendedProducts[2].header}</div>
                        <div><span className="font-weight-bold">price: </span>{recommendedProducts[2].price}</div>
                        <div><span className="font-weight-bold">author: </span>{recommendedProducts[2].author}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProductPage