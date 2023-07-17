const form = {
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  submit: document.querySelector("#submit")
};

let button = form.submit.addEventListener("click", (e)=> {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  if (email == "" || password == "") {
    document.getElementById('logVide').style.display = "block";
    let vide = document.getElementsByClassName('vide'); 
    vide[0].style.display = "inline-block";
    vide[1].style.display = "inline-block";
  }else {
    document.getElementById('logVide').style.display = "none";
    let vide = document.getElementsByClassName('vide'); 
    vide[0].style.display = "none";
    vide[1].style.display = "none";

    fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
      let userId = data.userId;

      if (userId == 1) {
        localStorage.setItem('tokens', JSON.stringify(data));
        window.location.assign("../index.html");
      }else {
        document.getElementById('logErreur').style.display = "block";
      }
    })
    .catch((err) => {
      if (err.status > 500) {
        alert("Une erreur serveur c'est produite !");
      }
    });
  }
});
  