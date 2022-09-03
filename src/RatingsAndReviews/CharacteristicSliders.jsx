import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '/Users/adamblomberg/xbox-fec/public/styles.css';


import { Slider } from 'rsuite';

const labels = ['1', '2', '3', '4', '5'];

const Sliders = ({parentCallbackSliders}) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);

  var valueObject = {
    "223572" : value6,
    "223573" : value5,
    "223574" : value3,
    "223575" : value4,
    "223576" : value2,
    "223577" : value1
  };
  const [charObject, setCharObject] = useState(valueObject);

  useEffect(()=>{
    let updatedValue = valueObject;
    setCharObject(charObject => ({
      ...charObject,
      ...valueObject
    }));

  }, [value1, value2, value3, value4, value5, value6]);




  return (
    <div>
      {/* Size Slider */}
      <div style={{ width: 700, marginLeft: 70 }}> <h5 >Size</h5>
        <Slider
          min={0}
          max={labels.length - 1}
          value1={value1}
          className="custom-slider"
          handleStyle={{
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
            width: 150,
            height: 22,
          }}

          tooltip={false}
          handleTitle={labels[value1]}
          onChange={setValue1}
        />
      </div>
      <table style={{ width: 800, marginLeft: 20 }}>
        <tbody>
          <tr>
          <td width='160' align = 'left'>A size too small</td><td width='160' align = 'left'>1/2 size too small</td><td width='160' align = 'center'>Perfect</td><td width='160' align = 'right'>1/2 size too big</td><td width='160' align = 'right'> A size too wide</td>
          </tr>
        </tbody>
      </table>
      {/* Width Slider */}
      <div style={{ width: 700, marginLeft: 70 }}><h5 >Width</h5>
        <Slider
          min={0}
          max={labels.length - 1}
          value2={value2}
          className="custom-slider"
          handleStyle={{
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
            width: 150,
            height: 22,
          }}

          tooltip={false}
          handleTitle={labels[value2]}
          onChange={setValue2}
        />
      </div>
      <table style={{width: 800, marginLeft: 20 }}>
        <tbody>
          <tr>
            <td width='160' align = 'left'>Too narrow</td><td width='160' align = 'left'>Slightly narrow</td><td width='160' align = 'center'>Perfect</td><td width='160' align = 'right'>Slightly wide</td><td width='160' align = 'right'> Too wide</td>
          </tr>
        </tbody>
      </table>
            {/* Comfort Slider */}
            <div style={{ width: 700, marginLeft: 70 }}><h5 >Comfort</h5>
        <Slider
          min={0}
          max={labels.length - 1}
          value3={value3}
          className="custom-slider"
          handleStyle={{
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
            width: 150,
            height: 22,
          }}

          tooltip={false}
          handleTitle={labels[value3]}
          onChange={setValue3}
        />
      </div>
      <table style={{ width: 800, marginLeft: 20 }}>
        <tbody>
          <tr>
          <td width='160' align = 'left'>Uncomfortable</td><td width='160' align = 'left'>Slightly comfortable</td><td width='160' align = 'center'>Ok</td><td width='160' align = 'right'>Comfortable</td><td width='160' align = 'right'> Perfect</td>
          </tr>
        </tbody>
      </table>
            {/* Quality Slider */}
            <div style={{ width: 700, marginLeft: 70 }}> <h5 >Quality</h5>
        <Slider
          min={0}
          max={labels.length - 1}
          value4={value4}
          className="custom-slider"
          handleStyle={{
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
            width: 150,
            height: 22,
          }}

          tooltip={false}
          handleTitle={labels[value4]}
          onChange={setValue4}
        />
      </div>
      <table style={{ width: 800, marginLeft: 20 }}>
        <tbody>
          <tr>
          <td width='160' align = 'left'>Poor</td><td width='160' align = 'left'>Below average</td><td width='160' align = 'center'>What I expected</td><td width='160' align = 'right'>Pretty great</td><td width='160' align = 'right'> Perfect</td>
          </tr>
        </tbody>
      </table>
            {/* Length Slider */}
            <div style={{ width: 700, marginLeft: 70 }}><h5 >Length</h5>
        <Slider
          min={0}
          max={labels.length - 1}
          value5={value5}
          className="custom-slider"
          handleStyle={{
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
            width: 150,
            height: 22,
          }}

          tooltip={false}
          handleTitle={labels[value5]}
          onChange={setValue5}
        />
      </div>
      <table style={{ width: 800, marginLeft: 20 }}>
        <tbody>
          <tr>
          <td width='160' align = 'left'>Runs Short</td><td width='160' align = 'left'>Runs slightly short</td><td width='160' align = 'center'>Perfect</td><td width='160' align = 'right'>Runs slightly long</td><td width='160' align = 'right'> Runs long</td>
          </tr>
        </tbody>
      </table>
            {/* Fit Slider */}
            <div style={{ width: 700, marginLeft: 70 }}> <h5 >Fit</h5>
        <Slider
          min={0}
          max={labels.length - 1}
          value6={value6}
          className="custom-slider"
          handleStyle={{
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
            width: 150,
            height: 22,
          }}

          tooltip={false}
          handleTitle={labels[value6]}
          onChange={setValue6}
        />
      </div>
      <table style={{ width: 800, marginLeft: 20 }}>
        <tbody>
          <tr>
          <td width='160' align = 'left'>Runs tight</td><td width='160' align = 'left'>Runs slightly tight</td><td width='160' align = 'center'>Perfect</td><td width='160' align = 'right'>Runs slightly long</td><td width='160' align = 'right'> Runs long</td>
          </tr>
        </tbody>
      </table>
      {useEffect(()=> {
        parentCallbackSliders(charObject);
      }, [charObject])}
    </div>
  );
};



export default Sliders;