// Déclaration des constantes liées aux ID
const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');

// Création d'un événement de function lié au click
  togglePassword.addEventListener('click', function (e) {
    // Déclaration de la constante Type qui par une ternère, conditionne le type de l'input
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    // Définition de l'attribut de l'input password
    password.setAttribute('type', type);
});

// Lors du click, la function jQuery se déclenche
$("#togglePassword").click(function() {
    // Cette function définiera un changement de classe entre eye et eye-slash
    $(this).toggleClass("fa-eye fa-eye-slash");
});