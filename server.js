const PORT = 8000
const axios = require('axios').default
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// This is so we don't get blocked by cors
app.use(cors())

app.use('/flights', (req,res) => {
  const options = {
    method: 'GET',
    url: 'https://flight-information-of-hong-kong-international-airport.p.rapidapi.com/flightinfo-rest/rest/flights/past',
    params: {
      date: '2023-06-01',
      lang: 'en',
      arrival: 'false',
      cargo: 'false'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'flight-information-of-hong-kong-international-airport.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data.splice(0,6))
  }).catch ( function (error){
    console.error(error);
  })
})

app.listen(PORT, () => console.log('Running on PORT: ' + PORT))