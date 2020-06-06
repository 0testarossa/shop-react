import React, { useState } from 'react';
import axios from "axios";
import useReactRouter from "use-react-router";
import CurrencyInput from 'react-currency-input-field';
import Select from "react-dropdown-select";
import {useStateWithLocalStorage} from './Storage';
import { Books } from '../api/books.js';
import { withTracker } from 'meteor/react-meteor-data';


const PaymentForm = (props) => {
    const books = props.books;
    const [localName, setLocalName] = useState(localStorage.getItem("user"));
    const [cartsState, setCartsState] = useStateWithLocalStorage('cart')
    const productId = props.location?.state?.productId;
    const productPrice = props.location?.state?.productPrice;
    const lessOperator = '<';

    const clearLocalStore = () => {
        localStorage.clear();
        setLocalName("");
      }

    const deleteDollar = (amount) => {
        if(amount) {
            const correctNumber = amount.split("").map((char) => {
                if(char !== "$") {
                    return char
                } else {
                    return ""
                }
            })
            return correctNumber.join("");
        } else {
            return "";
        }
    }

    const { history } = useReactRouter();
    const url = "https://ssl.dotpay.pl/test_payment/payment_api/v1/register_order/"
    const [amount, setAmount] = useState(deleteDollar(productPrice));
    const [currency, setCurrency] = useState("USD");
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("johndoemail@poczta.onet.pl");
    const [channel, setChannel] = useState();
    const [description, setDescription] = useState("");

    const options = [
        {name: "PLN"},
        {name: "BGN"},
        {name: "CHF"},
        {name: "CZK"},
        {name: "EUR"},
        {name: "GBP"},
        {name: "HRK"},
        {name: "HUF"},
        {name: "JPY"},
        {name: "NOK"},
        {name: "RON"},
        {name: "RUB"},
        {name: "SEK"},
        {name: "UAH"},
        {name: "USD"},
    ]

    const allChannels = [["1","2","4","6","36"],["38","44","45","46","50"],["51","60","65","66","70"],["73","74","75","76","80"],["81","83","84","93"]];
    const baseChannelUrl = "https://www.dotpay.pl/developer/doc/api_payment/pl/_images/channel_";

    const getAllChannels = () => {
        const myAllChannels = allChannels.map((channelArray, index) => {
            const channelRow = channelArray.map((localChannel) => {
                return (
                    <div onClick={() => setChannel(localChannel)} className="col d-flex" style={{alignItems: "center", justifyContent: "center",
                    border: channel===localChannel ? "white solid" :"black solid",borderRadius: "1rem", margin: "0.5rem"}}>
                     <img style={{height: "7rem", width: "8rem"}} className="img-rounded img-list" src={baseChannelUrl + localChannel + ".png"} alt="channel.png"/></div>
                )
            })

            return <div className="row">{channelRow}</div>
        })
        return myAllChannels;
    }

    const tryRequest = () => {
        if(amount && currency && firstName && lastName && email && channel) {
            doRequest();
        } else {
            alert("Please, fill data form");
        }
    }

    const doRequest = () => {
        const request_context = {
            "ip": "127.0.0.1",
            "language": "pl"
        }
        const seller = {
            "account_id": "771935",
            "url": "http://localhost:3000/#/afterPayment"
        }
        const order = {
            amount,
            currency,
            description
        }
        const payer = {
            first_name: firstName,
            last_name: lastName,
            email
        }
        const payment_method = {
            "channel_id": channel
        }

        const myData = {
            order,
            seller,
            payer,
            payment_method,
            request_context
        }
        const auth = {
            username: "amup5@poczta.onet.pl",
            password: "czeczuga5"
        }
        
        if(productId === "all") {
            setCartsState(previousValue => setCartsState(JSON.stringify([])));
        } else {
            const updatedArray = JSON.parse(cartsState).filter((product, index) => {
                return index !== productId;
            })
            setCartsState(previousValue => setCartsState(JSON.stringify(updatedArray)));
        }

        axios({
            method: 'POST',
            url: url,
            headers: {"Accept":"application/json", "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}, 
            data: myData,
            auth
          }).then(response => {
            if(response.status >= 200 && response.status < 300) {
                window.location.assign(response.data.redirect_simplified_url)
            } else {
                alert("ops! Something went wrong!");
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
          });
    }

    const getForm = () => {
        return (
            <>
            <div className="site-pages d-flex flex-column" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                <table className="table table-hover table-striped table-dark">
                <tbody>
                <tr style={{height: "60px"}}>
                <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                1
                </th>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "40%"}}>
                First Name:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                <input className="form-control" style={{"width": "100%"}} type="text" onChange={(value) => setFirstName(value)} value={firstName}></input>
                </td>
                </tr>

                <tr style={{height: "60px"}}>
                    <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                    2
                    </th>
                    <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "40%"}}>
                    Last Name:
                    </td>
                    <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                    <input className="form-control" style={{"width": "100%"}} type="text" onChange={(value) => setLastName(value)}  value={lastName}></input>
                    </td>
                </tr>

                <tr style={{height: "60px"}}>
                    <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                    3
                    </th>
                    <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "40%"}}>
                    Email:
                    </td>
                    <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                    <input className="form-control" style={{"width": "100%"}} type="email" onChange={(value) => setEmail(value)}  value={email}></input>
                    </td>
                </tr>
                
                <tr style={{height: "60px"}}>
                    <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                    4
                    </th>
                    <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "40%"}}>
                    Amount:
                    </td>
                    <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                    <div> {/* amount */}
                    <CurrencyInput
                    className="form-control"
                    id="input-example"
                    name="input-name"
                    placeholder="1,000"
                    defaultValue={1}
                    allowDecimals={true}
                    decimalsLimit={2}
                    value={amount}
                    readOnly
                    style={{"width": "100%"}}
                    /></div>
                    </td>
                </tr>

                <tr style={{height: "60px"}}>
                    <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                    5
                    </th>
                    <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "40%"}}>
                    Currency:
                    </td>
                    <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                    <div> {/* PLN */}
                    <Select style={{"background": "white"}}
                    options={options} onChange={(values) => setCurrency(values[0].name)} labelField="name" values={[{name: "USD"}]}/></div>
                    </td>
                </tr>

                <tr style={{height: "60px"}}>
                    <th style={{"verticalAlign": "middle", "textAlign": "center", paddingLeft: "1rem", paddingRight: "0rem", width: "1%"}}>
                    6
                    </th>
                    <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "40%"}}>
                    Description:
                    </td>
                    <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "left"}}>
                    <textarea onChange={(event) => setDescription(event.target.value)}className="form-control" style={{"width": "100%"}} id="" name="" rows="4" cols="50" placeholder="Payment description"></textarea>
                    </td>
                </tr>
                </tbody>
                </table>
                {getAllChannels()}
                <div style={{width: "100%"}}>
                <p><br/><button onClick={() => tryRequest()} style={{width: "100%", fontWeight: "900"}} type="button" className="btn btn-primary">Pay Now</button></p>
                </div>
            </div>
        </>
        )
    }

    const getEmptyForm = () => {
        return (
                <div className="site-pages d-flex" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                                <img style={{height: "40rem"}} className="img-rounded img-list" src="redirect.png" alt="basket1.png"/>
                                <div style={{position: "absolute", fontWeight: "700", fontSize: "xx-large"}}>You shoudn't be here. Please, go to our <a href="/">SHOP</a></div>
                </div>
        )
    }

    const getPageContent = () => {
        if(productId !== undefined && productPrice) {
            return getForm()
        } else {
            return getEmptyForm()
        }
    }

    return (
        <div className="product-details-page">
        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Payment</div>
            <div style={{"cursor": "pointer", "paddingRight": "30px"}} onClick={() => clearLocalStore()}> 
            {localName ? `Log out ( ${localName} )` : <span onClick={() => history.push("/login")}>Log in</span>}</div>
        </div>
        <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
            {getPageContent()}
        </div>
        </div>
    )
}

export default withTracker(() => {
    return {
      books: Books.find({}, { sort: { _id: -1 } }).fetch(),
    };
  })(PaymentForm);
