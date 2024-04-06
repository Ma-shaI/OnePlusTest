fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1')
  .then(response => response.json())
  .then(data => {
    const table = document.createElement('table');
    data.forEach((coin, index) => {
      const row = table.insertRow();
      const idCell = row.insertCell(0);
      const symbolCell = row.insertCell(1);
      const nameCell = row.insertCell(2);

      idCell.textContent = coin.id;
      symbolCell.textContent = coin.symbol;
      nameCell.textContent = coin.name;
      
      if (index < 5) {
        row.style.backgroundColor = 'blue';
      }

    
      if (coin.symbol === 'usdt') {
        row.style.backgroundColor = 'green';
      }
    });

    document.body.appendChild(table);
  })
  .catch(error => console.error('Ошибка:', error));