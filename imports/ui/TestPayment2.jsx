import React from 'react';
import axios from "axios";
import useReactRouter from "use-react-router";

const TestPayment2 = () => {
    const { history } = useReactRouter();
    const url = "https://ssl.dotpay.pl/test_payment/payment_api/v1/register_order/"
    const data = {
        "order": {
            "amount": "1.00",
            "currency": "PLN",
            "description": "test"
        },
        "seller": {
            "account_id": "771935",
            "url": "http://localhost:3000/#/afterPayment"
        },
        "payer": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoemail@example.com"
        },
        "payment_method": {
            "channel_id": "73"
        },
        "request_context": {
                "ip": "127.0.0.1",
                "language": "pl"
        }
    }

    const doRequest = () => {
        
        axios({
            method: 'POST',
            url: url,
            headers: {"Accept":"application/json", "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}, 
            data: data,
            auth: {
                username: "amup5@poczta.onet.pl",
                password: "czeczuga5"
              }
          }).then(response => {
            // response.headers.add('Access-Control-Allow-Origin', '*')
            // return response;
            // console.log(response.data)
            // console.log(response.data.redirect);
            // console.log(response.data.redirect_simplified_url);
            // window.location.assign(response.data.redirect_simplified_url)
            if(response.status >= 200 && response.status < 300) {
                window.location.assign(response.data.redirect_simplified_url)
            } else {
                alert("ops! Something went wrong!");
            }
            console.log(response);
        }).catch(error => {
            console.log("MY ERROR");
            console.log(error);
          });
    }

    return (
        <>
        <div className="dotpay_form_donation">
        {/* <form action="https://amup5@poczta.onet.pl:czeczuga5@ssl.dotpay.pl/test_payment/payment_api/v1/register_order/" method="post" target="_parent"> */}
            {/* <div className="dp_temat">Wybierz kwotę darowizny</div> */}
            <>    
                <input type="text" name="order.amount" readOnly value="1.0"></input>
                <input type="text" name="order.currency" readOnly value="PLN"></input>
                <input type="text" name="order.description" readOnly value="test"></input>
                <input type="text" name="seller.account_id" readOnly value="771935"></input> 
                <input type="text" name="seller.url" readOnly value="http://localhost:3000/#/"></input>
                <input type="text" name="payer.first_name" readOnly value="John"></input>
                <input type="text" name="payer.last_name" readOnly value="Doe"></input>
                <input type="text" name="payer.email" readOnly value="johndoemail@example.com"></input>
                <input type="text" name="payment_method.channel_id" readOnly value="73"></input>
                <input type="text" name="request_context.ip" readOnly value="127.0.0.1"></input>
                <input type="text" name="request_context.language" readOnly value="pl"></input>
            </>
    
            {/* <p><br/><button onClick={() => doRequest()} className="dp_buttomDarowizna" id="dp_buttomDarowizna">Wpłać darowiznę</button></p> */}
            <p><br/><button onClick={() => doRequest()} className="dp_buttomDarowizna" id="dp_buttomDarowizna">Wpłać darowiznę</button></p>
        {/* </form> */}
        <div id="dp_kwota_alert" style={{"color":"red"}}></div>
    </div>
    <a href="https://google.pl">link</a>
    <div onClick={() => window.location.assign("https://google.pl")}>link2</div>
    </>
    )
}

export default TestPayment2;