import React ,{useState } from 'react'
import { auth } from '../firebase-config';
import  {  signInWithEmailAndPassword} from "firebase/auth";
import { Link } from 'react-router-dom';

export default function Login() {
    //create Login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    //create Login
    const processLogin = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Enter a email');
            return;
        }
        if (!password.trim()) {
            setError('Enter a password');
            return;
        }
        setError(null);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setEmail('');
                setPassword('');
                setError(null);
                window.location.href = "/";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                if (errorCode === 'auth/invalid-email') {
                    setError('Email incorrect');
                }
                if (errorCode === 'auth/user-not-found') {
                    setError('User not found');
                }
                if (errorCode === 'auth/wrong-password') {
                    setError('password incorrect');
                }
            });
    }
    //create Login
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
            <h3 className="text-center">Login</h3>
            <hr />
            
                    <form onSubmit={processLogin}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Enter a email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Enter a password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <Link to="/signup" >Sign Up</Link> 
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>   
    )
}