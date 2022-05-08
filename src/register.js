import Logo from "./assets/logo.png";
import { Link } from 'react-router-dom';
import { useState } from "react";
import styled from 'styled-components';

export default function Register() {
    function SendData() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [secondPassword, setSecondPassword] = useState("");

        return (
            <>
                <input type="text" id="name" placeholder='nome' required onChange={(e) => setName(e.target.value)} />
                <input type="email" id='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder='senha (6 dígitos)' required onChange={(e) => setPassword(e.target.value)} />
                <input type="password" id="password" placeholder='senha (6 dígitos)' required onChange={(e) => setSecondPassword(e.target.value)} />

                <button>Cadastrar</button>

                <p>
                    <Link to="/">
                        Já tem conta? Entre agora!
                    </Link>
                </p>
            </>

        )
    }
    return (
        <RegisterStyled>
            <header>
                <img src={Logo} alt="Logo do myWallet" />
            </header>
            <form>
                <SendData />
            </form>
        </RegisterStyled>
    )
}

const RegisterStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background-color: rgb(140, 17, 190);
    header{
        margin-top: 95px;
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
`