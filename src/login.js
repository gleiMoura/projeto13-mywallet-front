import Logo from "./assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

export default function Login({setData}) {
    const navigate = useNavigate();

    //Inputs states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //State to show the button loading
    const [loadbutton, setLoadButton] = useState(true);

    return (
        <Loginstyle>
            <header>
                <img src={Logo} alt="logo do trackIt" />
            </header>
            <form>
                <input type="email" id='email' placeholder='email' required onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input type="password" id="password" placeholder='senha' required onChange={(e) => setPassword(e.target.value)} />

                <button className={loadbutton ? "" : "hide"} onClick={(e) => {
                    if (!email || !password) {
                        alert("Preencha os dois campos!");
                        navigate("/");
                    } else {
                        setLoadButton(false)
                        const requestion = axios.post("https://mywallet.onrender.com/signIn", {
                            email: email,
                            password: password
                        });
                        requestion.then(answer => {
                            setData(answer.data);
														localStorage.setItem("data", JSON.stringify(answer.data)); 
                            navigate("/finance")
                        })
                        requestion.catch(err => {
                            alert("dados inválidos!", err.data);
                            setLoadButton(true);
                            navigate("/");
                        })
                    }
                    e.preventDefault();
                }}>Entrar</button>

                <button className={loadbutton ? "hide" : "loading"}>
                    <ThreeDots
                        height="80"
                        width="80"
                        color='white'
                        ariaLabel='loading'
                    />
                </button>
                <p>
                    <Link to="/register">
                        Não tem uma conta? Cadastre-se
                    </Link>
                </p>
            </form>
        </Loginstyle>
    )
}

const Loginstyle = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background-color: rgb(140, 17, 190);
    .hide{
        display: none;
    }
    header{
        margin-top: 160px;
        margin-bottom: 24px;
    }
    form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    input{
        width: 326px;
        height: 58px;
        background-color: #FFF;
        border: 1px solid #D4D4D4;
        padding: 10px;
        text-align: left;
        margin-bottom: 13px;
        font-family: 'Raleway';
        font-size: 20px;
        border-radius: 5px;
        color: #000;
    }
    input:placeholder-shown{
        font-family: 'Raleway';
    }
    button{
        width: 326px;
        height: 46px;
        background-color: #A328D6;
        border-radius: 5px;
        margin-bottom: 25px;
        cursor: pointer;
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 20px;
        color: white;
        border: none;
    }
    p{
        font-family: 'Raleway';
        font-size: 14px;
        color: #52B6FF;
        cursor: pointer;
    }
    a{
        text-decoration: none;
        color: white;
    }
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #A328D6;
        border: 1px solid rgb(140, 17, 190);
    }
`