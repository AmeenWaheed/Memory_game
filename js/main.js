let controlBtn = document.querySelector(".control-btn");
let control = document.querySelector(".control-btn span");
let name = document.querySelector(".info .name span");



control.onclick = function () {
    let userName = prompt("Enter Your Name: ");

    if (userName == null || userName == "") {
        name.innerHTML = "Unkown";
    } else {
        name.innerHTML = `${userName}`;
    }

    controlBtn.style.zIndex = "-1";
    control.remove();
}

// Duration
let duration = 1000;

let blocksContainer = document.querySelector(".game");

let blocks = Array.from(blocksContainer.children);

let range = [...Array(blocks.length).keys()];

// Create Shuffle Function

function shuffle(arr) {
    let current = arr.length;
    let temp, random;

    while (current > 0) {
        // get randowm number 
        random = Math.floor(Math.random() * current);

        // Decrease Length 1
        current--;

        // Save current element to stash
        temp = arr[current];

        // Current element = random element
        arr[current] = arr[random];

        // Random element = get elment from stash
        arr[random] = temp;
    }

    return arr;

}

shuffle(range);

// Function Flipped
function flipBlock(selectedBox) {
    selectedBox.classList.add("is-flipped");

    // Collect all Flipped card
    let allFlipped = blocks.filter(flippedBlock => 
        flippedBlock.classList.contains("is-flipped"));
    
    if (allFlipped.length === 2) {
        // Stop Clicking Function
        stopClicking();
    
        // Check method block
        checkBlock(allFlipped[0], allFlipped[1]);
    }

}

// Stop Clicking
function stopClicking() {
    // add Class no click
    blocksContainer.classList.add("stop-click");

    setTimeout(() => {
        // Remove Class stop click
        blocksContainer.classList.remove("stop-click");
    }, duration);
}

function gameOver() {
    blocksContainer.classList.add("game-over");

    // Add click event on game over 
    document.getElementById("over").onclick = function () {
        // document.querySelector(".tries span").innerHTML = 0;
        // blocksContainer.classList.remove("game-over");
        // document.getElementById("over").remove();
        window.open("index.html", "_self");
    }


}

// Check 
function checkBlock(first, second) {
    let tries = document.querySelector(".tries span");

    if (first.dataset.technology === second.dataset.technology) {
        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");

        first.classList.add("has-match");
        second.classList.add("has-match");

        setTimeout(() => {
            first.classList.remove("has-match");
            second.classList.remove("has-match");
        }, duration);

        document.getElementById("success").play();
    } else {
        tries.innerHTML++;

        setTimeout(() => {
            first.classList.remove("is-flipped");
            second.classList.remove("is-flipped");
        }, duration);

        document.getElementById("fail").play();

        if (tries.innerHTML === "10") {
            document.getElementById("over").style.display = "block";
            gameOver();
            
        }
    }

}

blocks.forEach((block, index) => {
    // Add Order Css Property to game blocks
    block.style.order = range[index];

    // Add Click event
    block.addEventListener('click', function () {
        flipBlock(block);
    })
});


let scroll = document.querySelector(".scroll");

window.onscroll = function () {
    // console.log(this.scrollY);
    if (this.scrollY >= 757.5) {
        scroll.classList.add("show");
    } else {
        scroll.classList.remove("show");
    }
}

scroll.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}