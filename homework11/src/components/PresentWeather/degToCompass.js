const degToCompass = (num) => {
    const index = Math.floor((num / 22.5) + .5);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return directions[(index % 16)];
}

export default degToCompass;