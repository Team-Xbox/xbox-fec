import React, {useState, useEffect} from 'react';
const axios = require('axios');

const Slideshow = (props) => {
  const [styleData, setStyleData] = useState({});
  const [index, setIndex] = useState(0)
  const [photosIndex, setPhotosIndex] = useState(0)

  let expressUrl = 'http://localhost:1337';
  let counter = 0;

  useEffect(() => {
    axios.get(expressUrl + '/styles')
    .then(response => {
      return response.data.results;
    })
    .then(data => {
      setStyleData(data);
    })
    .then(() => console.log('styledata', styleData))
    .catch(err => console.log(err))
  }, [JSON.stringify(styleData)])

  return (
    <div id="slideshow">
      {!styleData[0] ? <div></div> :
        <div id="images">
          <button className="slideshow-btn"
            onClick={() => { if (index > 0) { setIndex(index - 1) } }}> {'<'}
          </button>
          <img className="main-image" src={styleData[photosIndex].photos[index].url} />
          <button className="slideshow-btn"
            onClick={() => { if (index < styleData[photosIndex].photos.length - 1) { setIndex(index + 1) } }}> {'>'}
          </button>
        </div>
      }
      {!styleData[0] ? <div></div> :
        <div id="style-selector">
          {styleData.map(style =>
            <img data-value={counter++} className="style-image" src={style.photos[0].thumbnail_url}
              onClick={(e) => { setPhotosIndex(e.target.getAttribute('data-value'), setIndex(0)) }}
            />
          )}
        </div>
      }
    </div>
  )
}

export default Slideshow