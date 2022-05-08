import styled from 'styled-components';
import { useState, useContext } from "react";
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import dataContext from "./dataContext";



export default function Finance() {
    const navigate = useNavigate();

    const { data } = useContext(dataContext);

    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    };

    //Entry states
    const [entryValue, setEntryValue] = useState('');
    const [entryDescription, setEntryDescription] = useState('');

    //Exit states
    const [exitValue, setExitValue] = useState('');
    const [exitDescription, setExitDescription] = useState('');

    //State with a boolean to change the screen of the page
    const [entryBoolean, setEntryBoolean] = useState(true);
    const [exitBoolean, setExitBoolean] = useState(true);

    //State to show the button loading
    const [loadbutton, setLoadButton] = useState(true);

    //State to get all finance information
    const [financeInformation, setFinanceInformation] = useState([]);

    return (
        <>
            <FinanceStyle>
                <main className={!entryBoolean || !exitBoolean ? "hide" : "main"}>
                    <header>
                        <h1>Olá, Fulano</h1>
                        <ion-icon name="log-out-outline"></ion-icon>
                    </header>
                    
                    <div className={financeInformation.length === 0 ? "finance" : "hide"}>
                        <p>Não há registros de entradas ou saídas</p>
                    </div>
                    <div className={financeInformation.length !== 0 ? "full-finance" : "hide"}>
                        
                    </div>

                    <footer>
                        <div className='square' onClick={(e) => {
                            setEntryBoolean(false);
                        }}>
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <h2>Novas Entradas</h2>
                        </div>
                        <div className='square' onClick={(e) => {
                            setExitBoolean(false);
                        }}>
                            <ion-icon name="remove-circle-outline"></ion-icon>
                            <h2>Novas Entradas</h2>
                        </div>
                    </footer>
                </main>

                <div className={!entryBoolean ? "entry" : "hide"}>
                    <header>
                        <h1>Nova Entrada</h1>
                    </header>
                    <form>
                        <input type="number" id='entry-number' placeholder='Valor' required onChange={(e) => {
                            setEntryValue(e.target.value);
                        }} />
                        <input type="text" id="entry-description" placeholder='Descrição' required onChange={(e) => setEntryDescription(e.target.value)} />

                        <button className={loadbutton ? "" : "hide"} onClick={(e) => {
                            if (!entryValue || !entryDescription) {
                                alert("Preencha ambos os campos!");
                                if (window.confirm('Você quer sair?')) { setEntryBoolean(true) }
                            } else {
                                setLoadButton(false)
                                const requestion = axios.post("https://localhost:5000/myFinance", {
                                    type: "entry",
                                    value: entryValue,
                                    description: entryDescription
                                }, config);
                                requestion.then(answer => {
                                    setFinanceInformation([...financeInformation, answer.data]);
                                    setEntryBoolean(true)
                                })
                                requestion.catch(err => {
                                    alert("dados inválidos!", err.data);
                                    setLoadButton(true);
                                    setEntryBoolean(true)
                                })
                            }

                        }}>Salvar Entrada</button>

                        <button className={loadbutton ? "hide" : "loading"}>
                            <ThreeDots
                                height="80"
                                width="80"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button>
                    </form>
                </div>

                <div className={!exitBoolean ? "exit" : "hide"}>
                    <header>
                        <h1>Nova Saída</h1>
                    </header>
                    <form>
                        <input type="number" id='number' placeholder='Valor' required onChange={(e) => {
                            setExitValue(e.target.value);
                        }} />
                        <input type="text" id="description" placeholder='Descrição'
                            onChange={(e) => setExitDescription(e.target.value)} />

                        <button className={loadbutton ? "" : "hide"} onClick={(e) => {
                            if (!exitValue || !exitDescription) {
                                alert("Preencha ambos os campos!");
                                if (window.confirm('Você quer sair?')) { setExitBoolean(true) };
                            } else {
                                setLoadButton(false)
                                const requestion = axios.post("https://localhost:27017/data", {
                                    type: "exit",
                                    value: exitValue,
                                    description: exitDescription
                                }, config);
                                requestion.then(answer => {
                                    setFinanceInformation([...financeInformation, answer.data]);
                                    setExitBoolean(true)
                                })
                                requestion.catch(err => {
                                    alert("dados inválidos!", err.data);
                                    setLoadButton(true);
                                    setExitBoolean(true)
                                })
                            }
                        }}>Salvar Entrada</button>
                    </form>

                    <button className={loadbutton ? "hide" : "loading"}>
                        <ThreeDots
                            height="80"
                            width="80"
                            color='white'
                            ariaLabel='loading'
                        />
                    </button>
            </div>
        </FinanceStyle>
        </>
    )
}

const FinanceStyle = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background-color: rgb(140, 17, 190);
    .hide{
        display: none;
    }
    header{ 
        width: 360px;
        margin-top: 25px;
        margin-bottom: 22px;
        padding-left: 20px;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ion-icon{
        font-size: 26px;
        font-family: 'Raleway';
        font-weight: 700;
        color: white;
        cursor: pointer;
    }
    h1{
        font-size: 26px;
        font-family: 'Raleway';
        font-weight: 700;
        color: white;
    }
    .finance{
        width: 326px;
        height: 446px;
        background-color: white;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .finance p{
        width: 180px;
        height: 46px;
        font-size: 20px;
        font-weight: 400;
        font-family: 'Raleway';
        color: #868686;
    }
    footer{
        width: 326px;
        display: flex;
        justify-content: space-between;
    }
    .square{
        width: 155px;
        height: 114px;
        background-color: #A328D6;
        margin: 15px 0;
        border-radius: 5px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
    }
    h2{
        width: 50%;
        font-size: 15px;
        font-family: 'Raleway';
        font-weight: 700;
        color: white;
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
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #A328D6;
        border: 1px solid rgb(140, 17, 190);
    }
`


