((function() {
  var bannerWrapper = document.getElementsByClassName('banners')[0];
  var banners = Array.prototype.slice.call(document.getElementsByClassName('banner'));

  function loadBanners() {
    var i = 0;                   
  
    function myLoop () {
       setTimeout(function () {
          banners[i].querySelector('iframe').setAttribute('src', banners[i].dataset.banner);
          banners[i+1].querySelector('iframe').setAttribute('src', banners[i+1].dataset.banner);
          banners[i+2].querySelector('iframe').setAttribute('src', banners[i+2].dataset.banner);
          i+=3;
          if (i < banners.length) {
             myLoop();
          }   
       }, 250)
    }
    
    myLoop();  
  }

  bannerWrapper.addEventListener('click', function(e) {
    var target = e.target;

    if(target.classList.contains('banner-refresh')) {
      var parent = target.parentNode;
      parent.querySelector('iframe').removeAttribute('src');
      parent.querySelector('iframe').setAttribute('src', parent.dataset.banner);
    }
  });

  window.init = loadBanners();
})())