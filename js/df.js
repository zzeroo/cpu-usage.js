function showGreenBar(id, data, drive, free, use) {
  // generate the canvas
  var canv = document.createElement("canvas");
  canv.style.cssText = 'border: solid 1px darkgray; background-color: #ccc;';
  canv.width = df.offsetWidth;
  canv.height = 25;
  canv.id = 'canv' + id;

  // fill the greenish bar
  var canvctx = canv.getContext("2d");
  canvctx.clearRect(0, 0, canv.width, canv.height);
  canvctx.fillStyle = "#86CF91";
  canvctx.fillRect(0, 0, (canv.width/100)*use, canv.height);
  
//  console.log(use);
  canvctx.fillStyle = "#000";
  canvctx.fillText(drive, 5, 15);
  
  canvctx.fillStyle = "#555";
  canvctx.fillText('free: ' + free + ' KB' + '    (' + parseInt(free/1024) + ' MiB)', 350, 15);

  return canv;
}

