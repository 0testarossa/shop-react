import React, {useState} from 'react'
import useReactRouter from "use-react-router";
import {carts} from "./mockCart";

const Cart = (props) => {
    const { history } = useReactRouter();

    const getMyCart = () => {
        return(
            <div className="product-details-page">
            <img className="img-rounded img-list" src="line.png" alt="line.png"/>
            <div className="product-details-path">
                <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a></span></div>
            </div>
        {/* <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
          
          <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>

          </div>
        </div> */}

            <div className="product-details-container">
                <h2 style={{"padding": "1rem"}}>Details</h2>
                <div style={{"padding": "1rem"}}>
                <ul className="list-group list-group-flush" style={{ "backgroundColor": "inherit", paddingTop: "50px"}}>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit", "position": "relative"}}><span className="font-weight-bold">cos2</span ><span style={{ "position": "absolute", "right":"0"}}>cos</span></li>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">author: </span>cos3</li>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">genre: </span>cos4</li>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">price: </span>cos5</li>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">state: </span>cos6</li>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit"}}><span className="font-weight-bold">delivery time: </span>cos7</li>
                        <li className="list-group-item" style={{ "backgroundColor": "inherit"}}>As the shooting light and color displays, actual product and photos may have some differences. Contact us in order to get additional photos of our product.</li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }

    const getEmptyCart = () => {
        return(
            <div className="product-details-page">
            <img className="img-rounded img-list" src="line.png" alt="line.png"/>
            <div className="product-details-path">
                <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a></span></div>
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
        return carts.length>0 ? getMyCart() : getEmptyCart();
    }

    return (
        getCart()
    );
}

export default Cart;