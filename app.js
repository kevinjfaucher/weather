import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const API_KEY = 'YOUR_WEATHER_API_KEY_HERE';  // Replace with your actual API key

class WeatherApp extends Component {
  state = {
    city: "",
    weatherData: null,
    error: null,
  };

  handleInputChange = (text) => {
    this.setState({ city: text });
  };

  fetchWeatherData = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ weatherData: data });
      })
      .catch(error => {
        this.setState({ error: "Failed to fetch weather data" });
      });
  };

  render() {
    const { city, weatherData, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>WeatherApp</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={this.handleInputChange}
          placeholder="Enter city name"
        />
        <Button title="Get Weather" onPress={this.fetchWeatherData} />
        {error && <Text style={styles.error}>{error}</Text>}
        {weatherData && (
          <View style={styles.weatherData}>
            <Text style={styles.name}>{weatherData.name}</Text>
            <Text>Temperature: {weatherData.main.temp}°C</Text>
            <Text>Condition: {weatherData.weather[0].description}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  weatherData: {
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  }
});

export default WeatherApp;
