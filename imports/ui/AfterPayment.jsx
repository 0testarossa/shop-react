import React from 'react';

const AfterPayment = (props) => {
    const lessOperator = '<';
    const regex = /status=OK/;
    const url = window.location.href;
    const result = regex.test(url);
    if(result) {
        return(
            <div className="product-details-page">
            <img className="img-rounded img-list" src="line.png" alt="line.png"/>
            <div className="product-details-path">
                <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Cart</div>
            </div>
            <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
            <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                        <img style={{height: "40rem"}} className="img-rounded img-list" src="cash.png" alt="cash.png"/>
                        <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large"}}>How about checking our latests offers <a href="/">HERE</a></div>
                        <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large", top: "15rem"}} className="text-success">Thank you for your purchase.</div>
                        <img style={{position: "absolute", height: "8rem", width: "8rem", top: "6rem"}} className="img-rounded img-list" src="success.png" alt="success.png"></img>
            </div>
            </div>
            </div>
        )
    } else {
        return(
            <div className="product-details-page">
            <img className="img-rounded img-list" src="line.png" alt="line.png"/>
            <div className="product-details-path">
                <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Cart</div>
            </div>
            <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
            <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                        <img style={{height: "40rem"}} className="img-rounded img-list" src="cash.png" alt="cash.png"/>
                        <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large"}}>How about checking our latests offers <a href="/">HERE</a></div>
                        <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large", top: "15rem"}} className="text-danger">The payment was cancelled</div>
                        <img style={{position: "absolute", height: "8rem", width: "8rem", top: "6rem"}} className="img-rounded img-list" src="failed.png" alt="failed.png"></img>
            </div>
            </div>
            </div>
        )
    }
}

export default AfterPayment;
