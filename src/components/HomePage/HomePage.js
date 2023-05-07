import { useState } from 'react';
import './HomePage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
    const [errorLogin, setErrorLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/user", {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        .then(res => {
            navigation("/content")
            
        })
        .catch(error => {
            
            window.localStorage.removeItem("token");

        })
    }, [])

    function submit(event) {
        event.preventDefault();
        const data = {
            "username": username,
            "password": password
        }
        console.log(data.username);
        console.log(data.password);
        axios.post("http://localhost:8080/api/authenticate", data)
        .then(res => {
            // console.log(res.data.id_token)
            window.localStorage.setItem("token", res.data.id_token);
            navigation("/content");

        })
        .catch(err => {
            console.log("error");
            setErrorLogin("Your username or password is inscorrect");
            
        })
    }

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    return (
        <div className = "formLogin">
            <div className = "wrapper-login">
                <div className = "form-box-login">
                    <h2>Login</h2>
                    <form onSubmit={submit}>
                    <div className = "input-box">
                    <input type="text"
                    required
                    value = {username}
                    onChange={handleUsername}/>
                    <label>Username</label>
                    </div>
                    <div className = "input-box">
                    <input 
                    type="password" 
                    required
                    value = {password}
                    onChange={handlePassword}/>
                    <label>Password</label>
                    </div>
                    <button type = "submit" className = "btn">Login</button>
                    <div className = "error-msg">
                        <p>{errorLogin}</p>
                    </div>
                    <div className = "login-register"><p>Don't have an account? 
                    <a href = "/register" className = "register-link">Register</a>
                    </p></div>
                    </form>
                    </div>
            </div>
        </div>
    )


}