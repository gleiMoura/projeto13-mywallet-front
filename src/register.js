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
                        Primeira vez? cadastre-se!
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
`