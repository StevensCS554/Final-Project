import React, {Component} from 'react';
import signIn from "../Api/SignIn";

class SignIn extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn = () =>{
        const result = signIn(this.state.email, this.state.password);
        console.log("the result of signin of api : " + result);
        /*
        if(result){
            window.location.replace('/explore');
        }else{
            alert('Sorry, the email and the password is not match.')
        }
        */
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
    }

    render(){

        const { email } = this.state.email;
        const {password} = this.state.password;

        return(
        <div className="signInBox"> 
            <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
            />
            <input
                name="password"
                type="text"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
            />
            <button onClick={() => this.onSignIn()} type="submit" name="action">
                Sign In
            </button>
        </div>
        )
    }
    
}

export default SignIn;