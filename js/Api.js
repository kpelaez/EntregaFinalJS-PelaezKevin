 //Se toma el valor del dolar de la api del bna. 
 const url = 'https://api.estadisticasbcra.com/usd_of_minorista';
 const headers ={'Authorization': 'BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjUxMzA0MTgsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJwZWxhZXprZXZpbkBob3RtYWlsLmNvbSJ9.20czYdE6WVZBPThWPR3wVVCPxzU0cfY2blEfjEZGPzpqTxneLdNqmZK4HoIZhayrWmnqKQ-dZhhtYSZvBKn9NQ'};

 fetch(url, {
     method:'GET',
     headers: headers})
 .then(response =>{
     if(!response.ok){
         throw console.log("ERROR");
     }
     return response.json()
 })
 .then(data=>{
     console.log(data);
 })