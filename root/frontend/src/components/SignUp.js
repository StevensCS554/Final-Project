import React, {Component} from "react";
import {TextInput, Button, Icon} from "react-materialize";
import {userRef} from "../firebase";
import signUp from "../Api/SignUp";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            address: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp = () =>{
        const result = signUp(this.state.email, this.state.username, this.state.address, this.state.password);
      }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
    }

    render(){
        const { email } = this.state.email;
        const {password} = this.state.password;
        const {username} = this.state.username;
        const {address} = this.state.address;
    return(
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div className="vertical">
                <div className="createNewAccount">
                    <h3>Create a New Account</h3>
                </div>
                <div className="outerBox">
                    <TextInput label="Email" name='email' value={email} onChange={this.handleChange} /> 
                    <TextInput label="Username" name='username' value={username} onChange={this.handleChange}/>
                    <TextInput label="Address" name='address' value={address} onChange={this.handleChange}/>
                    <TextInput label="Password" name='password' value={password} onChange={this.handleChange}/>
                </div>
                <div className="submit-button">
                    <Button onClick={() => this.onSignUp()} node="button" type="submit" waves="light" name="action">
                        submit
                    </Button>
                </div>
                <div className="alreadyHaveAccount">
                    <a href='#'>Already Have an Account?</a>
                </div>
            </div>
        </div>
    );
    }
};

export default SignUp;