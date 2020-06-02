import React, {useState} from 'react'
import {books} from "./mockBooks"
import useReactRouter from "use-react-router";

const PaymentPage = () => {
    const paymentForm = () => {
        return (
            <>
            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                1
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                Account Number:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>98 1680 1235 0000 3000 1963 1703</div>
                </td>
            </tr>

            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                2
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                Recipient's Name:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>BookTower</div>
                </td>
            </tr>

            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                3
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                Address:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>Ikrita 25</div>
                </td>
            </tr>
            
            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                4
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                ZIP Code:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>64-000</div>
                </td>
            </tr>

            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                5
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                City:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>Koscian</div>
                </td>
            </tr>

            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                6
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                Title:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>Book Purchase</div>
                </td>
            </tr>

            <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                7
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "60%"}}>
                Amount:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                {/* <input className="form-control" style={{"width": "100%"}}value="5"></input> */}
                <div>Do dopisania</div>
                </td>
            </tr>
        </>
          )
    }

    const lessOperator = '<';
    return(
        <div className="product-details-page">
        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Payment</div>
        </div>
        <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
        <h2 style={{"padding": "1rem"}}>Purchase Details</h2>
        
        {/* <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                    <img style={{height: "40rem"}} className="img-rounded img-list" src="basket1.png" alt="basket1.png"/>
                    <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large"}}>Your card is empty. Check our latests offers <a href="/">HERE</a></div>
        </div> */}
        <table className="table table-hover table-striped table-dark">
          <tbody>
            {paymentForm()}
          </tbody>
        </table>
        </div>
        </div>
    )
}

export default PaymentPage;