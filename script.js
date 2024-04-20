var images = document.querySelector(".images");

var isDown = false;
var isTouch = false;
var prevX = 0;
var prevY = 0;
var currentX = images.offsetWidth / -2;
var currentY = images.offsetHeight / -2;

var currentXtmp = 0;
var currentYtmp = 0;

var ondown = (e) => {
    prevX = e.clientX;
    prevY = e.clientY;
    isDown = true;
}

var onmove = (e) => {
    if (!isDown) return;

    var deltaX = 
        Math.min(Math.max(e.clientX - prevX + 
            currentX, -images.offsetWidth), 0);

    var deltaY = 
        Math.min(Math.max(e.clientY - prevY + 
            currentY, -images.offsetHeight), 0);

    currentXtmp = deltaX;
    currentYtmp = deltaY;

    images.animate({
        transform: `translate(${deltaX}px, ${deltaY}px)`,
    }, { duration: isTouch ? 0 : 800, fill: "forwards"})
}

var onup = (e) => {
    currentX = currentXtmp;
    currentY = currentYtmp;
    isDown = false;
}

this.onmousedown = ondown;
this.onmousemove = onmove;
this.onmouseup = onup;

const content = document.getElementById('content');
let zoomLevel = 1; // Menyimpan level zoom saat ini
const minZoomLevel = 0.5; // Nilai minimum untuk zoom out

// Menangani peristiwa scroll mouse
function handleScroll(event) {
  if (event.deltaY > 0) {
    zoomLevel -= 0.1; // Mengurangi level zoom saat scroll ke bawah
    if (zoomLevel < minZoomLevel) {
      zoomLevel = minZoomLevel; // Batasi level zoom minimum
    }
  } else {
    zoomLevel += 0.1; // Menambahkan level zoom saat scroll ke atas
    if (zoomLevel > 3) {
      zoomLevel = 3; // Batasi level zoom maksimum
    }
  }

  content.style.transform = `scale(${zoomLevel})`; // Terapkan level zoom pada elemen konten
}

// Menambahkan event listener untuk scroll mouse
if (content.addEventListener) {
  // Untuk browser modern
  content.addEventListener('wheel', handleScroll);
} else {
  // Untuk browser lama
  content.attachEvent('onwheel', handleScroll);
}
