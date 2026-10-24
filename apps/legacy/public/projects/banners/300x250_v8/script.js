/**
 * isiSetup - An HTML banner
 * @version v1.0.0
 * @date 11-23-2016 at 15:21:36
 */
var background_exit_ad=document.getElementById("background_exit_ad"),circleIsh=document.getElementById("circle-ish"),shineWrapper=document.getElementById("shine-wrapper"),tt,tf,ts,td,bannerInit=function(){
  container_ad.style.opacity="1",
  tt=TweenLite.to,
  tf=TweenLite.from,
  ts=TweenLite.set,
  (td=TweenLite.delayedCall)(1,frame01)},
frame01=function(){ts(circleIsh,{opacity:0}),ts(circles,{opacity:.73}),tt(circles,.8,{scale:1,ease:Power1.easeOut,rotation:.01}),tt(girl,.75,{delay:.25,ease:Power1.easeOut,opacity:0}),tt(text1,1,{delay:.45,ease:Power2.easeIn,opacity:1,onComplete:frame02})},
frame02=function(){tt(text1,.5,{delay:1.45,ease:Sine.easeOut,opacity:0}),tt(text2,1,{delay:2,ease:Sine.easeIn,opacity:1,onComplete:frame03})},
frame03=function(){
  tt(text2,.75,{delay:1.45,ease:Sine.easeOut,opacity:0}),
  tt(circles,.65,{delay:1.55,ease:Power2.easeIn,opacity:1}),
  tt([text3,logo,cta,shineWrapper],.75,{delay:1.7,ease:Power2.easeIn,opacity:1,onComplete:addShine})
},
shineFx=function(){
  ts(shine,{x:0}),
  tt(shine,1.5,{ease:Power1.easeOut,x:200,rotation:.01, onComplete: function(){
    TweenLite.to('.description', 1, {
      autoAlpha: 1, ease: Power2.easeOut, delay: 2.5
  })
  }})
},
addShine=function(){
  background_exit_ad.addEventListener("mouseenter",function(){shineFx()},!1),
  td(.35,shineFx)
};