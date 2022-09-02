import React from 'react';

const ProductBreakdown = ({ average, characteristic }) => {

  const Parentdiv = {
    width: 300,
    height: 15,
    backgroundColor: 'whitesmoke',
    borderRadius: 2,
    margin: 10

  }
  const Childdiv = {
    height: '100%',
    width: `${average+2.5}%`,
    backgroundColor: 'whitesmoke',
    borderRadius: 2,
    textAlign: 'right'
  }
  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900
  }
  return (
    <div>
      <div style = {{marginLeft:12, marginTop:15}}>
      {characteristic}
      </div>
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <div >	&#9660;</div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default ProductBreakdown;