import Logo from "./assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';



export default function Register() {
    const navigate = useNavigate();

    function SendData() {
        // inputs states
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [secondPassword, setSecondPassword] = useState("");

        //State to show the button loading
        const [loadbutton, setLoadButton] = useState(true);

        return (
            <>
                <input type="text" id="name" placeholder='nome' required onChange={(e) => setName(e.target.value)} />
                <input type="email" id='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder='senha (6 dígitos)' required onChange={(e) => setPassword(e.target.value)} />
                <input type="password" id="secondPassword" placeholder='senha (6 dígitos)' required onChange={(e) => setSecondPassword(e.target.value)} />

                <button className={loadbutton ? "" : "hide"} onClick={() => {
                    if (!name || !email || !password || !secondPassword) {
                        alert("Preecha todos os campos!");
                        navigate("/register")
                    } else if (password !== secondPassword) {
                        alert("As duas senhas devem ser iguais!");
                        navigate("/register")
                    } else {
                        setLoadButton(false)
                        const requestion = axios.post("https://mywallet.onrender.com/signUp", {
                            name: name,
                            email: email,
                            password: password
                        });
                        requestion.then(answer => {
                            console.log(answer.data);
                            alert("Usuário criado com sucesso!")
                            navigate("/");
                        })
                        requestion.catch(err => {
                            alert("dados inválidos!", err.data);
                            console.error(err.data);
                            setLoadButton(true);
                            navigate("/register");
                        })
                    }
                }}>Cadastrar</button>

                <button className={loadbutton ? "hide" : "loading"}>
                    <ThreeDots
                        height="80"
                        width="80"
                        color='white'
                        ariaLabel='loading'
                    />
                </button>

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
    .hide{
        display: none;
    }
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
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #A328D6;
        border: 1px solid rgb(140, 17, 190);
    }
`