import React, {useState} from "react";
import {Link,useHistory} from "react-router-dom";
import api from '../../services/api'

import {GoArrowLeft} from 'react-icons/go'
import './style.css';
import logo from '../../assets/logo.svg'

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const dados ={name,
            email,
            whatsapp,
            city,
            uf
        };
        
        try{
            const res = await api.post('ongs', dados);
            history.push('/');
            alert(`Seu id de acesso ${res.data.id}`)

            }catch(err){
                alert('Erro no cadastro')
            }
    }

    return(
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logo} alt="Logo be the heroe"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem casos de sua ONG</p>
                    <Link className='back-link' to='/'>
                    <GoArrowLeft size={16} color="#E02041"></GoArrowLeft>Voltar</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da OnG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type='email' placeholder="e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{width:80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}