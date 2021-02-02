import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

//import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

function App() {
    const [product, setProducts] = useState([]);

    useEffect(() => {}, []);

    async function handleUrlProduct() {

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const url = document.getElementById('url').value;

        try {
        
        const response = await api.post('products', {
            "url": url,
            "date": `${today.toISOString()}`
        })

        const product = response.data;

        setProducts(product);

        }  catch (e) {
            //console.log('Error',e)
            alert(e);
        }
    }

    return (
        <>
        
        <p>Url:<input id="url"></input><button type="button" onClick={handleUrlProduct}>Processar</button></p>
        <br/>
         { <h2>Titulo: {product.title}</h2> }
         { <h2>Descrição: {product.description}</h2> }
         { <h2>Preço: {product.price}</h2> }
         <img width={300} src={product.image} />
         
        </>
    );
}

export default App;