import React, { useEffect, useState } from 'react';
import './App.css';
import { Form } from 'react-bootstrap';


function Something() {
  const [titles, setTitles] = useState([]);
  const [photos, setPhotos] = useState([]);
  function setPhoto(e) {
    let idToFetchWith=0
    console.log(e.target.value);
    for (var title of titles) {
      if (title.title === e.target.value) {
        idToFetchWith=title.id
      }
    }
  fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${idToFetchWith}`)
  .then(response => response.json())
        .then(data => setPhotos(data))
  }
 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setTitles(data))
    fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
        .then(response => response.json())
        .then(data => setPhotos(data))
  }, []);

  return (
    <div className="App">
      <h1>Select an album:</h1>
      <Form >
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control onChange={(e) => setPhoto(e)} as="select">
            {titles.map((item, index) => {
              return <option value={item.albumId} key={index}>{item.title}</option>
            })}
          </Form.Control>
        </Form.Group>
      </Form>
      { photos.map((photo, index) => {
        return <img src={photo.thumbnailUrl} key={index}></img>
      })}
    </div>
  );
}


export default Something;
