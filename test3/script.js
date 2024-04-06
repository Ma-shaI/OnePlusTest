document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('registrationForm');
    let submitButton = document.getElementById('submitButton');
  
    // Функции валидации
    function validateName(name) {
      return /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/.test(name);
    }
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validatePassword(password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
    }
  
    function validateAge(dateOfBirth) {
        let today = new Date();
        let birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }
  
    // Проверка валидности всех полей
    form.addEventListener('input', function () {
      let isValid = form.checkValidity() && 
                    validateName(form['firstName'].value) &&
                    validateName(form['lastName'].value) &&
                    validateEmail(form['email'].value) &&
                    validatePassword(form['password'].value) &&
                    form['password'].value === form['confirmPassword'].value &&
                    validateAge(form['birthDate'].value);
      submitButton.disabled = !isValid;
    });
  
    // Вывод сообщений об ошибках
    form.addEventListener('focusout', function (event) {
      let name = event.target.name;
      let value = event.target.value;
      let error = '';
  
      switch (name) {
        case 'firstName':
        case 'lastName':
          if (!validateName(value)) {
            error = 'Имя и фамилия должны содержать только буквы и быть длиной от 2 до 30 символов.';
          }
          break;
        case 'email':
          if (!validateEmail(value)) {
            error = 'Введите корректный email-адрес.';
          }
          break;
        case 'password':
          if (!validatePassword(value)) {
            error = 'Пароль должен быть не менее 8 символов и содержать цифры, заглавные и строчные буквы, а также символы.';
          }
          break;
        case 'confirmPassword':
          if (value !== form['password'].value) {
            error = 'Пароли не совпадают.';
          }
          break;
        case 'birthDate':
          if (!validateAge(value)) {
            error = 'Вам должно быть не менее 18 лет.';
          }
          break;
      }
  
      event.target.setCustomValidity(error);
      event.target.reportValidity();
    });
  });
  