/* Scotland Votes 2026 — Policy table filter */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    var policyRows = document.querySelectorAll('.policy-table tbody tr');

    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.dataset.filter;

        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Show/hide rows
        policyRows.forEach(function (row) {
          if (filter === 'all') {
            row.style.display = '';
          } else {
            var area = row.dataset.area || '';
            row.style.display = (area === filter) ? '' : 'none';
          }
        });
      });
    });
  });
}());
