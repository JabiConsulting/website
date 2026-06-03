/* ==========================================================================
   Jabi Consulting — shared site header injector.
   Include on every page (except admin) with:
     <link rel="stylesheet" href="/assets/site-header.css" />
     <div id="jc-header"></div>
     <script src="/assets/site-header.js" defer></script>
   Uses root-absolute paths so one component works at the site root and in
   sub-directories (e.g. /insights/<article>.html).
   ========================================================================== */
(function () {
  // On the homepage, use in-page anchors for smooth scroll; elsewhere link back.
  var path = location.pathname.replace(/\/+$/, '/');
  var onHome = path === '/' || /\/index\.html$/.test(path);
  var home = onHome ? '' : '/index.html';

  var LI_BADGE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.34a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zm11.34 10H15.67v-4.22c0-1-.02-2.3-1.4-2.3s-1.62 1.1-1.62 2.23v4.29h-2.67V9.67h2.56v1.18h.04a2.8 2.8 0 012.53-1.39c2.71 0 3.21 1.78 3.21 4.1v4.88z"/></svg>';

  // Tagline: one <span> per letter so flex space-between fills the logo width,
  // with a wider gap between the two words.
  function letters(word) {
    return word.split('').map(function (c) { return '<span>' + c + '</span>'; }).join('');
  }
  var tag = letters('MENA') + '<i class="jc-sp"></i>' + letters('ADVISORY');

  var html =
    '<header class="jc-nav">' +
      '<div class="jc-nav-inner">' +
        '<a href="/" class="jc-brand" aria-label="Jabi Consulting — MENA Advisory">' +
          '<img class="jc-logo" src="/assets/logo-color.svg?v=3" alt="Jabi Consulting" />' +
          '<span class="jc-tag" aria-hidden="true">' + tag + '</span>' +
        '</a>' +
        '<nav class="jc-links">' +
          '<a href="' + home + '#capabilities">What We Do</a>' +
          '<a href="' + home + '#team">Team</a>' +
          '<a href="' + home + '#regions">Where We Work</a>' +
          '<a href="/insights.html">Insights</a>' +
          '<a href="' + home + '#why">Why Us</a>' +
          '<span class="jc-cluster">' +
            '<a href="https://www.linkedin.com/company/jabcionsulting" target="_blank" rel="noopener" aria-label="Jabi Consulting on LinkedIn" title="Jabi Consulting on LinkedIn" class="jc-avatar jc-avatar--jabi">' +
              '<img src="/assets/team/jabi-avatar.png" alt="Jabi Consulting" />' +
              '<span class="jc-badge jc-badge--left" aria-hidden="true">' + LI_BADGE + '</span>' +
            '</a>' +
            '<a href="https://www.linkedin.com/in/hishamjabi" target="_blank" rel="noopener" aria-label="Hisham Jabi on LinkedIn" title="Hisham Jabi on LinkedIn" class="jc-avatar">' +
              '<img src="/assets/team/hisham-jabi.webp" alt="Hisham Jabi" />' +
              '<span class="jc-badge" aria-hidden="true">' + LI_BADGE + '</span>' +
            '</a>' +
            '<a href="' + home + '#contact" class="jc-cta">Get In Touch →</a>' +
          '</span>' +
        '</nav>' +
        '<button class="jc-toggle" aria-label="Menu" aria-expanded="false">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  function mount() {
    var slot = document.getElementById('jc-header');
    if (slot) { slot.outerHTML = html; }
    else { document.body.insertAdjacentHTML('afterbegin', html); }

    var toggle = document.querySelector('.jc-toggle');
    var links = document.querySelector('.jc-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('jc-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
