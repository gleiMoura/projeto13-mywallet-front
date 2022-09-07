import styled from 'styled-components';
import { useState, useContext, useEffect } from "react";
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import dataContext from "./dataContext";



export default function Finance() {
    const navigate = useNavigate();

    const { data } = useContext(dataContext);

    const token = data.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
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

    // variable to get the result of finance sum
    let total = 0;
    financeInformation.forEach(element => {
        if (element.type === "entry") {
            total = total + parseInt(element.value);
        } else if (element.type === "exit") {
            total = total - parseInt(element.value);
        }
    });

    useEffect(() => {
        const requestion = axios.get("https://mywallet.onrender.com/myFinance", config);
        requestion.then(answer => {
            setFinanceInformation(answer.data);
        })
        requestion.catch(err => {
            console.error(err.data)
        })
    }, []);

    return (
        <>
            <FinanceStyle>
                <main className={!entryBoolean || !exitBoolean ? "hide" : "main"}>
                    <header>
                        <h1>Olá, {data.name}</h1>
                        <ion-icon className='logout' name="log-out-outline" onClick={(e) => {
                            if (window.confirm('Você quer sair do aplicativo?')) {
                                const requestion = axios.post("https://mywallet.onrender.com/logout","", config);
                                requestion.then(answer => {
                                    navigate("/")
                                    console.log(answer.data);
                                })
                                requestion.catch(err => {
                                    alert("logout falhou!", err)
                                });
                            };
                        }}></ion-icon>
                    </header>

                    <div className={financeInformation.length === 0 ? "finance" : "hide"}>
                        <p>Não há registros de entradas ou saídas</p>
                    </div>
                    <div className={financeInformation.length >= 1 ? "full-finance" : "hide"}>
                        {financeInformation.map(element => {
                            return (
                                <div className='finance-element'>
                                    <p><span>{element.date}</span> {element.description}</p>
                                    <p className={element.type === "entry" ? "entry" : "exit"}>{element.value}</p>
                                </div>
                            )
                        })}

                        <div className='total-element'>
                            <p className='balance'>Saldo</p>
                            <p className={total < 0 ? "exit" : "entry"}>{total}</p>
                        </div>
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
                            <h2>Novas Saídas</h2>
                        </div>
                    </footer>
                </main>

                <div className={!entryBoolean ? "entry" : "hide"}>
                    <header>
                        <h1>Nova Entrada</h1>
                    </header>
                    <form>
                        <input type="text" id='entry-number' placeholder='Valor' required onChange={(e) => {
                            setEntryValue(e.target.value);
                        }} />
                        <input type="text" id="entry-description" placeholder='Descrição' required onChange={(e) => setEntryDescription(e.target.value)} />

                        <button className={loadbutton ? "" : "hide"} onClick={(e) => {
                            if (!entryValue || !entryDescription) {
                                alert("Preencha ambos os campos!");
                                if (window.confirm('Você quer sair?')) { setEntryBoolean(true) }
                            } else {
                                setLoadButton(false)
                                const requestion = axios.post("https://mywallet.onrender.com/myFinance", {
                                    type: "entry",
                                    value: entryValue,
                                    description: entryDescription
                                }, config);
                                requestion.then(answer => {
                                    setFinanceInformation([...financeInformation, answer.data]);
                                    setEntryBoolean(true);
                                    setLoadButton(true);
                                })
                                requestion.catch(err => {
                                    alert("dados inválidos!", err.data);
                                    setLoadButton(true);
                                    setEntryBoolean(true);
                                });
                                e.preventDefault();
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
                                const requestion = axios.post("https://mywallet.onrender.com/myFinance", {
                                    type: "exit",
                                    value: exitValue,
                                    description: exitDescription
                                }, config);
                                requestion.then(answer => {
                                    setFinanceInformation([...financeInformation, answer.data]);
                                    setExitBoolean(true);
                                    setLoadButton(true);
                                })
                                requestion.catch(err => {
                                    alert("dados inválidos!", err.data);
                                    setLoadButton(true);
                                    setExitBoolean(true)
                                });
                                e.preventDefault();
                            }
                        }}>Salvar Saída</button>
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
height: 120vh;
display: flex;
flex-direction: column;
align-items: center;
padding-left: 33px;
background-color: rgb(140, 17, 190);
    .hide{
        display: none;
    }
    header{ 
        width: 360px;
				margin: 25px 0 22px 0;
				padding-right: 33px;
        display: flex;
        justify-content: space-between;
        align-items: center;
				position: relative;
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
    .finance-element{
        display: flex;
        justify-content: space-between;
    }
    .total-element{
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 5px;
        left: 10px;
        right: 10px;
    }
    .balance{
        font-family: 'Raleway';
        font-size: 18px;
        color: #000;
        font-weight: 700;
    }
    .full-finance{
        width: 326px;
        height: 446px;
        background-color: white;
        border-radius: 5px;
        padding: 23px 12px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .full-finance span{
        font-family: 'Raleway';
        font-size: 16px;
        color: #C6C6C6;
    }
    .entry{
        font-family: 'Raleway';
        font-size: 16px;
        color: #03AC00;
				padding-right: 33px;
    }
    .exit{
        font-family: 'Raleway';
        font-size: 16px;
        color: #C70000;
				padding-right: 33px;
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


