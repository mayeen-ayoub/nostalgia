// var data;
window.onload = function(){
  let pageId = document.getElementsByTagName("body")[0].id;
  if (pageId == 'index') {
    indexFunc();
  } else {
    scrapbookFunc();
  }
}

const indexFunc = () => {
  const newScrapbook = document.getElementById("new-scrapbook");

  newScrapbook.onclick = (event) => {
    event.preventDefault();
    const form = document.getElementById("new-scrapbook-form");
    form.classList.remove("hidden");
    const examples = document.getElementsByClassName("scrapbook-example");
    for (i = 0; i < examples.length; i++) {
      examples[i].classList.add("hidden");
    }
    newScrapbook.classList.add("hidden");
  }

  var scrapbookInfo;

  const createScrapbook = document.getElementById('create-scrapbook');
  createScrapbook.onclick = (event) => {
    event.preventDefault();
    let scrapbookInfoInputs = document.getElementById('scrapbook-form').getElementsByTagName("input");

    scrapbookInfo = {
      name: scrapbookInfoInputs[0].value,
      startDate: scrapbookInfoInputs[1].value,
    }
    window.location = "./scrapbook"
  }

  const scrapbook1 = document.getElementById('scrapbook-example-1');
  scrapbook1.onclick = () => {
    window.location = './scrapbook?edit';
  }
}

const scrapbookFunc = () => {
  var canvas = new fabric.Canvas('my_canvas');

  if (window.location.href.includes('?edit')) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        // console.log(xhttp.responseText)
        let data = xhttp.responseText;
        console.log(data);
        canvas.loadFromJSON(data);
        
        // data = undefined; 
      }
    }
    const URL = 'http://localhost:3000/scrapbook';
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
  }

  /***NEW */

  

  const paintToggle = document.getElementById('paint');
  paintToggle.onclick = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
      paintToggle.classList.add("paintActive");
    } else {
      paintToggle.classList.remove("paintActive");
    }
  }

  // var serialized;
  const save = document.getElementById('save');
  // var serialized;
  save.onclick = () => {
    let serialized;
    console.log(serialized ? 'true' : 'false');
    // if (!serialized) {
      serialized = JSON.stringify(canvas);
      canvas.clear();
      console.log(serialized);
    // } else {
    //   canvas.loadFromJSON(serialized);
    // }
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
    // textBox.set({ left: 400, top: 350});
    canvas.add(textBox);
    canvas.setActiveObject(textBox);
  }

  document.getElementById('file').addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (file) => {
      var data = file.target.result;                    
      fabric.Image.fromURL(data, (img) => {
        // img.set({ left: 400, top: 350});
        img.scaleToHeight(50);
        // img.scaleToWidth(100);
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


  //  var cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"

  let deleteImg = document.createElement('img');
  deleteImg.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  //  var cloneImg = document.createElement('img');
  //  cloneImg.src = cloneIcon;

  //  fabric.Object.prototype.cornerColor = 'blue';
  //  fabric.Object.prototype.cornerStyle = 'circle';

  //  function Add() {
  //    var rect = new fabric.Rect({
  //      left: 100,
  //      top: 50,
  //      fill: 'yellow',
  //      width: 200,
  //      height: 100,
  //      objectCaching: false,
  //      stroke: 'lightgreen',
  //      strokeWidth: 4,
  //    });

  //    canvas.add(rect);
  //    canvas.setActiveObject(rect);
  //  }

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

  //  fabric.Object.prototype.controls.clone = new fabric.Control({
  //    x: -0.5,
  //    y: -0.5,
  //    offsetY: -16,
  //    offsetX: -16,
  //    cursorStyle: 'pointer',
  //    mouseUpHandler: cloneObject,
  //    render: renderIcon(cloneImg),
  //    cornerSize: 24
  //  });

  //  Add();

  function deleteObject(eventData, transform) {
    canvas.remove(canvas.getActiveObject());
  }

  //  function cloneObject(eventData, transform) {
  //    var target = transform.target;
  //    var canvas = target.canvas;
  //    target.clone(function(cloned) {
  //      cloned.left += 10;
  //      cloned.top += 10;
  //      canvas.add(cloned);
  //    });
  //  }

}
