//define variable for our location
let audioCtx;

let freq = 0;

// create web audio api context
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node and Gain node
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
// lower the volume
gainNode.gain.setValueAtTime(0.35, audioCtx.currentTime); // set initial gain to 0

oscillator.type = "triangle";
oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz

//connect it all together
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);


async function sonify() {
  audioCtx.resume();
  oscillator.start();
  console.log(locale.value); 
  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locale.value
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    // console.log("the weather over the next few days is:" + result.days[0].temp + " " + result.days[1].temp + " " + result.days[2].temp);
    // console.log("the wind gust over the next few days is:" + result.days[0].windgust + " " + result.days[1].windgust + " " + result.days[2].windgust);
    freq = result.days[0].temp * 2; 
    console.log(freq / 2); 
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
    info.innerHTML = "the weather in " + locale.value + " is " + result.days[0].temp
    if (result.days[0].temp < 60) {
      info.innerHTML += " ❄️"
    }
    else {
      info.innerHTML += " ☀️"
    }
  } catch (error) {
    console.error(error.message);
  }
}

function stop(){
  audioCtx.suspend();
}






