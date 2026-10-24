/* jshint browser: true */
/* global TweenMax, TimelineLite */
(function (window, undefined) {
  'use strict';

  var document = window.document,
    tl = new TimelineLite(),
    bannerContainer = document.getElementById('container-dc')
  ;

  function startAnimation() {
    tl
    .addLabel('start')
    .set('#white-band', {y: 59}, 'start')
    .set('#copy2', {x: 300}, 'start')
    .set('#pink-band', {x: 300}, 'start')
    .set(['#copy3', '#copy4', '#logo-bottom', '#cta'], {x: -300}, 'start')
    .set('#products', {x: 300, y: 85}, 'start')
    .to('#wrapper-band', 1, {x: -138, ease: Power3.easeOut}, 'start')
    .to('#band', 1, {x: 138, ease: Power3.easeOut}, 'start')

    .addLabel('frame1', 'start+=1.5')
    .to('#copy1', 0.5, {autoAlpha: 0}, 'frame1')
    .to(['#person', '.band'], 1, {scale: 1.25, ease: Power1.easeOut}, 'frame1+=0.2')
    .to('#pink-band', 1, {x: 170, ease: Power3.easeOut}, 'frame1+=0.2')
    .to('#copy2', 1, {x: 0, ease: Power3.easeOut}, 'frame1+=0.2')

    .addLabel('frame2', 'frame1+=2')
    .to('#copy2', 0.5, {autoAlpha: 0}, 'frame2')
    .to('#pink-band', 1, {x: 0, ease: Power3.easeOut}, 'frame2+=0.4')
    .to(['#copy3', '#products'], 1, {x: 0, ease: Power3.easeOut}, 'frame2+=1')

    .addLabel('frame3', 'frame2+=4')
    .to('#copy3', 0.5, {autoAlpha: 0}, 'frame3')
    .to(['#copy4', '#cta'], 1, {x: 0, ease: Power3.easeOut}, 'frame3+=0.5')
    .to('#products', 0.5, {y: 0, ease: Power1.easeOut}, 'frame3+=0.5')
    .to('#white-band', 0.5, {y: 0, ease: Power1.easeOut}, 'frame3+=0.6')
    .to('#logo-bottom', 1, {x: 0, ease: Power3.easeOut}, 'frame3+=0.8')
    .to('.description', 1, {
      autoAlpha: 1, ease: Power2.easeOut
  }, '+=2.5')
    ;
  }

  function init() {
    bannerContainer.style.opacity = 1;
    startAnimation();
  }

  // Export our init function
  window.init = init;
  // Exports our tl
  window.tl = tl;

})(this);
