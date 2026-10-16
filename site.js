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

  // Voorbeeld: zolang het Formspree-adres nog VERVANG_DIT is, niets versturen maar een melding tonen.
  document.querySelectorAll('form[action*="VERVANG_DIT"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (!note) {
        note = document.createElement('p');
        note.className = 'form-note';
        note.setAttribute('role', 'status');
        form.querySelector('.workorder__foot').appendChild(note);
      }
      note.textContent = 'Dit is een voorbeeld, dus het formulier verstuurt nog niets. Zodra de site live staat, komt je bericht hier gewoon binnen.';
    });
  });
})();
