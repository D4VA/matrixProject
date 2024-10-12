const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const grayscaleButton = document.getElementById('grayscaleButton');

// Evento para cargar la imagen
uploadImage.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  };

  reader.readAsDataURL(file);
});

// Filtro de escala de grises
grayscaleButton.addEventListener('click', () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  ctx.putImageData(imageData, 0, 0);
});