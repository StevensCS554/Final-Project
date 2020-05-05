import React, {Component} from 'react';
import signIn from "../Api/SignIn";

class SignIn extends Component{

    onSignIn = () =>{
        const result = signIn("18781099692@163.com", "123456");
      }

    render(){
        return(
        <div className="signInBox"> 
            <input
                name="email"
                type="text"
                placeholder="Email "
            />
            <input
                name="password"
                type="text"
                placeholder="Password"
            />
            <button onClick={() => this.onSignIn()} type="submit" name="action">
                Sign In
            </button>
        </div>
        )
    }
    
}

export default SignIn;