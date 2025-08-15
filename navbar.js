// navbar.js
// Dynamically loads navbar.html into the #navbar div
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
  });
