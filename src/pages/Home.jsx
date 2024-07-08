import React, { useState, useEffect } from 'react';

import styles from '../styles/Home.module.css'
import heart from '../assets/heartbeat.gif';
import Server from '../components/Server';




const Home = () => {
    
    const [servers, setServers] = useState([]);
    const [endpointInput, setEndpointInput] = useState('');
    const [nicknameInput, setNicknameInput] = useState('');

    useEffect(() => {
        const storedServers = JSON.parse(localStorage.getItem('servers')) || [];
        setServers(storedServers);
    }, []);
    

    
    const addEndpoint = () => {
        console.log(endpointInput);
        console.log(nicknameInput);

        if (!endpointInput || !nicknameInput) {
            return;
        }
        
        const newServer = { endpoint: endpointInput, nickname: nicknameInput };
        const updatedServers = [...servers, newServer];

        setServers(updatedServers);
        localStorage.setItem('servers', JSON.stringify(updatedServers))


        setEndpointInput('');
        setNicknameInput('');
    }

    const clearStorage = () => {
        localStorage.removeItem('servers');
        setServers([]);
    };

    const removeServer = (index) => {
        const updatedServers = servers.filter((_, i) => i !== index);
        setServers(updatedServers);
        localStorage.setItem('servers', JSON.stringify(updatedServers));
    };


    return (
        <>
        <img className={styles.titleLogo}src={heart} alt="Description of GIF"></img>
        <h1>Health Check by TEAM MENTAL-404</h1>

        <div className={styles.baseBox}>
        <button className={styles.clearBtn} onClick={clearStorage}>Clear All</button>
            {servers.map((server, index) => (
                    <Server 
                        index={index} 
                        endpoint={server.endpoint} 
                        nickname={server.nickname}
                        removeServer={removeServer} 
                    />
            ))}
        </div>

        <div className={styles.btnBox}>
            <input 
                className={styles.endpointInput} 
                input="text" 
                placeholder='Enter an endpoint for status check!'  
                value={endpointInput} 
                onChange={(e) => setEndpointInput(e.target.value)}>
            </input>
            <input 
                className={styles.nicknameInput} 
                placeholder='Enter a nickname for server!' 
                value={nicknameInput} 
                onChange={(e) => setNicknameInput(e.target.value)}>
            </input>
            <button className={styles.addBtn} onClick={addEndpoint}>Add</button>
        </div>
        </>
    );
}

export default Home;