export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (width * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;

  const normX = x / width;
  const normY = y / height;
  const grayscale = (normX + normY) / 2;
  const transparency = 1 - normX;
  const darkness = normY;
  const finalHue = (hue + grayscale) % 1.0;
  let colorValue = 0;

  if (channel === 0) {
    colorValue = Math.floor(finalHue * 255);
  } else if (channel === 1) {
    colorValue = Math.floor(grayscale * 255);
  } else if (channel === 2) {
    colorValue = Math.floor(darkness * 255);
  } else if (channel === 3) {
    colorValue = Math.floor(transparency * 255);
  } else {
    colorValue = 0;
  }
  return colorValue;
};