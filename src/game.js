// Game Script

//Player character - the dinosaur
const dino = document.querySelector(".dino");

// The background
const bg = document.querySelector(".bg");

// true if it's jumping, false otherwise
let jumpState = false;

// The dinosaur's position
let position;

// Function for processing the event when the key is let go
function handleKeyUp(event) {
    if (event.keyCode === 32) {
        console.log("DEBUG:: Space Key has been pressed.");
        jump();
    }
}

// Function for handling the player character jump action
function jump() {
    position = 0;
    jumpState = true;

    // Always executed given an interval
    let upInterval = setInterval(() => {
        if (position >= 150) {
            // Animation: going down
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position > 0) {
                    position -= 20;
                    dino.style.bottom = position + "px";
                } else {
                    clearInterval(downInterval);
                    jumpState = false;
                }
            }, 20);
        } else {
            // Animation: going up
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function generateCactus() {
    const cactus = document.createElement("div");
    let cactusPosition = screen.width;
    let randomSpawnTime = Math.random() * 6000;

    console.log("DEBUG::" + randomSpawnTime);

    cactus.classList.add("cactus");
    cactus.style.left = cactusPosition + "px";
    bg.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            bg.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            console.log("DEBUG:: Contact detected.");
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1>GAME OVER</h1>";
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(generateCactus, randomSpawnTime);
}

// Listens for the spacebar to be pressed
document.addEventListener("keyup", handleKeyUp);

// Game init
console.log("DEBUG:: " + dino);
generateCactus();
