function performSearch() {
    var query = document.getElementById('search-input').value;
    
    window.location.href = '/search-results.html?q=' + encodeURIComponent(query);
  }