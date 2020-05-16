import React from 'react'
import { Link } from 'react-router-dom';

export default function error404(props) {
    return (
        <div>
            <h1> Oops something wrong in the server: {props.match.params.message}</h1>
            <br />
            <Link to="/explore">Go to main page</Link>
        </div>
    )
}