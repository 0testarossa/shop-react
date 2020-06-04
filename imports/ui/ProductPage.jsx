import React, {useState} from 'react'
import {books} from "./mockBooks"
import useReactRouter from "use-react-router";
import {useStateWithLocalStorage} from './Test';

const ProductPage = (props) => {
    const [localName, setLocalName] = useState(localStorage.getItem("user"));
    const clearLocalStore = () => {
        localStorage.clear();
        setLocalName("");
    }
    const lessOperator = '<';
    const { history } = useReactRouter();
    const [activeShipmentMethod, setActiveShipmentMethod] = useState(0)
    const [cartState, setCartState] = useStateWithLocalStorage('cart')
    const addItemToCart = () => {
        const deliveryMethod = activeShipmentMethod === 0 ? "pickUpInStore" : activeShipmentMethod === 1 ? "parcelLocker" : "courier";
        const itemToAdd = {
                _id: bookId,
                delivery: deliveryMethod,
                amount: itemAmount
        }
            const oldValue = cartState ? JSON.parse(cartState) : [];
            console.log("oldValue");
            console.log(oldValue);
            setCartState(previousCartState => setCartState(JSON.stringify([...oldValue, itemToAdd])));
    }

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

    const onShipmentMethodClick = (event, methodIndex) => {
        setActiveShipmentMethod(methodIndex);
    }

    const afterAddingToCart = () => {

    }

    const changeSite = (site) => {
        if(site === "productList") {
            history.push("/");
        } else if(site === "cart") {
            history.push("/cart");
        }
    }

    console.log("props");
    console.log(props);
    
    return(
    <div className="product-details-page">
        {/* modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document" style={{maxWidth: "1000px"}}>
            <div className="modal-content" style={{height: "600px"}}>
              <div className="modal-header" style={{backgroundColor: "rgb(193, 193, 193)"}}>
                <h5 className="modal-title" id="exampleModalLabel">Shipment Method</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{backgroundColor: "rgba(0, 0, 0, 0.82)", padding: "1rem 0rem"}}>
                <table className="table table-hover table-striped table-dark">
                    <thead>
                        <tr>
                        <th scope="col" style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>#</th>
                        <th scope="col" style={{"textAlign": "center", "verticalAlign": "middle"}}>Method</th>
                        <th scope="col" style={{"verticalAlign": "middle", "textAlign": "center"}}>Delivery Time</th>
                        <th scope="col" style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>Delivery price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={activeShipmentMethod===0 ? "selected-shipment-method" : ""} onClick={(event) => onShipmentMethodClick(event,0)} style={{height: "140px"}}>
                            <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                            1
                            </th>
                            <td style={{"textAlign": "center", "verticalAlign": "middle"}}>
                            PICK UP IN STORE
                            </td>
                            <td style={{"verticalAlign": "middle", "textAlign": "center"}}>
                            
                            </td>
                            <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "center", width: "30%"}}>
                            0$
                            </td>
                        </tr>
                        <tr className={activeShipmentMethod===1 ? "selected-shipment-method" : ""} onClick={(event) => onShipmentMethodClick(event,1)} style={{height: "140px"}}>
                            <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                            2
                            </th>
                            <td style={{"textAlign": "center", "verticalAlign": "middle"}}>
                            PARCEL LOCKER
                            </td>
                            <td style={{"verticalAlign": "middle", "textAlign": "center"}}>
                            {selectedBook.delivery.parcelLocker.time}
                            </td>
                            <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "center"}}>
                            {selectedBook.delivery.parcelLocker.price}
                            </td>
                        </tr>
                        <tr className={activeShipmentMethod===2 ? "selected-shipment-method" : ""} onClick={(event) => onShipmentMethodClick(event,2)} style={{height: "140px"}}>
                            <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                            3
                            </th>
                            <td style={{"textAlign": "center", "verticalAlign": "middle"}}>
                            COURIER
                            </td>
                            <td style={{"verticalAlign": "middle", "textAlign": "center"}}>
                            {selectedBook.delivery.courier.time}
                            </td>
                            <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "center"}}>
                            {selectedBook.delivery.courier.price}
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <div className="modal-footer" style={{backgroundColor: "rgb(193, 193, 193)"}}>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                <button onClick={() => addItemToCart()} data-toggle="modal" data-target="#questionModal" type="button" className="btn btn-primary" data-dismiss="modal">ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
        {/* modal end */}

        {/* second modal */}
        <div className="modal fade" id="questionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document" style={{paddingTop: "300px"}}>
                <div className="modal-content" style={{backgroundColor: "rgb(171, 171, 171)"}}>
                <div className="modal-header" style={{border: "none"}}>
                    <h5 className="modal-title" id="exampleModalLabel">Do you wish to continue shopping?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-footer" style={{border: "none", justifyContent: "space-around"}}>
                    <button onClick={() => changeSite("productList")} type="button" className="btn btn-secondary" data-dismiss="modal">CONTINUE SHOPPING</button>
                    <button onClick={() => changeSite("cart")} type="button" className="btn btn-primary" data-dismiss="modal">GO TO MY CART</button>
                </div>
                </div>
            </div>
        </div>
        {/* second modal end */}

        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} {selectedBook.title}</div>
            <div style={{"cursor": "pointer", "paddingRight": "30px"}} onClick={() => clearLocalStore()}> 
                {localName ? `Log out ( ${localName} )` : ""}</div>
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
                        {localName ? 
                        <span data-toggle="modal" data-target="#exampleModal" className="font-weight-bold plus-minus-button" style={{ marginLeft: "30px", backgroundColor: "#6593F5", cursor: "pointer"}} >ADD TO CART</span>
                        :<span className="font-weight-bold plus-minus-button" style={{ marginLeft: "30px", backgroundColor: "grey"}} >ADD TO CART</span>
                        }
                        </li>
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