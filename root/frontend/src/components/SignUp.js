import React from "react";
import {TextInput, Button, Icon} from "react-materialize";


function SignUp() {
    return(
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div className="vertical">
                <div className="createNewAccount">
                    <h3>Create a New Account</h3>
                </div>
                <div className="outerBox">
                    <TextInput id="SignUp-Email" label="Email"/>
                    <TextInput label="Username"/>
                    <TextInput label="Address"/>
                    <TextInput label="Password"/>
                </div>
                <div className="submit-button">
                    <Button node="button" type="submit" waves="light">
                        Submit
                    </Button>
                </div>
                <div className="alreadyHaveAccount">
                    <a href='#'>Already Have an Account?</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;