import React from 'react';

const ProgressBar = ({bgcolor,progress}) => {

  const Parentdiv = {
      width: 175,
      height: 15,
      backgroundColor: 'whitesmoke',
      borderRadius: 2,
      margin: 20

    }
    const Childdiv = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: bgcolor,
     borderRadius:2,
      textAlign: 'right'
    }
    const progresstext = {
      padding: 10,
      color: 'black',
      fontWeight: 900
    }
  return (
  <div style={Parentdiv}>
    <div style={Childdiv}>
    </div>
  </div>
  )
}

export default ProgressBar;