(function () {
  'use strict';

  var play = document.getElementById('playButton'),
    pause = document.getElementById('pauseButton'),
    resume = document.getElementById('resumeButton'),
    reverse = document.getElementById('reverseButton'),
    restart = document.getElementById('restartButton')
    ;

  var tl = window.tl;

  play.addEventListener('click', function () {
    console.log('playing;');
    tl.play();
  });

  pause.addEventListener('click', function () {
    console.log('pausing;');
    tl.pause();
  });

  resume.addEventListener('click', function () {
    console.log('resuming;');
    tl.resume();
  });

  reverse.addEventListener('click', function () {
    console.log('reversing;');
    tl.reverse();
  });

  restart.addEventListener('click', function () {
    console.log('restarting;');
    tl.restart();
  });

})();
