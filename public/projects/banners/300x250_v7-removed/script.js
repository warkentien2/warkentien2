/**
 * isiSetup - An HTML banner
 * @version v1.0.0
 * @date 2-15-2017 at 16:32:27
 */
!function(e,t){
"use strict";
function a(){
  i.style.opacity="1",
  n=TweenLite.to,
  o=TweenLite.from,
  s=TweenLite.set,
  (c=TweenLite.delayedCall)(1,f)
}
var n,o,s,c,
r=document.getElementById("background_exit_ad"),
i=document.getElementById("container_ad"),
u=document.querySelector("#face img"),
d=document.getElementsByClassName("path-1"),
l=document.getElementsByClassName("path-2"),
m=document.getElementsByClassName("path-3"),
y=document.getElementsByClassName("path-4"),
f=function(){
  n([d,m],1.25,{delay:1.25,strokeDashoffset:0}),
  n([l,y],1.25,{delay:2.5,strokeDashoffset:0}),
  n(u,5.75,{scale:1.1,ease:Power0.easeInOut,rotation:.01,force3D:!0}),
  c(3.75,w)
},
w=function(){
  n("#copy1",1.25,{opacity:1,ease:Power2.easeIn}),
  c(2.25,p)
},
p=function(){
  g(),r.addEventListener("mouseenter",function(){g()})
},
g=function(){
  var e=.2;
  s("#cta",{x:-10,opacity:0}),
  s("#cta-arrow",{x:-2}),
  n("#cta",1,{opacity:1}),
  n("#cta",.5,{x:0}),
  n("#cta-arrow",.3,{delay:.2,x:3,ease:Power0.easeInOut}),
  c(.5,function(){n("#cta-arrow",e,{x:0,ease:Power0.easeInOut}),
  n("#cta-arrow",e,{delay:e,x:2,ease:Power0.easeInOut}),
  n("#cta-arrow",e,{delay:2*e,x:0,ease:Power0.easeInOut, onComplete: function(){
    TweenLite.to('.description', 1, {
      autoAlpha: 1, ease: Power2.easeOut, delay: 2.5
  })
  }})
})};
e.init=a}(this);