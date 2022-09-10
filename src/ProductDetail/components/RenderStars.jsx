import React from "react";
import QuarterStars from '../../RatingsAndReviews/QuarterStars.jsx';


class RenderStars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className = 'five-star'>
      <QuarterStars rating={this.props.rating}/>
    </div>
    )
  }

}

export default RenderStars;