
var canvas = new fabric.Canvas('my_canvas');

const paintToggle = document.getElementById('paint');
paintToggle.onclick = () => {
  canvas.isDrawingMode = !canvas.isDrawingMode;
  if (canvas.isDrawingMode) {
    paintToggle.classList.add("paintActive");
  } else {
    paintToggle.classList.remove("paintActive");
  }
}

const save = document.getElementById('save');
save.onclick = () => {
  let serialized;
  console.log(serialized ? 'true' : 'false');

  serialized = JSON.stringify(canvas);
  canvas.clear();
  console.log(serialized);

  let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
			window.location = '/';
		}
	}
  const URL = 'http://localhost:3000/scrapbook';
	xhttp.open('POST', URL, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("Accept", "application/json");
	xhttp.send(serialized);
}

const addText = document.getElementById('textbox');
addText.onclick = () => {
  canvas.isDrawingMode = false;
  var textBox = new fabric.Textbox('Edit Text', {
    width: 50,
    height: 10,
    fontFamily: 'sans-serif',
  });

  canvas.add(textBox);
  canvas.setActiveObject(textBox);
}

document.getElementById('file').addEventListener("change", function (event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = (file) => {
    var data = file.target.result;                    
    fabric.Image.fromURL(data, (img) => {
      img.scaleToHeight(50);
      canvas.add(img).renderAll();
      canvas.setActiveObject(img);
    });
  };
  reader.readAsDataURL(file);
});

 
fabric.Image.fromURL('https://upload.wikimedia.org/wikipedia/commons/d/d7/Sad-pug.jpg', function(img) {
  img.set({ left: 400, top: 350});
  img.scaleToHeight(100);
  img.scaleToWidth(200);
  canvas.add(img);
});

let deleteImg = document.createElement('img');
deleteImg.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size/2, -size/2, size, size);
    ctx.restore();
  }
}

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: -16,
  offsetX: 16,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon(deleteImg),
  cornerSize: 24
});

function deleteObject(eventData, transform) {
  canvas.remove(canvas.getActiveObject());
}
