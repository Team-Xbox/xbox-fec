import React, { useState, useEffect } from 'react'
const cloudName = "dwl50vubn";
const uploadPreset = "fec-xbox";
import "../../public/styles.css";

var answerImage = "";
var AnswerImageWidget = function ({setStateofAnswerPhotos}) {
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      cropping: true,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('result.info.secure_url = ', result.info.secure_url);
        console.log("Done! Here is the image info: ", result.info);
        setStateofAnswerPhotos(result.info.secure_url);
      }
    }
  );
  myWidget.open();
}

export default AnswerImageWidget;