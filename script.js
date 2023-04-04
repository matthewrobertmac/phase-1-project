fetch("http://localhost:3000/mlCards")
    .then((res) => res.json())
    .then((mlCards) => {
        let modelCards = mlCards
        renderModelCards(modelCards)
    })
    
/*
let image1 = document.getElementById("image1")
let image2 = document.getElementById("image2")
let image3 = document.getElementById("image3")
let image4 = document.getElementById("image4")
let image5 = document.getElementById("image5")
let image6 = document.getElementById("image6")
let image7 = document.getElementById("image7")

*/

let imageSlider = document.getElementById("imageSlider")
let cardArray = []
/*
image1.src = cardArray[0] 
image2.src = cardArray[1]
image3.src = cardArray[2]
image4.src = cardArray[3]
image5.src = cardArray[4]
image6.src = cardArray[5]
image6.src = cardArray[6]
*/
imageSlider.append(cardArray)
    
function renderModelCards(modelCards) {
    modelCards.forEach((card) => {
        
        let cardName = document.getElementById("detail-name")
        let cardDesc = document.getElementById("detail-description")
        let cardDetailImg = document.getElementById("detail-image")
        let cardUseCases = document.getElementById("detail-use-cases")
        let cardImg = document.createElement("img")
        let cardSlide = document.createElement("div")
        cardName.textContent = card.name
        cardDesc.textContent = card.description
        cardUseCases.textContent = card.use_cases
        cardImg.src = card.img_url
        cardImg.height = 100
        cardDetailImg.height = 400
        cardImg.addEventListener("click", () => {
            console.log("clicked!",
            cardName.textContent = card.name,
            cardDesc.textContent = card.description,
            cardUseCases.textContent = card.use_cases, 
            cardDetailImg.src = card.gif_url

            )
        })        
        cardArray.push(cardImg)
        imageSlider.append(cardImg)
    })
}


/* image slider

function Slider() {
  const carouselSlides = document.querySelectorAll('.slide');
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  const dotsSlide = document.querySelector('.dots-container');
  let currentSlide = 0;

  const activeDot = function (slide) {
      document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
      document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('active');
  };
  activeDot(currentSlide);

  const changeSlide = function (slides) {
      carouselSlides.forEach((slide, index) => (slide.style.transform = `translateX(${100 * (index - slides)}%)`));
  };
  changeSlide(currentSlide);

  btnNext.addEventListener('click', function () {
      currentSlide++; 
      if (carouselSlides.length - 1 < currentSlide) {
          currentSlide = 0;
      };
      changeSlide(currentSlide);
      activeDot(currentSlide);
});
  btnPrev.addEventListener('click', function () {
      currentSlide--;
      if (0 >= currentSlide) {
          currentSlide = 0;
      }; 
      changeSlide(currentSlide);
      activeDot(currentSlide);
  });

  dotsSlide.addEventListener('click', function (e) {
      if (e.target.classList.contains('dot')) {
          const slide = e.target.dataset.slide;
          changeSlide(slide);
          activeDot(slide);
      }
  });
};
Slider();

*/

/* model code */

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  // If webcam supported, add event listener to button for when user
  // wants to activate it to call enableCam function which we will 
  // define in the next step.
  if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }
  
// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      return;
    }
    
    // Hide the button once clicked.
    event.target.classList.add('removed');  
    
    // getUsermedia parameters to force video but not audio.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video.srcObject = stream;
      video.addEventListener('loadeddata', predictWebcam);
    });
  }

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
});

var children = [];

function predictWebcam() {
  // Now let's start classifying a frame in the stream.
  model.detect(video).then(function (predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }
    
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}
