chrome.storage.local.get('siteTimes', (data) => {
  const ul = document.getElementById('list');
  const sites = data.siteTimes || {};
  for (let site in sites) {
    const li = document.createElement('li');
    li.textContent = `${site}: ${(sites[site]/1000/60).toFixed(2)} min`;
    ul.appendChild(li);
  }
});
