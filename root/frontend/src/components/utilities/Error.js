import React from 'react'
import { Link } from 'react-router-dom';

export default function error404(props) {
    return (
        <div>
            <h1> 404 ! Not Found! {props.message}</h1>
            <br />
            <Link to="/">Go to Home </Link>
        </div>
    )
}