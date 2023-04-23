function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(640,420);
 canvas.center();
 video=createCapture(VIDEO);
 video.size(640,420);
 video.hide();
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting objects";
}
status="";
objects=[];
function modelLoaded(){
    console.log("Model is loaded!!!");
    status=true;

}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
console.log(results);
objects=results;
}

function draw(){
    image(video,0,0,640,420);
   
    if(status !=""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number").innerHTML="Number of objects detected are: "+objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

