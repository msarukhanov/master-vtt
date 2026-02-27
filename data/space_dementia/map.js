mapSize = {x: 0, y: 0, w: 3516, h: 2616};

function createMapCrop(x, y, w, h, scale = 1) {
    const NS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(NS, "svg");
    svg.classList.add("crop-img");

    svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
    svg.setAttribute("width", w * scale);
    svg.setAttribute("height", h * scale);

    const image = document.createElementNS(NS, "image");
    image.setAttribute("href", map);
    image.setAttribute("width", "" + mapSize.w);
    image.setAttribute("height", "" + mapSize.h);
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");

    svg.appendChild(image);
    return svg;
}

images.spaceDementia.map = null;