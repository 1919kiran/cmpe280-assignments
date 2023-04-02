var video = $('video')[0];
var canvas = $('canvas')[0];
var context = canvas.getContext('2d');
var localstream;

$('#vid-div').hide();
$('#canvas-div').hide();

$('#vid-cap').click(function () {
  $('#vid-div').show();
  navigator.getUserMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.oGetUserMedia ||
                            navigator.msGetUserMedia;

  if(navigator.getUserMedia){
    navigator.getUserMedia({video:true}, streamWebCam, throwError);
  }
});

$('#cancel-vid').click(function () {
  stopStream(localstream);
});

function stopStream(stream) {
  video.pause();
  video.src="";
  stream.getTracks()[0].stop();
  $('#vid-div').hide();
  console.log("Video stopped");
};

function streamWebCam (stream) {
  video.src = window.URL.createObjectURL(stream);
  localstream = stream;
  video.play();
};

function throwError (e) {
  alert(e.name);
};

$('#snap').click(function () {
  canvas.width = 200;
  canvas.height = 150;
  context.drawImage(video, 0, 0, canvas.width, canvas.height );

  var data = canvas.toDataURL('image/png');
  console.log('Image src: ', data);
  $('#photo').attr('src', data);
  $('#canvas-div').show();
});

$('#demo-save').click(function () {
  $('#canvas-div').hide();
  stopStream(localstream);
});

$('#reset').click(function () {
  $('#photo').attr('src','');
  $('#canvas-div').hide();
  stopStream(localstream);
});

$("#scroll").click(function() {
    $('html,body').animate({
        scrollTop: $("#demo-header").offset().top},
        1000);
});

$("#logo-name").click(function () {
  $('html,body').animate({
    scrollTop: $("#home").offset().top
  }, 1000);
});

$("#home-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#home").offset().top},
        1000);
});

$("#demo-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#demo-header").offset().top},
        1000);
});

$("#vitals-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#vitals-header").offset().top},
        1000);
});

$("#reports-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#reports-header").offset().top},
        1000);
});

$("#to-top").click(function () {
  $('html,body').animate({
    scrollTop: $("#home").offset().top
  }, 1000);
});

$(window).scroll(function(){
    $(".arrow").css("opacity", 1 - $(window).scrollTop() / 250);
    $("#scroll").css("opacity", 1 - $(window).scrollTop() / 250);
    $("#home").css("opacity", 1 - $(window).scrollTop() / 3000);
});
