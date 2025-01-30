const weather_get = (req,res) => {
    const city_name = req.body.city;
    console.log(city_name);
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.API_KEY}`
    )
    .then( respond => res.json(respond))
    .catch( err => res.error(err));
}

module.exports = weather_get;