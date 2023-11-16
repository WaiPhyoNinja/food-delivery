"use client";
import styles from 'styles/Home.module.css'
// import React, { useState } from 'react'
// import axios from 'axios'

// const API_URL = "http://localhost:8000/test_laravel/api/";

import { useState } from "react";

export default function Login() {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let login_token = null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": `multipart/form-data`
        };

        let data = new FormData();
        data.append('username', username);
        data.append('password', password);

        let result = await axios({
            method: 'post',
            url: 'login-verify',
            baseURL: API_URL,
            data: data,
            headers: headers,
        });

        let response = result.data;

        if (response['success']) {
            console.log("Login Successful");
            login_token = response['token'];
        } else {
            console.log("Failed to Login");
        }

    }

    const get_user = async () => {

        if (login_token) {
            const headers = {
                "Authorization": `Bearer ${login_token}`
            };

            let result = await axios({
                method: 'get',
                url: 'auth-user',
                baseURL: API_URL,
                data: JSON.stringify({}),
                headers: headers,
            });

            let response = result.data;

            console.log("get_user", response);

        } else {
            console.log("Login Token is empty");
        }

    }

    return (
        <div>
            <div className={styles.screen-1}>
                <div className="email">
                    <label for="email">Email Address</label>
                    <div className="sec-2">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" name="email" placeholder="Username@gmail.com" />
                    </div>
                </div>
                <div className="password">
                    <label for="password">Password</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="password" name="password" placeholder="············" />
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <button className="login">Login</button>
                <div className="footer"><span>Sign up</span><span>Forgot Password?</span></div>
            </div>
        </div>
    )
}
