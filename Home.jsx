import React, { useState } from "react";
import "./MyApp.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [city, setCity] = useState("");

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [show, setShow] = useState(false);

  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [weather, setWeather] = useState("");
  const [list, setList] = useState([]);

  // Search section

  const search = (e) => {
    e.preventDefault();

    if (city != "") {
      setShow(true);
      setLoading(true);

      fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: city }),
      })
        .then((respond) => {
          return respond.json();
        })
        .then((data) => {
          if (data.err === true) {
            setMsg(true);
          } else {
            setMsg(false);
            setName(data.city.name);

            setTemp(data.list[0].main.temp);
            setHumidity(data.list[0].main.humidity);
            setWindSpeed(data.list[0].wind.speed);
            setWeather(data.list[0].weather[0].description);

            const new_list = data.list.filter((item) =>
              item.dt_txt.includes("00:00:00")
            );

            setList(new_list);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
      setCity("");
    } else {
      alert("Please enter a city");
    }
  };

  return (
    <>
      <div className="mainBox">
        {/* Weather Section */}

        <div className="currentWeatherField">
          <h1>Weather</h1>

          {/* Form Section */}

          <form onSubmit={search}>
            <div className="inputField">
              {/* Input Field */}

              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="city"
                className="cityField"
              />
            </div>

            {/* Buttons */}

            <button type="submit" className="searchField">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            <Link to="/history">
              <button>
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </button>
            </Link>
          </form>

          {show &&
            (loading ? (
              <p>Data Loading....</p>
            ) : msg ? (
              <p>City not found</p>
            ) : (
              <div>
                <div className="currentWeatherDataField">
                  <div className="weatherDataMain">
                    <div>
                      <p style={{ fontSize: 35 }}>
                        {" "}
                        <span style={{ color: "red" }}>{name}</span>{" "}
                      </p>
                      <img
                        src="src\assets\weather.png"
                        alt="weather"
                        width={120}
                      />
                      <p style={{ fontSize: 25 }}>{weather}</p>
                    </div>

                    <div>
                      <div className="temp">
                        <img
                          src="src\assets\temp.png"
                          alt="temperature"
                          width={20}
                          height={35}
                        />
                        <p style={{ fontSize: 25 }}>
                          {temp}
                          <span style={{ color: "red" }}>{"\u00B0"}C</span>
                        </p>
                      </div>

                      <div className="humidity">
                        <img
                          src="src\assets\humidity.png"
                          alt="windspeed"
                          width={30}
                          height={25}
                        />
                        <p style={{ fontSize: 20 }}>Humidity = {humidity} %</p>
                      </div>

                      <div className="windSpeed">
                        <img
                          src="src\assets\wind-speed.png"
                          alt="windspeed"
                          width={30}
                          height={25}
                        />
                        <p style={{ fontSize: 20 }}>
                          Windspeed = {windSpeed} m/s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* List of forecast */}

                <div className="forecastBox">
                  <div className="forecastField">
                    {list.map((item, index) => (
                      <div
                        key={`${item.dt_txt}-${index}`}
                        className="forecastData"
                      >
                        <p
                          style={{
                            fontSize: 25,
                            borderBottom: "1px solid grey",
                            paddingBottom: "5px",
                          }}
                        >
                          {new Date(item.dt_txt).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </p>

                        <img
                          src="src\assets\forecast.png"
                          alt="forecast Icon"
                          width={60}
                        />

                        <div className="temp">
                          <img
                            src="src\assets\temp.png"
                            alt="temperature"
                            width={20}
                            height={35}
                          />
                          <p style={{ fontSize: 18 }}>
                            {item.main.temp}
                            <span style={{ color: "red" }}>{"\u00B0"}C</span>
                          </p>
                        </div>
                        <div className="humidity">
                          <img
                            src="src\assets\humidity.png"
                            alt="windspeed"
                            width={30}
                            height={25}
                          />
                          <p>{item.main.humidity} %</p>
                        </div>
                        <div className="windSpeed">
                          <img
                            src="src\assets\wind-speed.png"
                            alt="windspeed"
                            width={30}
                            height={25}
                          />
                          <p>{item.wind.speed} m/s</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
