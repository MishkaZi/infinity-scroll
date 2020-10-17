//Unsplash API
const count = 10;
const apiKey = 'JHfNsu4VUynEOSW9Skbqu25pgryva1xQ2jX7wm0rW6I';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

getPhotos();
