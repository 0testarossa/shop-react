import React, {useState} from 'react'
import useReactRouter from "use-react-router";

const PaymentPage = (props) => {
    console.log("payment props");
    console.log(props);
    const [localName, setLocalName] = useState(localStorage.getItem("user"));
    const productId = props.location?.state?.productId;
    const productPrice = props.location?.state?.productPrice;
    const { history } = useReactRouter();
    const clearLocalStore = () => {
        localStorage.clear();
        setLocalName("");
    }

    const backToHomepage = () => {
        history.push("/");
    }

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
                <div>{productPrice}</div>
                </td>
            </tr>
        </>
          )
    }

    const getPaymentPage = () => {
        if(productPrice) {
            return (
                <>
                <h2 style={{"padding": "1rem"}}>Purchase Details</h2>
                <table className="table table-hover table-striped table-dark">
                <tbody>
                    {paymentForm()}
                </tbody>
                </table>
                <div className="d-flex" style={{width: "100%", justifyContent: "center", paddingTop: "1rem"}}>
                    <div onClick={(event) => backToHomepage(event)} style={{width: "60%", fontWeight: "900", height: "3rem"}} type="button" className="btn btn-primary" >Back to Shop</div>
                </div>
                </>
            );
        } else {
            return (
                <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                        <img style={{height: "40rem"}} className="img-rounded img-list" src="redirect.png" alt="basket1.png"/>
                        <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large"}}>You shoudn't be here. Please, go to our <a href="/">SHOP</a></div>
                </div>
            )
        }
    }

    const lessOperator = '<';
    return(
        <div className="product-details-page">
        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Payment</div>
            <div style={{"cursor": "pointer", "paddingRight": "30px"}} onClick={() => clearLocalStore()}> 
            {localName ? `Log out ( ${localName} )` : <span onClick={() => history.push("/login")}>Log in</span>}</div>
        </div>
        <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
            {getPaymentPage()}
        </div>
        </div>
    )
}

export default PaymentPage;