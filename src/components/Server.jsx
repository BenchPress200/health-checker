import React, { useState, useEffect, useRef } from 'react';

import styles from '../styles/Server.module.css'

const Server = (props) => {
    const {index, endpoint, nickname, removeServer} = props;
    const [status, setStatus] = useState(null);


    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const checkServerStatus = async () => {
        console.log('check!')
        try {
            const response = await fetch(endpoint);
            
            if(!isValidUrl(endpoint)) {
                setStatus(400);
            } else if (response.ok) {
                setStatus(200); 
            } else {
                setStatus(response.status);
            }
        } catch (error) {
            setStatus('error');
        }
    };

    checkServerStatus();

    
    return (
        <>
            <div className={styles.serverBox}>
                <div className={status === 200 ? styles.greenDot : styles.redDot}></div>
                {status === 400 ? 'Incorrect URL': status === "error" ? nickname + ' - CORS Error' : 
                     nickname}
                
                <button className={styles.removeBtn} onClick={() => removeServer(index)}>Remove</button>
            </div>
        </>
    );
}

export default Server;