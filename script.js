//define variable for our location
let locationField;

let audioCtx;

let freq = 0;

let infoField;

//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
})

// create web audio api context
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
gainNode.gain.setValueAtTime(0.35, audioCtx.currentTime); // set initial gain to 0

oscillator.type = "triangle";
oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.start();

function sonify(){
  console.log(locationField.value);



  
fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationField.value +'?key=YH5QF5SWJL5LZ8SFPZFT2RCC2')
.then(response => response.json())
	.then(response => {
    console.log(response);
    console.log("the weather over the next few days is:" + response.days[0].temp + " " + response.days[1].temp + " " + response.days[2].temp);
    console.log("the wind gust over the next few days is:" + response.days[0].windgust + " " + response.days[1].windgust + " " + response.days[2].windgust);
    freq = response.days[0].temp * 2; console.log(freq / 2); 
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
    audioCtx.resume();
    infoField.innerHTML = "the weather in " + locationField.value + " is " + response.days[0].temp
    if (response.days[0].temp < 60) {
      infoField.innerHTML += " ❄️"
    }
    else {
      infoField.innerHTML += " ☀️"
    }
  })
	.catch(err => console.error(err));
}

function stop(){
  audioCtx.suspend();
}






