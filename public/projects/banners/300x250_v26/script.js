! function(t, e) {
  "use strict";
  var a, o, n = t.document,
      l = new TimelineLite,
      m = n.getElementById("container-dc"),
      r = n.getElementById("frm1-img1"),
      i = (n.getElementById("frm2-img1"), n.getElementById("frm2-logo1")),
      c = n.getElementById("frm1-copy1"),
      d = n.getElementById("frm1-copy2"),
      p = n.getElementById("frm2-copy1"),
      u = n.getElementById("frm2-copy2"),
      f = n.getElementById("frm2-cta1"),
      y = n.getElementById("frm2-cta2");
  a = function() {
      l.addLabel("start").to(r, 6, {
          x: -35,
          rotation: .01
      }).to(c, .25, { autoAlpha: 1 }, "start+=0.5")
      .to(c, .25, { autoAlpha: 0 }, "start+=2.5")
      .to(d, .25, { autoAlpha: 1 }, "start+=3")
      .to(d, .25, { autoAlpha: 0 }, "start+=5")
      .to(r, .5, { autoAlpha: 0 }, "-=0.25")
      .to(i, .5, { autoAlpha: 1 }, "-=0.5")
      .addLabel("frame2")
      .to(p, .25, { autoAlpha: 1 }, "frame2+=0.75")
      .to([u, f], .25, { autoAlpha: 1 }, "frame2+=1.5")
      .append(function() {
          TweenMax.set(y, {
              autoAlpha: 1
          }), f.addEventListener("mouseenter", function() {
              TweenMax.to(f, .25, {
                  opacity: 0
              })
          }), f.addEventListener("mouseleave", function() {
              TweenMax.to(f, .25, {
                  opacity: 1
              })
          })
      })
      .to('.description', 1, {
        autoAlpha: 1,
        ease: Power2.easeOut
    }, '+=2.5')
  }, o = function() {
      m.style.opacity = 1, a(), t.callPhantom && (l.progress(1), t.callPhantom("takeShot"))
  }, t.init = o, t.tl = l
}(this);