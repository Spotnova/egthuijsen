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

  // Contactformulier via Formspree. De bezoeker blijft op de site en ziet een eigen melding.
  // Zolang het adres nog VERVANG_DIT is (voorbeeld), wordt er niets verstuurd.
  // Zonder JavaScript verstuurt het formulier gewoon en toont Formspree zijn eigen bedankpagina.
  document.querySelectorAll('form[action*="formspree.io"]').forEach(function (form) {
    var foot = form.querySelector('.workorder__foot') || form;
    var button = form.querySelector('[type="submit"]');

    function show(text, kind) {
      var note = form.querySelector('.form-note');
      if (!note) {
        note = document.createElement('p');
        note.setAttribute('role', 'status');
        foot.appendChild(note);
      }
      note.className = 'form-note' + (kind ? ' form-note--' + kind : '');
      note.textContent = text;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.action.indexOf('VERVANG_DIT') !== -1) {
        show('Dit is een voorbeeld, dus het formulier verstuurt nog niets. Zodra de site live staat, komt je bericht hier gewoon binnen.');
        return;
      }
      button.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('status ' + res.status);
          form.reset();
          show('Bedankt! Je offerteaanvraag is binnen. We nemen zo snel mogelijk contact met je op.', 'ok');
        })
        .catch(function () {
          show('Versturen lukte niet. Bel of app ons even op 06 83 23 83 52.', 'error');
        })
        .then(function () { button.disabled = false; });
    });
  });
})();
