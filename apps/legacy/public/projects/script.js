(function () {
  var gallery = document.querySelector('.motion-studies');
  var studies = Array.prototype.slice.call(gallery.querySelectorAll('.motion-study'));

  function loadStudy(study) {
    study.querySelector('iframe').setAttribute('src', study.dataset.study);
  }

  // Preserve staggered loading rather than starting 27 animations at once.
  function loadBatch(start) {
    setTimeout(function () {
      studies.slice(start, start + 3).forEach(loadStudy);
      if (start + 3 < studies.length) loadBatch(start + 3);
    }, 250);
  }

  gallery.addEventListener('click', function (event) {
    if (event.target.classList.contains('study-replay')) {
      loadStudy(event.target.parentNode);
    }
  });

  loadBatch(0);
})();
