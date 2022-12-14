// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
let camState = 'user';
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/EbdzMoCES/';
// Video
let video;
let button;
let flippedVideo;
let x=0;
// To store the classification
let label = "";
let constraint = {
    video:{
        facingMode: {
        exact: camState
        }
    }
}
// Load the model first
function preload() {
  
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
}

function setup() {
  cnv = createCanvas(320, 260);
  // Create the video
  video = createCapture(constraint);
  video.size(320, 240);
  video.hide();
  button = createButton('Capture');
  button.position(130, 370);
  button.mousePressed(captureImg);
  flippedVideo = video
  //flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = video
  //flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
function captureImg()
{
  if(x < 2)
  {
    saveFrames('out', 'png', 1, 1, data => {
      storeItem('Img'+x, data[0].imageData);
      storeItem('Caption'+x, label)
    });
    x++;
  }
  else
  {
    button.attribute('disabled', '');
  }
}