document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      //const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      
      if ( password === '1234') 
      {
        // Redirect to the chat app if the login is successful
        window.location.href = 'index.html';
      } else {
        alert('Invalid username or password. Please try again.');
      }
    });
  });
  