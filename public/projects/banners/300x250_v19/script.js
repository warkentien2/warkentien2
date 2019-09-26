/* jshint browser: true */
/* global TweenMax , TimelineMax  */
(function (window, undefined) {
  'use strict';

  var document = window.document,
    tl = new TimelineMax({paused: true}),
    tt = TweenMax.to,
    banner_container = document.getElementById('container-dc'),
    bgExitDc = document.getElementById('background-exit-dc'),
    isiBody = document.getElementById('isi-body'),
    tlIsiScroll,
    timeline,
    init;

  timeline = function() {
    tl
      .addLabel('start')
      .add(addListeners, 'start')
      .set('.panel', {x: -121, autoAlpha: 0.5}, 'start')
      .set(['#copy2-a', '#copy3-a'], {y: 45}, 'start')
      .set('#copy1-b', {y: -60}, 'start')
      .set(['#copy2-b', '#copy3-b'], {y: -55}, 'start')
      .set('#isi-container', {y: 91}, 'start')
      .set('#cta-mask', {autoAlpha: 0.75}, 'start')
      .addLabel('frame01', 'start')
      .to('#lever-head', 1.75, {rotationX: 720, ease: Power2.easeInOut}, 'frame01+=1.25')
      .to(['#copy1-a', '#copy1-b'], 1.75, {y: 0, ease: Power2.easeInOut}, 'frame01+=1.25')
      .to('#copy1-mask', 0.5, {autoAlpha: 0}, 'frame01+=3')
      .addLabel('frame02')
      .staggerTo('.panel', 1, {x: 0, scaleX: 1.2, rotation: 0.01, ease: Power1.easeIn}, 0.125, 'frame02+=1')
      .to('.panel', 2.325, {autoAlpha: 0.675}, 'frame02+=1.125')
      .to(['#lever', '#copy1-a', '#copy1-b'], 1.5, {autoAlpha: 0}, 'frame02+=1.25')
      .to('#taltz-logo', 2.5, {autoAlpha: 1}, 'frame02+=1.75')
      .to('#isi-container', 1.25, {y: 0, ease: Power2.easeOut}, 'frame02+=2.25')
      .to(bgExitDc, 1.25, {y: -91, ease: Power2.easeOut}, 'frame02+=2.25')
      .addLabel('frame03', 'frame02+=2.5')
      .set('#lever', {x: 26, y: -41}, 'frame03')
      .set('#lever-head', {x: -13, rotationX: -90}, 'frame03')
      .set('#lever-stem', {scaleX: 0, transformOrigin: '0 0'}, 'frame03')
      .to('#lever', 0.25, {autoAlpha: 1}, 'frame03')
      .to('#lever-stem', 0.5, {scaleX: 2}, 'frame03')
      .to('#copy2-3-mask', 0.1, {autoAlpha: 1}, 'frame03+=0.25')
      .to('#lever-head', 0.5, {rotationX: 0}, 'frame03+=0.25')
      .to('#lever-head', 1.75, {rotationX: 720, ease: Power2.easeInOut}, 'frame03+=0.5')
      .to(['#copy2-a', '#copy2-b'], 1.5, {y: 0, ease: Power2.easeInOut}, 'frame03+=0.75')
      .addLabel('frame04', 'frame03+=5')
      .set('#lever-head', {rotationX: 0}, 'frame04')
      .to(['#copy2-a', '#copy2-b'], 1, {autoAlpha: 0}, 'frame04+=0.25')
      .to('#lever', 0.75, {y: -38, ease: Power1.easeInOut, rotation: 0.01}, 'frame04+=0.6')
      .to('#lever-head', 1.75, {rotationX: 720, ease: Power2.easeInOut}, 'frame04+=0.625')
      .to(['#copy3-a', '#copy3-b'], 1.5, {y: 0, ease: Power2.easeInOut}, 'frame04+=0.75')
      .to('#copy2-3-mask', 0.5, {autoAlpha: 0}, 'frame04+=2.25')
      .addLabel('frame05', 'frame04+=4')
      .to(['#copy3-a', '#lever', '#copy3-b'], 1, {autoAlpha: 0}, 'frame05+=0.5')
      .staggerTo(['#copy4', '#cta'], 0.75, {autoAlpha: 1, ease: Power1.easeInOut}, 0.75, 'frame05+=1.5')
      .to('#cta-mask', 0.5, {autoAlpha: 0, ease: Power1.easeOut}, 'frame05+=2.5')
      .add(AutoScroll, 'frame05+=3')
      .to('.description', 1, {
        autoAlpha: 1, ease: Power2.easeOut
    }, '+=2.5')
    ;

    tl.timeScale(1.2).play('start');
  };

  function AutoScroll() {
    tlIsiScroll = tt(isiBody, 200, {
        scrollTo: {
            y: 'max'
        },
        ease: Linear.easeNone,
        force3D: false
    });
  }

  function addListeners() {
    isiBody.addEventListener('mousedown', function() {
      if (tlIsiScroll) {
        tlIsiScroll.kill();
        tlIsiScroll = false;
      }
    });
  }

  init = function init() {
    banner_container.style.opacity = 1;
    timeline();
  };

  // Export our init function
  window.init = init;
  // Exports our tl
  window.tl = tl;

}(this));
