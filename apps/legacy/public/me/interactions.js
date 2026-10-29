// Both viewports show the same original demonstration data, never employer data.
const chart = document.querySelector('[data-chart-scroll]');
const table = document.querySelector('[data-table-scroll]');

function synchronize(source, target) {
  if (target.scrollLeft !== source.scrollLeft) target.scrollLeft = source.scrollLeft;
}

chart.addEventListener('scroll', () => synchronize(chart, table), { passive: true });
table.addEventListener('scroll', () => synchronize(table, chart), { passive: true });

const menu = document.querySelector('.mobile-menu');
menu.addEventListener('click', event => {
  if (event.target.closest('a')) menu.open = false;
});
menu.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
