
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/6V8md4eN/model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "Waiting...";
let confidence = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(500, 500);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  

  // Draw the label
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 250);
  

  // Draw the confidence score
  fill(255);
  textSize(32);
  text(Math.round(confidence * 100) + "%", width/2, height - 100)
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
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
  console.log(results[0]);
  label = results[0].label;
  confidence = results[0].confidence
  // Classifiy again!
  classifyVideo();
}