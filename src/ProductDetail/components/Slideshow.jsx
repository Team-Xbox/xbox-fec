import React, {useState, useEffect} from 'react';
const axios = require('axios');

const Slideshow = (props) => {
  const [styleData, setStyleData] = useState({});
  const [index, setIndex] = useState(0);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [product_id, setProductId] = useState(66642);

  let expressUrl = 'http://localhost:1337';
  let styleCounter = 0;
  let miniCounter = 0;

  useEffect(() => {
    axios.post(expressUrl + '/styles', {product: product_id})
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
      {!styleData[0] ? <div> This Item Does Not Exist </div> :
        <div id="main-images">
          <div id="mini-carousel">
            <button className="mini-slideshow-btn"
              onClick={() => { console.log('bye') }}> {'^'}
            </button>
            {styleData[photosIndex].photos.map(photo =>
              <img className="mini-image" data-index={miniCounter++}
                src={photo.url}
                width="50"
                height="50"
                onClick={(e) => { setIndex(e.target.getAttribute('data-index')) }}
              />
            )}
            <button className="mini-slideshow-btn"
              onClick={() => { console.log('hello') }}> {'v'}
            </button>
          </div>
          <button className="slideshow-btn"
            onClick={() => { if (index > 0) { setIndex(index - 1) } }}> {'<'}
          </button>
          <img
            className="main-image"
            src={styleData[photosIndex].photos[index].url}
            height='550'
          />
          <button className="slideshow-btn"
            onClick={() => { if (index < styleData[photosIndex].photos.length - 1) { setIndex(index + 1) } }}> {'>'}
          </button>
        </div>
      }
      {!styleData[0] ? <div> No Other Styles Found </div> :
        <div id="style-selector">
          <h2 className="styles-title"> Style: <em>{styleData[photosIndex].name}</em> </h2>
          {styleData.map(style =>
            <img data-value={styleCounter++} className="style-image"
              src={style.photos[0].thumbnail_url} width="100" height="100"
              onClick={(e) => { setPhotosIndex(e.target.getAttribute('data-value'), setIndex(0)) }}
            />
          )}
        </div>
      }
    </div>
  )
}

export default Slideshow