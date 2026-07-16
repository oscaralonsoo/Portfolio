(function () {
  var STORAGE_KEY = 'portfolio-theme';
  var root = document.documentElement;
  var toggleBtn = document.getElementById('themeToggle');

  function currentTheme() {
    return root.classList.contains('light-mode') ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) applyTheme(saved);
  } catch (e) {}

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });
  }
})();