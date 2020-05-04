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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async () => {
        console.log('this is handleSubmit function');
        console.log('@@@@@@@@@@@@@@@@@@@email@@@@@@@@@@@@@@@@@@@@')
        console.log(this.state.email)
        //const result = signUp(this.state.email, this.state.username, this.state.address, this.state.password);
        const result = signUp("78781099692@163.com", "123456", "luyun", "zheng");
        console.log(result);
      }

    handleSubmit2 = async () =>{
        console.log("this is handleSubmit2 function")
        console.log(this.state)
        //const result = signUp(this.state.email, this.state.username, this.state.address, this.state.password);
        //console.log(result);
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
                <form onSubmit={this.handleSubmit}>
                <div className="outerBox">
                    <TextInput label="Email" name='email' value={email} onChange={this.handleChange} /> 
                    <TextInput label="Username" name='username' value={username} onChange={this.handleChange}/>
                    <TextInput label="Address" name='address' value={address} onChange={this.handleChange}/>
                    <TextInput label="Password" name='password' value={password} onChange={this.handleChange}/>
                </div>
                <div className="submit-button">
                    <Button node="button" type="submit" waves="light" name="action">
                        submit1
                    </Button>
                </div>
                <div>
                    <button type="submit" name="action" > submit2 </button>
                </div>
                <div className="alreadyHaveAccount">
                    <a href='#'>Already Have an Account?</a>
                </div>
                <div>
                    <p>The email is: {email}</p>
                    <p>The password is: {password}</p>
                </div>
                </form>
            </div>
        </div>
    );
    }
};

export default SignUp;