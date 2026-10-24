/* jshint browser: true */
/* global TweenMax , TimelineLite  */

(function (window, undefined) {
  'use strict';

  var document = window.document,
    tl = new TimelineLite(),

    banner_container = document.getElementById('container_dc'),
    background = document.getElementsByClassName('background'),
    copy1 = document.getElementById('copy1'),
    copy2 = document.getElementById('copy2'),
    copy3 = document.getElementById('copy3'),
    liver = document.getElementById('liver'),

    calendarContainer = document.getElementById('calendar-container'),

    staticContainer = document.getElementById('static'),
    calendarColors = document.getElementsByClassName('calendar-color'),
    spriteSheets = document.getElementsByClassName('spritesheet'),

    calendarBackFaceMask = document.getElementById('calendar-backface-mask'),
    calendarBackFace = document.getElementById('calendar-backface'),
    cta = document.getElementById('cta'),
    ctaHover = document.getElementById('cta-hover')
    ;

  function timeline() {
    var spriteSheetShift = 0;

    function shiftSpriteSheeet() {
      spriteSheetShift -= 94;
      TweenMax.set(spriteSheets, {x: spriteSheetShift});
    }

    tl
      .set(calendarBackFaceMask, {rotation: -45, transformOrigin: '75% 20px'})
      .set(calendarBackFace, {rotation: -60, transformOrigin: '167px 50px'})
      .set(staticContainer, {rotation: 45, transformOrigin: '75% 20px'})

      .to(calendarContainer, 1, {opacity: 1}, '+=0.5')

      .addLabel('flipCalendarPage', '-=0.5')
      .to(calendarBackFaceMask, 0.2, {rotation: 0, repeat: 9, onRepeat: shiftSpriteSheeet}, 'flipCalendarPage')
      .to(calendarBackFace, 0.2, {rotation: 0, x: 101, repeat: 9}, 'flipCalendarPage')
      .to(staticContainer, 0.2, {rotation: 0, repeat: 9}, 'flipCalendarPage')

      .to(calendarBackFace, 1, {rotation: 40}, '-=0.4')

      .to([copy1, calendarContainer], 0.7, {opacity: 0}, '+=0.2')
      .to(copy2, 0.7, {opacity: 1})

      .set(calendarBackFaceMask, {rotation: -45})
      .set(calendarBackFace, {rotation: -60, x: 11})
      .set(staticContainer, {rotation: 45})

      // Return calendar to it's initial rotation to display it correctly
      .set(calendarBackFaceMask, {rotation: 0, onStart: shiftSpriteSheeet})
      .set(calendarBackFace, {rotation: 0, x: 101})
      .set(staticContainer, {rotation: 0})
      .set(calendarBackFace, {rotation: 40})
      .set(calendarColors[1], {opacity: 0})

      .to(calendarContainer, 1, {opacity: 1})

      .to([calendarContainer, copy2], 0.7, {opacity: 0}, '+=2.3')
      .to([copy3, liver], 0.7, {opacity: 1})
      .to('.description', 1, {
        autoAlpha: 1, ease: Power2.easeOut
    }, '+=2.5')
    ;
  }

  function init() {
    banner_container.style.opacity = 1;

    timeline();
    if (window.callPhantom) {
      tl.progress(1);
      window.callPhantom('takeShot');
    }

    cta.addEventListener('mouseover', function () {
      TweenMax.to(ctaHover, 0.2, {opacity: 1, display: 'block'});
    });

    ctaHover.addEventListener('mouseout', function () {
      TweenMax.to(ctaHover, 0.2, {opacity: 0, display: 'none'});
    });

    ctaHover.addEventListener('click', function () {
      window.open(window.clickTag);
    });
  }

  // Export our init function
  window.init = init;
  // Exports our tl
  window.tl = tl;

}(this));
