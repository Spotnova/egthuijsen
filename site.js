// Twee kleine dingen: het mobiele menu en het voor/na-schuifje.
// Zonder JavaScript staat het menu gewoon uitgeklapt en blijft het schuifje op de helft staan.
(function () {
  var button = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  if (button && nav) {
    var setOpen = function (open) {
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    button.addEventListener('click', function () {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        button.focus();
      }
    });
  }

  document.querySelectorAll('.ba').forEach(function (ba) {
    var range = ba.querySelector('.ba__range');
    if (!range) return;
    var update = function () { ba.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', update);
    update();
  });
})();
