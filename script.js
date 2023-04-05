document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
window.addEventListener("load", pageFullyLoaded, false);

function theDomHasLoaded(e) {
  fetch("http://localhost:3000/mlCards")
  .then((res) => res.json())
  .then((mlCards) => {
      let modelCards = mlCards
      renderModelCards(modelCards)
  })
  

let imageSlider = document.getElementById("imageSlider")
let cardArray = []
imageSlider.append(cardArray)
  
function renderModelCards(modelCards) {
  modelCards.forEach((card) => {
      
      let cardName = document.getElementById("detail-name")
      let cardDesc = document.getElementById("detail-description")
      let cardDetailImg = document.getElementById("detail-image")
      let cardUseCases = document.getElementById("detail-use-cases")
      let cardImg = document.createElement("img")
      let anotherImage = document.getElementById("another-image")
      anotherImage.width = 250
      cardName.textContent = card.name
      cardDesc.textContent = card.description
      cardUseCases.textContent = card.use_cases
      cardImg.src = card.img_icon
      cardImg.height = 100
      cardDetailImg.height = 400
      cardImg.addEventListener("mouseover", () => {
        cardImg.src = card.img_url
      })
      cardImg.addEventListener("mouseout", () => {
        cardImg.src = card.img_icon
      })

      cardImg.addEventListener("click", () => {
          console.log("clicked!",
          cardName.textContent = card.name,
          cardDesc.textContent = card.description,
          cardUseCases.textContent = card.use_cases, 
          cardDetailImg.src = card.gif_url,
          anotherImage.src = card.img_url

          )
      })        
      cardArray.push(cardImg)
      imageSlider.append(cardImg)
  })
}


}

/* model code */

function pageFullyLoaded(e) {
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
        if (predictions[n].score > 0.65) {
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
  
  
}

let check = document.getElementById(`tick`)
let notChecked = document.getElementById(`agree_chk_error`)
// let validateForm = document.cr
function Box(check) {
}

console.log(notChecked)
console.log(check)


// check.addEventListener("click", function() {
  
//   let= getElementById(`terms`)

  let termsConditions = document.getElementById(`alert`)
  
  termsConditions.addEventListener("click", function(e) {
    e.preventDefault()
    alert(`rrrr`)
  })
console.log(`ffff`)
let submitBttn = document.getElementById(`terms`)

console.log(submitBttn)
submitBttn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementsByName(`user_name`)[0].value
  let email = document.getElementsByName(`user_email`)[0].value

  console.log(name,email)
  let post = document.createElement("li"); //creating li for each comment object
  post.textContent = name; // setting the textcontent from the comment object

  let currentUser = document.getElementById(`textdiv`)
  currentUser.append(post) 
})