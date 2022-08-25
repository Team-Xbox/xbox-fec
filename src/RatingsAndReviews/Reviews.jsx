import React from 'react'
import StarRating from './starRating.jsx'

var reviewData = {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
        "id": 1,
        "url": "urlplaceholder/review_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/review_5_photo_number_2.jpg"
      },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}

// ================== Star Rating ===============================================



// ==================  Convert iso date to month day year =======================
var mydate = new Date(reviewData.results[0].date);
var month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
var day = mydate.getDay();
var date = month + ' ' + day + ', ' + mydate.getFullYear();
//console.log(date);

// ==================  Nickname ==================================================

var nickname = reviewData.results[0].reviewer_name;
//console.log(nickname);

// =================== Review Summary ===========================================
var reviewSummary = reviewData.results[0].summary;
//console.log(reviewSummary);

// =================== Summary Body =============================================
var summaryBody = reviewData.results[0].body;
//console.log(summaryBody);

//==================== Images ===================================================


// =================== Reviews Class =============================================

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // future main page state items
      numberOfReviews: reviewData.results.length
    }
  }

  render() {
    return (
      <div>
        <div>Hello from Reviews.jsx</div>
        {/* <div>{this.state.numberOfReviews} reviews, sorted by
          <button>relevance</button>
        </div>
        <div>
          {nickname} {date}
        </div>
        <div>
          {reviewSummary}
        </div>
        <div>
          {summaryBody}
        </div> */}
        <div>
         <StarRating/>
        </div>
      </div>
    )
  }
}

export default Reviews;