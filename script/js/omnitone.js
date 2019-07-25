let audioContext;
let scene;
let audioSources;
let audioElementSources = [];
let audioElements = [];
let soundSources = [];
let dimensions = {
    small: {
        width: 1.5,
        height: 2.4,
        depth: 1.3,
    },
    medium: {
        width: 4,
        height: 3.2,
        depth: 3.9,
    },
    large: {
        width: 8,
        height: 3.4,
        depth: 9,
    },
    huge: {
        width: 20,
        height: 10,
        depth: 20,
    },
};
let materials = {
    curtains: {
        left: 'curtain-heavy',
        right: 'curtain-heavy',
        up: 'wood-panel',
        down: 'wood-panel',
        front: 'curtain-heavy',
        back: 'curtain-heavy',
    },
    outside: {
        left: 'transparent',
        right: 'transparent',
        up: 'transparent',
        down: 'grass',
        front: 'transparent',
        back: 'transparent',
    },
};
let dimensionSelection = 'large';
let materialSelection = 'curtains';
let audioReady = false;



function initAudio() {
    audioContext = new(window.AudioContext || window.webkitAudioContext);
    audioSources = [
    '../../sound/FinWhale.mp3',
    '../../sound/Blue.mp3',
    '../../sound/Brydes.mp3',
    '../../sound/CaSeaLion.mp3',
    '../../sound/Fin.mp3',
    '../../sound/Humpback.mp3',
    '../../sound/Rissos.mp3',
    '../../sound/Whale.mp3', 
    '../../sound/dolphin.mp3'        
  ];

    // Initialize scene and create Source(s).
    scene = new ResonanceAudio(audioContext, {
        ambisonicOrder: 1,
    });

    scene.output.connect(audioContext.destination);

    audioReady = true;
}


function addAudio() {

    let index = Math.round(Math.random() * (audioSources.length - 1));
    audioElements[flock.boids.length - 1] = document.createElement('audio');
    audioElements[flock.boids.length - 1].src = audioSources[index];
    audioElements[flock.boids.length - 1].crossOrigin = 'anonymous';
    audioElements[flock.boids.length - 1].load();
    audioElements[flock.boids.length - 1].loop = true;
    audioElementSources[flock.boids.length - 1] =
    audioContext.createMediaElementSource(audioElements[flock.boids.length - 1]);

    soundSources[flock.boids.length - 1] = scene.createSource();
    audioElementSources[flock.boids.length - 1].connect(soundSources[flock.boids.length - 1].input);

}


function update() {
    if (!audioReady) {
        initAudio();
    }

    for (let i = 0; i < flock.boids.length; i++) {
        let x = (flock.boids[i].position.x / window.innerWidth - 0.5) * dimensions[dimensionSelection].width / 2;
        let y = 0;
        let z = (flock.boids[i].position.y / window.innerHeight - 0.5) * dimensions[dimensionSelection].depth / 2;

        soundSources[i].setPosition(x, y, z);
        scene.setListenerPosition(0.5, 0, 0.5);
    }

}



function play() {
    audioElements[flock.boids.length - 1].play();
}


function refresh() {
    for (let i = 0; i < flock.boids.length; i++) {
        audioElements[i].pause();
        audioElements[i].currentTime = 0;
    }
    flock.boids = [];
}



let ocean = document.querySelector("#ocean");
    ocean.volume = 0.6;


document.body.onclick = () =>{
    ocean.play();
    $( ".info" ).fadeOut(2000);
    $( ".pos" ).fadeOut(2000);    
    $( ".click" ).fadeOut(2000);        
}


