! function(e, a) {
  "use strict";

  function t() {
      TweenMax.set(c, {
          y: -p * u
      }), p++, g > p && TweenMax.delayedCall(.08, t)
  }

  function o() {
      function e() {
          banner_container.addEventListener("mouseover", function(e) {
              TweenLite.to(cta, .25, {
                  scale: 1.15,
                  rotation: .01,
                  ease: Power1.easeInOut
              })
          }, !1), banner_container.addEventListener("mouseout", function() {
              TweenLite.to(cta, .25, {
                  scale: 1,
                  ease: Power1.easeInOut
              })
          }, !1)
      }
      w.addLabel("start").set(r, {
          transformOrigin: "34.32% 40.77%"
      }, "start").set(i, {
          transformOrigin: "67.02% 42.3%"
      }, "start").set(d, {
          x: -3,
          y: -23,
          scaleX: .85,
          scaleY: .5
      }, "start").add(e, "start").addLabel("weigh-drop", "start").to(r, 3.5, {
          rotation: 2,
          ease: Power2.easeIn
      }, "weigh-drop").to(i, 3.5, {
          rotation: 6,
          y: 2,
          ease: Power2.easeIn
      }, "weigh-drop").to(d, 3.5, {
          x: 0,
          y: 0,
          scale: 1,
          ease: Power2.easeIn
      }, "weigh-drop").to("#copy1", .75, {
          autoAlpha: 1,
          ease: Power2.easeIn
      }, "weigh-drop+=0.25").to("#copy1", .75, {
          autoAlpha: 0,
          ease: Power2.easeOut
      }, "weigh-drop+=2.75").addLabel("fall", "weight-drop+=3.25").to([r, i], .125, {
          rotation: 0,
          x: 0,
          y: 0,
          ease: Elastic.easeOut.config(2.5, 1)
      }, "fall").to(d, .5, {
          y: 100,
          scale: 1.5,
          ease: Linear.easeNone
      }, "fall").to("#copy2", .75, {
          autoAlpha: 1,
          ease: Power2.easeIn
      }, "fall").add(t, "fall+=0.12").to(["#copy2", "#logo-small"], .75, {
          autoAlpha: 0,
          ease: Power2.easeOut
      }, "fall+=2.5").addLabel("glow").to(["#logo", "#copy3"], 1.25, {
          autoAlpha: 1,
          ease: Power2.easeInOut
      }, "glow").to("#bg2", 2, {
          autoAlpha: 1,
          ease: Power2.easeInOut
      }, "glow-=1.25")
      .to('.description', 1, {
        autoAlpha: 1, ease: Power2.easeOut
    }, '+=2.5')
  }

  function n() {
      l.style.opacity = 1, o(), e.callPhantom && (w.progress(1), e.callPhantom("takeShot"))
  }
  var s = e.document,
      l = s.getElementById("container-dc"),
      r = s.getElementById("aloe2"),
      i = s.getElementById("aloe3"),
      d = s.getElementById("drop"),
      c = s.getElementById("filmstrip"),
      w = new TimelineLite,
      u = 42,
      g = 18,
      p = 0;
  e.init = n, e.tl = w
}(this);