import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase-config'

export default function SignUP() {
    //create a function to add the user to the database
    const addUser = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(auth, email, password);
        window.location.href = "/login";
    }
    return (
        <div>
            <form onSubmit={addUser}>
                <input type="email" name="email" required placeholder="email"/>
                <input type="password" name="password" required placeholder="password"/>
                <button type="submit" >Sign Up</button>
            </form>
        </div>
    )
}
