! function(e, a) {
  "use strict";

  function o() {
      p.addEventListener("mouseover", function() {
          s("#cta", .3, {
              scale: 1.07,
              autoAlpha: .5
          })
      }), p.addEventListener("mouseleave", function() {
          s("#cta", .4, {
              scale: 1,
              autoAlpha: 1
          })
      })
  }
  var t, c, l = e.document,
      r = new TimelineMax,
      y = new TimelineMax({
          paused: !0
      }),
      s = TweenMax.to,
      n = (TweenMax.set, l.getElementById("container_dc")),
      p = l.getElementById("background_exit_dc");
  y.addLabel("bounce").to("#ball", 4, {
      rotation: -180,
      ease: Power1.easeIn
  }, "bounce").to("#ball", 1.5, {
      bezier: {
          type: "soft",
          values: [{
              x: 0,
              y: 0
          }, {
              x: 40,
              y: -25
          }, {
              x: 80,
              y: -40
          }, {
              x: 25,
              y: -52
          }, {
              x: -10,
              y: -60
          }, {
              x: -87,
              y: 10
          }, {
              x: -110,
              y: 90
          }]
      }
  }, "bounce").to("#ball", 3, {
      x: -310
  }, "bounce+=1.5").to("#ball", .6, {
      y: 30,
      ease: Power1.easeOut
  }, "bounce+=1.5").to("#ball", .6, {
      y: 85,
      ease: Power1.easeIn
  }, "bounce+=2.1").to("#ball", .6, {
      y: 50,
      ease: Power1.easeOut
  }, "bounce+=2.7").to("#ball", .6, {
      y: 90,
      ease: Power1.easeIn
  }, "bounce+=3.3"), t = function() {
      r.addLabel("start").set("#copy3", {
          x: -191
      }).set("#copy3-img", {
          x: 191
      }).set("#ball", {
          scale: 3,
          x: -600,
          y: 200
      }).set("#goalie", {
          x: -230,
          y: 60,
          rotation: 10
      }).set("#ally-logo, #copy1a, #copy1b, #copy1c, #copy2a, #copy2b, #copy2c, #copy4, #copy5, #cta, #icc-logo", {
          autoAlpha: 0
      }).addLabel("frame1", "start+=1.25").to("#dash-top, #dash-bottom-img", .2, {
          y: -55
      }, "frame1").to("#dash-top-img, #dash-bottom", .2, {
          y: 55
      }, "frame1").to("#icc-logo", 1.25, {
          autoAlpha: 1,
          ease: Power3.easeIn
      }, "frame1+=0.09").addLabel("frame2", "frame1+=2.35").to("#ally-logo-stacked, #dash, #icc-logo", .1, {
          autoAlpha: 0
      }, "frame2").to("#ally-logo", .65, {
          autoAlpha: 1
      }, "frame2+=0.09").staggerTo(["#copy1a", "#copy1b", "#copy1c"], .01, {
          autoAlpha: 1
      }, .2, "frame2+=0.675").to("#ball", 1.95, {
          scale: 1,
          bezier: {
              type: "soft",
              values: [{
                  x: -600,
                  y: 200
              }, {
                  x: -420,
                  y: 120
              }, {
                  x: -210,
                  y: 30
              }, {
                  x: 0,
                  y: 0
              }]
          },
          rotation: 1080,
          ease: Power4.easeOut
      }, "frame2+=1.35").to("#goalie", 1.3, {
          x: 0,
          y: 0,
          ease: Power4.easeOut,
          rotation: 0
      }, "frame2+=1.6").staggerTo(["#copy2a", "#copy2b", "#copy2c"], .01, {
          autoAlpha: 1
      }, .3, "frame2+=2.3").addLabel("frame3", "frame2+=3.75").to("#copy1a, #copy1b, #copy1c", .1, {
          autoAlpha: 0
      }, "frame3").to("#copy3", .001, {
          x: -130
      }, "frame3+=0.225").to("#copy3-img", .001, {
          x: 130
      }, "frame3+=0.225").to("#copy3", .001, {
          x: -57
      }, "frame3+=0.45").to("#copy3-img", .001, {
          x: 57
      }, "frame3+=0.45").to("#copy3, #copy3-img", .001, {
          x: 0
      }, "frame3+=0.675").addLabel("save", "frame3+=2.35").to("#goalie", 1.05, {
          bezier: {
              type: "soft",
              values: [{
                  x: 0,
                  y: 0
              }, {
                  x: 80,
                  y: 20
              }, {
                  x: 130,
                  y: 70
              }, {
                  x: 190,
                  y: 150
              }]
          },
          transformOrigin: "0 100%",
          rotation: 10,
          ease: Power1.easeIn
      }, "save").addLabel("ball", "save+=0.1").add(y.timeScale(1.3).play(0), "ball").addLabel("frame4", "frame3+=2.15").to("#copy3, #copy2a, #copy2b, #copy2c", .1, {
          autoAlpha: 0
      }, "frame4").to("#copy4", .5, {
          autoAlpha: 1,
          ease: Power1.easeOut
      }, "frame4").to("#copy5", 1, {
          autoAlpha: 1,
          ease: Power3.easeIn
      }, "frame4+=2.45").to("#cta", .5, {
          autoAlpha: 1
      }, "frame4+=3.9").add(o)
      .to('.description', 1, {
        autoAlpha: 1, ease: Power2.easeOut
    }, '+=2.5'), r.timeScale(1.1)
  }, e.tl = r;
  window.init = function() {
    n.style.opacity = 1, t(),  
    e.callPhantom && (r.progress(1), e.callPhantom("takeShot"))
  }
}(this);