function getPixelColor(x, y){
    var pxData = ctx.getImageData(x, y, 1, 1);
    return("rgb("+pxData.data[0]+","+pxData.data[1]+","+pxData.data[2]+")")
}
eyedropperIsActive = false;
$("#startDropper").click(function(e){eyedropperIsActive=true;});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").click(function(e){eyedropperIsActive=false;});
function handleMouseMove(e){
    if(!eyedropperIsActive){return;}

    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);

    var eyedropColor = getPixelColor(mouseX, mouseY);
    $("#results").css("backgoundColor", getPixelColor(mouseX, mouseY));
}