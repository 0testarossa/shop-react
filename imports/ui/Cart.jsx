import React, {useState} from 'react'
import useReactRouter from "use-react-router";
import {useStateWithLocalStorage} from './Storage';
import { Books } from '../api/books.js';
import { withTracker } from 'meteor/react-meteor-data';

const Cart = (props) => {
    const books = props.books;
    const [localName, setLocalName] = useState(localStorage.getItem("user"));
    const [cartsState, setCartsState] = useStateWithLocalStorage('cart')
    const clearLocalStore = () => {
        localStorage.clear();
        setLocalName("");
    }
    const { history } = useReactRouter();
    const lessOperator = '<';

    const buyAllProductsDotPay = (productPrice) => {
        history.push({
            pathname: '/payment',
            search: '',
            state: { productId: "all", productPrice }
          });
    }

    const buyAllProducts = (productPrice) => {
        const promise = new Promise(function(resolve, reject) {
            setCartsState(previousValue => setCartsState(JSON.stringify([])));
            resolve(true);
          })
        promise.then(bool => history.push({
            pathname: '/pay',
            search: '',
            // search: '?the=search',
            state: { productPrice }
          }));
    }

    const buySelectedProductDotPay = (productId, productCartIndex, productPrice) => {
        history.push({
            pathname: '/payment',
            search: '',
            state: { productId:productCartIndex, productPrice }
          });
    }

    const buySelectedProduct = (productId, productCartIndex, productPrice) => {
        const promise = new Promise(function(resolve, reject) {
            deleteProductFromCart(productCartIndex)
            resolve(true);
          })
        promise.then(bool => history.push({
            pathname: '/pay',
            search: '',
            // search: '?the=search',
            state: { productId, productPrice }
          }));
    }

    const deleteProductFromCart = (productIndex) => {
        const updatedArray = JSON.parse(cartsState).filter((product, index) => {
            return index !== productIndex;
        })
        setCartsState(previousValue => setCartsState(JSON.stringify(updatedArray)));
    }

    export const deleteDollar = (amount) => {
        const correctNumber = amount.split("").map((char) => {
            if(char !== "$") {
                return char
            } else {
                return ""
            }
        })
        return correctNumber.join("");
    }

    const addDollar = (amount) => {
        return `${amount}$`
    }

    const getBuyAllFromCart = () => {
        let totalAmount = 0;

        cartsState && JSON.parse(cartsState).map((product, index) => {
            const selectedProduct = books.find((book) => {
                return book._id === product._id;
            });
            const productPriceWithoutDelivery = addDollar((Number(deleteDollar(selectedProduct.price))*Number(product.amount)).toString());
            const deliveryPrice = selectedProduct.delivery[product.delivery].price;
            totalAmount += Number(deleteDollar(productPriceWithoutDelivery)) + Number(deleteDollar(deliveryPrice));
            return product;
        });
        const stringTotalAmount = (addDollar(totalAmount)).toString();


        return (
            <div className="product-details-container">
                <div style={{"padding": "1rem"}}>
                    <ul className="list-group list-group-flush" style={{ "backgroundColor": "inherit", paddingTop: "20px"}}>
                            <li className="list-group-item font-weight-bold text-success" style={{ "backgroundColor": "inherit", "position": "relative", fontSize: "xx-large"}}>In Total
                            <span style={{ "position": "absolute", "right":"0", paddingRight: "20px"}}>{stringTotalAmount}</span></li>
                            <li className="list-group-item" style={{ "backgroundColor": "inherit", "position": "relative", "height": "3rem"}}><span style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large"}}>
                                <button onClick={() => buyAllProductsDotPay(stringTotalAmount)} type="button" className="btn btn-primary">BUY ALL</button>
                                </span></li>
                    </ul>
                </div>
            </div>
        )
    }

    const getMyCart = () => {
        let cartList = []
        if(cartsState) {
            cartList = JSON.parse(cartsState).map((product, index) => {
                const selectedProduct = books.find((book) => {
                    return book._id === product._id;
                });
                const productPriceWithoutDelivery = addDollar((Number(deleteDollar(selectedProduct?.price))*Number(product.amount)).toString());
                const deliveryPrice = selectedProduct.delivery[product.delivery].price;
                const totalAmount = addDollar(Number(deleteDollar(productPriceWithoutDelivery)) + Number(deleteDollar(deliveryPrice))).toString();
    
                return(
                    <div className="product-details-container" key={index}>
                        <h2 style={{"padding": "1rem", "position": "relative"}}>{selectedProduct.title}<span onClick={() => deleteProductFromCart(index) }style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large", cursor: "pointer"}}>X</span></h2>
                        <div style={{"padding": "1rem"}}>
                        <ul className="list-group list-group-flush" style={{ "backgroundColor": "inherit", paddingTop: "20px"}}>
                                <li className="list-group-item" style={{ "backgroundColor": "inherit", position: "relative"}}>Delivery Method:
                                <span className="font-weight-bold" style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large"}}>{product.delivery}</span></li>
                                <li className="list-group-item" style={{ "backgroundColor": "inherit", position: "relative"}}>Amount:
                                <span className="font-weight-bold" style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large"}}>{product.amount}</span></li>
                                <li className="list-group-item" style={{ "backgroundColor": "inherit", position: "relative"}}>Price:
                                <span className="font-weight-bold" style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large"}}>{productPriceWithoutDelivery}</span></li>
                                <li className="list-group-item" style={{ "backgroundColor": "inherit", position: "relative"}}>Delivery Cost:
                                <span className="font-weight-bold" style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large"}}>{deliveryPrice}</span></li>
                                <li className="list-group-item font-weight-bold text-success" style={{ "backgroundColor": "inherit", "position": "relative", fontSize: "xx-large"}}>Total
                                <span style={{ "position": "absolute", "right":"0", paddingRight: "20px"}}>{totalAmount}</span></li>
                                <li className="list-group-item" style={{ "backgroundColor": "inherit", "position": "relative", "height": "3rem"}}><span style={{ "position": "absolute", "right":"0", paddingRight: "20px", fontSize: "large"}}>
                                    <button onClick={() => buySelectedProductDotPay(product._id, index, totalAmount)} type="button" className="btn btn-primary">BUY NOW</button>
                                    </span></li>
                            </ul>
                        </div>
                    </div>
                )
            })
        }
        
        return (
            <div className="product-details-page">
                <img className="img-rounded img-list" src="line.png" alt="line.png"/>
                <div className="product-details-path">
                    <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Cart</div>
                    <div style={{"cursor": "pointer", "paddingRight": "30px"}} onClick={() => clearLocalStore()}> 
                    {localName ? `Log out ( ${localName} )` : <span onClick={() => history.push("/login")}>Log in</span>}</div>
                </div>
                {cartList}
                {getBuyAllFromCart()}
            </div>
        )
    }

    const getEmptyCart = () => {
        return(
            <div className="product-details-page">
            <img className="img-rounded img-list" src="line.png" alt="line.png"/>
            <div className="product-details-path">
                    <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Cart</div>
                    <div style={{"cursor": "pointer", "paddingRight": "30px"}} onClick={() => clearLocalStore()}> 
                    {localName ? `Log out ( ${localName} )` : <span onClick={() => history.push("/login")}>Log in</span>}</div>
            </div>
            <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
            
            <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                        <img style={{height: "40rem"}} className="img-rounded img-list" src="basket1.png" alt="basket1.png"/>
                        <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large"}}>Your card is empty. Check our latests offers <a href="/">HERE</a></div>
            </div>
            </div>
            </div>
        )
    }

    const getCart = () => {
        if(!cartsState) {
            return getEmptyCart();
        }
        return JSON.parse(cartsState).length>0 ? getMyCart() : getEmptyCart();
    }

    return (
        getCart()
    );
}

export default withTracker(() => {
    return {
      books: Books.find({}, { sort: { _id: -1 } }).fetch(),
    };
  })(Cart);