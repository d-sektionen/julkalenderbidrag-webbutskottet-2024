const cv = document.getElementById("myCanvas");
const ctx = cv.getContext("2d");
const img = new Image();
img.onload = () => {
    ctx.drawImage(img, 0, 0);
    document.getElementById("bg").style.opacity = 1;
};

img.src = "fg.jpg";
cv.style.backgroundColor = "rgba(255, 0, 255, 0.0)";

const pos = { x: 0, y: 0 };
const updateMouse = (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
};

const update = (e) => {
    ctx.globalCompositeOperation = 'xor';
    const r = cv.getBoundingClientRect();
    const x = pos.x - r.left;
    const y = pos.y - r.top;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fill();
    const imgData = ctx.getImageData(0, 0, cv.width, cv.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255) {
            data[i + 3] = 0;
        }
    }
    ctx.putImageData(imgData, 0, 0);

    requestAnimationFrame(update);
}
cv.onmousemove = updateMouse;

update();