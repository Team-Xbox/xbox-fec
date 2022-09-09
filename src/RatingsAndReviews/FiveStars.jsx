
import React from "react";
import "../../public/styles.css";
import QuarterStars from './QuarterStars.jsx';


class FiveStars extends React.Component {
  constructor(props) {
    super(props);

    //console.log('fiveStars rating =',this.props.rating);
  }

  render() {
    return (
    <div className = 'five-star'>
      <QuarterStars rating={this.props.rating}/>
    </div>
    )
  }

}

export default FiveStars;
