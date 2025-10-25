fetch('data.json')
  .then(response => response.json())
  .then(days => {
    const container = document.getElementById('calendar');
    days.forEach(d => {
      const div = document.createElement('div');
      div.className = 'day';
      div.textContent = d.day;
      div.addEventListener('click', () => alert(d.content));
      container.appendChild(div);
    });
  })
  .catch(err => {
    const container = document.getElementById('calendar');
    if (container) {
      container.textContent = 'Failed to load data.json. Please run a local server and open this page via http://localhost.';
    }
    console.error('Error loading data.json', err);
  });
