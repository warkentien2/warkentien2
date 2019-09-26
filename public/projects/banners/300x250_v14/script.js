/* jshint browser: true */
/* global TweenMax , TimelineLite  */

(function (window, undefined) {
  'use strict';

  var document = window.document,
    tl = new TimelineLite(),
    peopleArray = [],

    banner_container = document.getElementById('container_dc'),
    background = document.getElementsByClassName('background'),
    copy1 = document.getElementById('copy1'),
    copy2 = document.getElementById('copy2'),
    highlightedPerson = document.getElementById('highlighted-person'),
    copy3 = document.getElementById('copy3'),
    cta = document.getElementById('cta'),
    ctaHover = document.getElementById('cta-hover'),
    liver = document.getElementById('liver');

  function timeline() {
    var peopleToFadeAway = getListOfPeopleToFadeAway();
    var peopleBackgroundElementArray = [
      getPersonBackgroundElement(peopleToFadeAway[0]),
      getPersonBackgroundElement(peopleToFadeAway[1]),
      getPersonBackgroundElement(peopleToFadeAway[2]),
      getPersonBackgroundElement(peopleToFadeAway[3]),
      getPersonBackgroundElement(peopleToFadeAway[4]),
      getPersonBackgroundElement(peopleToFadeAway[5])
    ];

    tl
      .set(background, {scale: 0.5, transformOrigin: "50% 34%"})
      .set(peopleBackgroundElementArray[0], {backgroundColor: '#6a2863'})

      .to(background, 10, {scale: 0.24, rotation: 0.01})
      .staggerTo([
        peopleBackgroundElementArray[1],
        peopleBackgroundElementArray[2],
        peopleBackgroundElementArray[3],
        peopleBackgroundElementArray[4]
      ], 1, {backgroundColor: '#6a2863'}, 1.4, '-=8')

      .addLabel('changesCopy', '-=6')
      .to(copy1, 0.25, {autoAlpha: 0}, 'changesCopy')
      .to(copy2, 0.25, {autoAlpha: 1}, 'changesCopy+=0.3')

      .to(highlightedPerson, 1.5, {autoAlpha: 1}, '-=3.2')
      .set(getHighlightedPersonElement(), {autoAlpha: 0}, '-=2')

      // fades out copy 2
      .to(copy2, 1, {autoAlpha: 0}, '-=2.5')

      .addLabel('scaleHighlighted', '-=1.5')
      .staggerTo([
        peopleBackgroundElementArray[0],
        peopleBackgroundElementArray[1],
        peopleBackgroundElementArray[2],
        peopleBackgroundElementArray[3],
        peopleBackgroundElementArray[4],
        peopleBackgroundElementArray[5]
      ], 2, {autoAlpha: 0}, 0.15, 'scaleHighlighted-=0.5')

      .to(highlightedPerson, 2, {
        scale: 4.3,
        x: -290,
        y: -160,
        ease: Power2.easeOut,
        rotation: 0.01
      }, 'scaleHighlighted')

      .to([copy3, liver], 1.3, {autoAlpha: 1}, '-=0.8')
      .to('.description', 1, {
        autoAlpha: 1, ease: Power2.easeOut
    }, '+=2.5')
    ;
  }

  function getPersonBackgroundElement(people) {
    var peopleBackgroundColorElement = [];
    for (var i = 0; i < people.length; i++) {
      if (people[i]) {
        peopleBackgroundColorElement.push(people[i].getElementsByClassName('color'));
      }
    }

    return peopleBackgroundColorElement;
  }

  function getHighlightedPersonElement() {
    return peopleArray[134];
  }

  function getListOfPeopleToFadeAway() {
    var persons = [
      [
        peopleArray[30], peopleArray[47], peopleArray[49], peopleArray[64], peopleArray[65], peopleArray[66], peopleArray[67], peopleArray[68], peopleArray[69], peopleArray[70], peopleArray[71], peopleArray[72], peopleArray[73], peopleArray[74], peopleArray[75], peopleArray[84], peopleArray[85], peopleArray[86], peopleArray[87], peopleArray[88], peopleArray[89], peopleArray[90], peopleArray[91], peopleArray[92], peopleArray[93], peopleArray[94], peopleArray[95], peopleArray[96], peopleArray[104], peopleArray[105], peopleArray[109], peopleArray[111], peopleArray[112], peopleArray[128], peopleArray[133], peopleArray[142], peopleArray[143], peopleArray[144], peopleArray[145], peopleArray[146], peopleArray[147], peopleArray[163], peopleArray[164], peopleArray[165], peopleArray[166], peopleArray[167], peopleArray[180], peopleArray[183], peopleArray[184], peopleArray[186], peopleArray[187], peopleArray[195], peopleArray[196], peopleArray[198], peopleArray[199], peopleArray[200], peopleArray[201], peopleArray[202], peopleArray[203], peopleArray[207], peopleArray[208], peopleArray[209],
      ],
      [
        peopleArray[0], peopleArray[2], peopleArray[5], peopleArray[11], peopleArray[15], peopleArray[17], peopleArray[19], peopleArray[23], peopleArray[34], peopleArray[37], peopleArray[39], peopleArray[45], peopleArray[52], peopleArray[54], peopleArray[60], peopleArray[79], peopleArray[101], peopleArray[107], peopleArray[115], peopleArray[118], peopleArray[123], peopleArray[126], peopleArray[137], peopleArray[140], peopleArray[148], peopleArray[155], peopleArray[158], peopleArray[160], peopleArray[162], peopleArray[170], peopleArray[175], peopleArray[178], peopleArray[193]
      ],
      [
        peopleArray[1], peopleArray[4], peopleArray[8], peopleArray[12], peopleArray[16], peopleArray[18], peopleArray[20], peopleArray[26], peopleArray[35], peopleArray[38], peopleArray[42], peopleArray[46], peopleArray[53], peopleArray[58], peopleArray[76], peopleArray[83], peopleArray[103], peopleArray[110], peopleArray[116], peopleArray[120], peopleArray[125], peopleArray[131], peopleArray[139], peopleArray[141], peopleArray[152], peopleArray[157], peopleArray[159], peopleArray[161], peopleArray[169], peopleArray[173], peopleArray[177], peopleArray[179], peopleArray[194]
      ],
      [
        peopleArray[3], peopleArray[7], peopleArray[9], peopleArray[10], peopleArray[14], peopleArray[21], peopleArray[22], peopleArray[25], peopleArray[27], peopleArray[28], peopleArray[31], peopleArray[33], peopleArray[36], peopleArray[41], peopleArray[44], peopleArray[48], peopleArray[50], peopleArray[55], peopleArray[57], peopleArray[62], peopleArray[77], peopleArray[78], peopleArray[80], peopleArray[81], peopleArray[82], peopleArray[98], peopleArray[106], peopleArray[108], peopleArray[113], peopleArray[114], peopleArray[117], peopleArray[119], peopleArray[122], peopleArray[124], peopleArray[130], peopleArray[132], peopleArray[135], peopleArray[136], peopleArray[150], peopleArray[153], peopleArray[154], peopleArray[156], peopleArray[168], peopleArray[172], peopleArray[174], peopleArray[181], peopleArray[182], peopleArray[188], peopleArray[189], peopleArray[190], peopleArray[191], peopleArray[192]
      ],
      [
        peopleArray[6], peopleArray[13], peopleArray[24], peopleArray[29], peopleArray[40], peopleArray[51], peopleArray[59], peopleArray[63], peopleArray[97], peopleArray[100], peopleArray[121], peopleArray[129], peopleArray[149], peopleArray[151], peopleArray[176], peopleArray[197], peopleArray[204], peopleArray[205], peopleArray[206]
      ],
      [
        peopleArray[32], peopleArray[43], peopleArray[56], peopleArray[61], peopleArray[99], peopleArray[102], peopleArray[127], peopleArray[138], peopleArray[171], peopleArray[185]
      ]
    ];

    return persons;
  }

  function createPersonElement() {
    var person = document.createElement('div');
    var personBackgroundMask = document.createElement('div');
    var personBackgroundColor = document.createElement('div');

    person.className = 'person';
    personBackgroundMask.className = 'background-mask';
    personBackgroundColor.className = 'color';

    person.appendChild(personBackgroundMask);
    person.appendChild(personBackgroundColor);

    return person;
  }

  function createBackground() {
    var background = document.getElementById('background');
    var backgroundWidth = background.offsetWidth;
    var backgroundHeight = background.offsetHeight;

    var quantityOfPersonsToAppend = (backgroundWidth / 62 + 1) * (backgroundHeight / 124); // person's (width + 1line) & (height+7px)

    for (var i = 0; i < quantityOfPersonsToAppend; i++) {
      var person = createPersonElement();
      background.appendChild(person);

      peopleArray.push(person);
      person.setAttribute('data-index', i.toString());
    }
  }

  function positionHighlightedPerson() {
    var highlightedPersonElement = getHighlightedPersonElement();
    var left = highlightedPersonElement.offsetLeft;
    var top = highlightedPersonElement.offsetTop;

    highlightedPerson.style.top = top + 'px';
    highlightedPerson.style.left = left + 'px';
  }

  function init() {
    banner_container.style.opacity = 1;
    createBackground();
    positionHighlightedPerson();

    timeline();
    if (window.callPhantom) {
      tl.progress(1);
      window.callPhantom('takeShot');
    }

    cta.addEventListener('mouseover', function () {
      TweenMax.to(ctaHover, 0.1, {opacity: 1, display: 'block'});
    });

    ctaHover.addEventListener('mouseout', function () {
      TweenMax.to(ctaHover, 0.1, {opacity: 0, display: 'none'});
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
