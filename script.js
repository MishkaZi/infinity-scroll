const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitilLoad = true;

//Unsplash API
let initialCount = 5;
const apiKey = 'JHfNsu4VUynEOSW9Skbqu25pgryva1xQ2jX7wm0rW6I';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

//Check if all images were loaded
function imageloaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements from links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //Create <img> from photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event listener, check when each is finished loading
    img.addEventListener('load', imageloaded);

    //put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitilLoad) {
      updateAPIURLWithNewCount(30);
      isInitilLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
}

//Check if scrolling near bottom of page and load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
