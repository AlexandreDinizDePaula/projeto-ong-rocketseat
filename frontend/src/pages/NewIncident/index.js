import React,{useState} from "react";
import './style.css';
import { Link, useHistory } from "react-router-dom"
import api from '../../services/api'

import logo from '../../assets/logo.svg'
import { GoArrowLeft } from 'react-icons/go'


export default function NewIncident() {

    const history = useHistory();
    const ongId = localStorage.getItem('ongId')

    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('');
    const[value,setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                }
            })
            history.push('/profile')
        }catch(err){
            alert("Erro ao cadastrar novo caso")
        }
    }

    return (
        <div className='newIncident-container'>
            <div className='content'>
                <section>
                    <img src={logo} alt="Logo be the heroe" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva detalhadamente para encontrar um herói para te ajudar nisto</p>
                    <Link className='back-link' to='/profile'>
                        <GoArrowLeft size={16} color="#E02041"></GoArrowLeft>Voltar</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Título do caso" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder='Descrição'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)} 
                    />
                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}