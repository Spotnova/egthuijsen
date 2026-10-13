// Aanleverlijst: onthoudt welke vakjes zijn aangevinkt, alleen op dit apparaat.
(function () {
  var KEY = 'egthuijsen-aanleverlijst';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function (box) {
    if (saved[box.id]) box.checked = true;
    box.addEventListener('change', function () {
      saved[box.id] = box.checked;
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
    });
  });
})();
