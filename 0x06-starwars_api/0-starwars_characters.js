#!/usr/bin/node
const request = require('request');

function getCharacters (movieId) {
  const baseUrl = 'https://swapi-api.alx-tools.com/api/films/';
  const url = `${baseUrl}${movieId}/`;

  // Create a Promise to handle the API request
  const fetchCharacters = new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body).characters || []);
      }
    });
  });

  // Use Promise.all to handle multiple asynchronous requests
  fetchCharacters
    .then((characters) => {
      const characterPromises = characters.map((characterUrl) => {
        return new Promise((resolve, reject) => {
          request(characterUrl, (charError, charResponse, charBody) => {
            if (charError) {
              reject(charError);
            } else {
              resolve(JSON.parse(charBody).name);
            }
          });
        });
      });

      return Promise.all(characterPromises);
    })
    .then((characterNames) => {
      characterNames.forEach((name) => {
        console.log(name);
      });
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
}

if (process.argv.length !== 3) {
  console.log('Usage: node starwars_characters.js <movie_id>');
  process.exit(1);
}

const movieId = process.argv[2];
getCharacters(movieId);
