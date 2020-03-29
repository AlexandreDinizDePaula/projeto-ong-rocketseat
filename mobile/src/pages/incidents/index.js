import React,{useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api'


import {Feather} from "@expo/vector-icons"
import logoImg from '../../assets/logo.png'

import style from './style'

export default function Incidents(){

    const[incidents, setIncidents] = useState('');
    const[total, setTotal] = useState(0);
    const[pages, setPages] = useState(1);
    const[loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident})
    }

    async function loadIncidents() {

        if(loading){
            return
        }

        if(total > 0 && incidents.length === total){
            return
        }
        
        setLoading(true);

        const res = await api.get('incidents', {
            params:{ pages}
        });

        setIncidents([...incidents, ...res.data]);
        setTotal(res.headers['x-total-count'])
        setPages(pages + 1);
        setLoading(false);
    }

    useEffect(() =>{
        loadIncidents();
    })

    return(
        
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={style.title}>Beeeem Vinnnndo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo:</Text>

            <FlatList 
            data={incidents}
            style={style.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item: incident}) =>(
                <View style={style.incident}>

                    <Text style={style.incidentProperty}>ONG:</Text>
                    <Text style={style.incidentValue}>{incident.name}</Text>

                    <Text style={style.incidentProperty}>Caso:</Text>
                    <Text style={style.incidentValue}>{incident.title}</Text>
                    
                    <Text style={style.incidentProperty}>Valor:</Text>
                    <Text style={style.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{
                            style:'currency', 
                            currency:'BRL'})
                            .format(incident.value)}
                            </Text>
                
                    <TouchableOpacity 
                    style={style.detailsButton}
                    onPress={() =>navigateToDetail(incident)}
                    >
                        <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right' size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>

            )}/>

        </View>
    )
}