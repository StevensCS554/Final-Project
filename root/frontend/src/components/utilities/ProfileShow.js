import React, { useState, useEffect, useContext } from 'react';
// can't import images outside src folder
import profile from '../../images/team-bg.jpeg';
import { AuthContext } from '../../firebase/Auth';

export default function ProfileForm(props) {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        // document.getElementById("upload-profile-btn").addEventListener("click", createGroup);
        async function get() {
            try {
                const user = await fetch(`http://localhost:4000/users/getUserByUsername/${props.username}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // error handle! 
                if (!user.ok)
                    throw `error in user info fetching with name! status:${user.status}, statusText:${user.statusText} message:${await user.json().then((error) => {
                        return error;
                    })}`
                const resolved = await user.json();
                setUserData(resolved);
                return;
            } catch (e) {
               window.location.href = `http://localhost:3000/error/${e}`
            }
        }
        get();
    }, [props.username]);

    const createChatHref = (chatUserName) => {
        if (chatUserName && chatUserName !== currentUser.displayName) {
           let roomName = [currentUser.displayName, chatUserName];
           return 'localhost:3000/chat/' + roomName.sort().join('');
        }
     };

    return (
        <div id='profileShow-container'>
            <div id='profileShow-img'>
                <img src={( userData && userData.profileUrl )|| profile} alt="user avatar" />
            </div>
            <div id='profileShow-info'>
                <p type='text' name='username' id='username'>USERNAME: {userData && userData.username}</p>
                <p name="gender" id="gender">GENDER: {userData && userData.gender}</p>
                <p type='number' name='age' id='age' >AGE: {userData && userData.age}</p>
                <p type='text' name='zipcode' id='zipcode' >ZIPCODE: {userData && userData.zipcode}</p>
                <p type='tel' name='cellphone' id='cellphone' >PHONE: {userData && userData.phone}</p>
                <p type='tel' name='bio' id='bio' >BIO: {userData && userData.bio ? userData.bio : "NONE"}</p>
                <p><a href={createChatHref(userData && userData.username)} target='_blank'>MESSAGE</a></p>
            </div>
        </div>
    )
}
