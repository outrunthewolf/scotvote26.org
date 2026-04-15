/* Scotland Votes 2026 — Filter, sticky bar, distinct colours toggle */
(function () {
  'use strict';

  /* --- Party colour palettes --------------------------------
   * original: sourced from _data/parties.yml at build time
   * distinct: high-contrast, accessible, maximally different
   *           from each other and from the originals
   * --------------------------------------------------------- */
  var palettes = {
    original: {
      snp:          { colour: '#FDD835', rgb: '253,216,53',  text: '#1a1a1a' },
      labour:       { colour: '#E4003B', rgb: '228,0,59',    text: '#ffffff' },
      conservative: { colour: '#0087DC', rgb: '0,135,220',   text: '#ffffff' },
      libdem:       { colour: '#FAA61A', rgb: '250,166,26',  text: '#1a1a1a' },
      greens:       { colour: '#00B140', rgb: '0,177,64',    text: '#ffffff' },
      reform:       { colour: '#12B6CF', rgb: '18,182,207',  text: '#ffffff' },
    },
    distinct: {
      snp:          { colour: '#FF00FF', rgb: '255,0,255',   text: '#1a1a1a' },  // neon magenta
      labour:       { colour: '#00FFFF', rgb: '0,255,255',   text: '#1a1a1a' },  // neon cyan
      conservative: { colour: '#FF6600', rgb: '255,102,0',   text: '#1a1a1a' },  // neon orange
      libdem:       { colour: '#39FF14', rgb: '57,255,20',   text: '#1a1a1a' },  // neon green
      greens:       { colour: '#FFE600', rgb: '255,230,0',   text: '#1a1a1a' },  // neon yellow
      reform:       { colour: '#CC00FF', rgb: '204,0,255',   text: '#ffffff' },  // neon violet
    }
  };

  /* --- Apply a palette to all party-coloured elements -------
   * Targets:
   *   [data-party] th  — column header cell tint (rgba)
   *   [data-party] td  — column body cell tint (rgba)
   *   .party-header-pill[data-party] — pill background
   *   .party-dot[data-party]         — dot in manifesto table
   *   sticky bar pills (cloned, so updated separately)
   * --------------------------------------------------------- */
  function applyPalette(palette) {
    Object.keys(palette).forEach(function (id) {
      var p = palette[id];

      // Column header tint (th)
      document.querySelectorAll('th[data-party="' + id + '"]').forEach(function (el) {
        el.style.backgroundColor = 'rgba(' + p.rgb + ', 0.15)';
      });

      // Column body tint (td)
      document.querySelectorAll('td[data-party="' + id + '"]').forEach(function (el) {
        el.style.backgroundColor = 'rgba(' + p.rgb + ', 0.06)';
      });

      // Party pills (header row + sticky bar)
      document.querySelectorAll('.party-header-pill[data-party="' + id + '"]').forEach(function (el) {
        el.style.backgroundColor = p.colour;
        el.style.color = p.text;
      });

      // Manifesto table dots
      document.querySelectorAll('.party-dot[data-party="' + id + '"]').forEach(function (el) {
        el.style.backgroundColor = p.colour;
      });

      // IFS card headers
      document.querySelectorAll('.ifs-card-header[data-party="' + id + '"]').forEach(function (el) {
        el.style.backgroundColor = p.colour;
        el.style.color = p.text;
      });
    });
  }

  /* --- Site header height ----------------------------------- */
  function updateHeaderHeight() {
    var header = document.querySelector('.site-header');
    if (header) {
      document.documentElement.style.setProperty(
        '--site-header-height',
        header.offsetHeight + 'px'
      );
    }
  }

  /* --- Party context sticky bar ----------------------------- */
  function setupPartyContextBar() {
    var table = document.querySelector('.policy-table');
    if (!table) return;

    var pills = Array.from(table.querySelectorAll('thead .party-header-pill'));
    if (!pills.length) return;

    var bar      = document.createElement('div');
    bar.className = 'party-sticky-bar';
    bar.setAttribute('aria-hidden', 'true');

    var inner    = document.createElement('div');
    inner.className = 'party-sticky-bar-inner';

    var lbl      = document.createElement('span');
    lbl.className = 'party-sticky-bar-label';
    lbl.textContent = 'Parties:';
    inner.appendChild(lbl);

    pills.forEach(function (pill) {
      inner.appendChild(pill.cloneNode(true));
    });

    bar.appendChild(inner);
    document.body.appendChild(bar);

    var thead   = table.querySelector('thead');
    var section = document.getElementById('policy-comparison');

    window.addEventListener('scroll', function () {
      var headerH       = document.querySelector('.site-header').offsetHeight;
      var theadBottom   = thead.getBoundingClientRect().bottom;
      var sectionBottom = (section || table).getBoundingClientRect().bottom;
      bar.classList.toggle('is-visible', theadBottom < headerH && sectionBottom > headerH + 60);
    }, { passive: true });

    return bar;
  }

  /* --- Distinct colours toggle ------------------------------ */
  function setupColourToggle(stickyBar) {
    var toggle = document.getElementById('distinct-colours-toggle');
    if (!toggle) return;

    toggle.addEventListener('change', function () {
      var palette = this.checked ? palettes.distinct : palettes.original;
      applyPalette(palette);

      // Rebuild sticky bar pills from the now-updated header pills
      if (stickyBar) {
        var table = document.querySelector('.policy-table');
        var freshPills = Array.from(table.querySelectorAll('thead .party-header-pill'));
        var inner = stickyBar.querySelector('.party-sticky-bar-inner');
        // Remove old clones (everything after the label)
        while (inner.children.length > 1) {
          inner.removeChild(inner.lastChild);
        }
        freshPills.forEach(function (pill) {
          inner.appendChild(pill.cloneNode(true));
        });
      }
    });
  }

  /* --- Policy table filter ---------------------------------- */
  function setupFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    var policyRows = document.querySelectorAll('.policy-table tbody tr');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.dataset.filter;
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        policyRows.forEach(function (row) {
          row.style.display = (filter === 'all' || row.dataset.area === filter) ? '' : 'none';
        });
      });
    });
  }

  /* --- Init ------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    var stickyBar = setupPartyContextBar();
    setupColourToggle(stickyBar);
    setupFilter();
  });

}());
