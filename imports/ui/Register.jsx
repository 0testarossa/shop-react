import React, { useState } from 'react';

const Register = (props) => {
    const lessOperator = '<';
    const [loginInput, setLoginInput] = useState(""); 
    const [passwordInput, setPasswordInput] = useState(""); 

    const onChangeLoginInput = (event) => {
        const data = event.target.value
        setLoginInput(prveiousValue => setLoginInput(data));
    }
    const onChangePasswordInput = (event) => {
        const data = event.target.value
        setPasswordInput(prveiousValue => setPasswordInput(data));
    }

    const paymentForm = () => {
        return (
            <>
            <tr style={{height: "60px"}}>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "30%"}}>
                Login:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "center"}}>
                <input className="form-control" style={{"width": "100%"}}value={loginInput} onChange={(event) => onChangeLoginInput(event)}></input>
                </td>
            </tr>

            <tr style={{height: "60px", backgroundColor: "rgba(255,255,255,.05)"}}>
                <td style={{"textAlign": "center", "verticalAlign": "middle", "width": "30%"}}>
                Password:
                </td>
                <td className="text-success font-weight-bold" style={{"verticalAlign": "middle", "textAlign": "center"}}>
                <input type="password" className="form-control" style={{"width": "100%"}}value={passwordInput} onChange={(event) => onChangePasswordInput(event)}></input>
                </td>
            </tr>
        </>
          )
    }

    return (
        <div className="product-details-page">
        <img className="img-rounded img-list" src="line.png" alt="line.png"/>
        <div className="product-details-path">
            <div style={{"paddingLeft": "30px"}}><span className="font-weight-bold"><a href="/">Home</a>  </span> {lessOperator} Register</div>
        </div>
        <div className="product-details-container" style={{padding: "50px 10px", backgroundColor: "rgba(255,255,255,.09)"}}>
            <div style={{padding: "0px 200px"}}>
                <h2 style={{"padding": "1rem"}}>Register now</h2>
                <table className="table table-striped table-dark" style={{borderCollapse: "separate",borderSpacing: "0 20px"}}>
                <tbody>
                    {paymentForm()}
                </tbody>
                </table>
                <div className="d-flex" style={{width: "100%", justifyContent: "center"}}>
                    <div style={{width: "60%", fontWeight: "900"}} type="button" className="btn btn-primary" >Register</div>
                </div>
                <div style={{padding: "30px 0px"}}>Have account? Log in <a href="/#/login">HERE</a> now</div>
            </div>
        </div>
        </div>
    )
}

export default Register;