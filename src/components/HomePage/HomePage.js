import { useState } from 'react';
import './HomePage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {

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

    function submit() {
        const data = {
            "username": username,
            "password": password
        }

        axios.post("http://localhost:8080/api/authenticate", data)
        .then(res => {
            // console.log(res.data.id_token)
            window.localStorage.setItem("token", res.data.id_token);
            navigation("/content");

        })
        .catch(err => {
            console.log("error");
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
            <div className = "wrapper">
                <div className = "form-box-login">
                    <h2>Login</h2>
                    <form onSubmit={submit}>
                    <div className = "input-box">
                    <input type="text"
                    required
                    onChange={handleUsername}/>
                    <label>Username</label>
                    </div>
                    <div className = "input-box">
                    <input 
                    type="password" 
                    required
                    onChange={handlePassword}/>
                    <label>Password</label>
                    </div>
                    <button type = "submit" className = "btn">Login</button>
                    </form>
                    </div>
            </div>
        </div>
    )


}