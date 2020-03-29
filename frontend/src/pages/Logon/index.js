import React,{useState} from "react";
import './style.css';
import {Link, useHistory} from "react-router-dom"
import api from "../../services/api"

import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import {GoArrowRight} from 'react-icons/go'


export default function Logon(){

    const history = useHistory();
    const[id, setId] = useState('');

    async function handleLogin(e){
       
        e.preventDefault();

        try {
            const res = await api.post('session', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name)
            history.push('/profile')
            
        } catch (err) {
            alert('Falha ao tentar logar')
        }
    }

    return(
        <div className='logon-container'>
            <section className='form'>
                <img src={logo} alt='Be the hero'/>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input placeholder='Digite seu ID'
                    value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button className='button' type='submit'>Entrar</button>
                    <Link className='back-link' to='/cadastro'>
                        <GoArrowRight size={16} color="#E02041"></GoArrowRight> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt='Heroes'/> 
        </div>
    );
}