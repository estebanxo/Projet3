const form = {
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  submit: document.querySelector("#submit")
};

let button = form.submit.addEventListener("click", (e)=> {
    e.preventDefault();
    const login = 'http://localhost:5678/api/users/login';
  
    fetch(login, {
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
      console.log(data)
      localStorage.setItem('tokens', JSON.stringify(data));
      if (data.error) {
        alert("!! ERROR !! 'Email' or 'Password' --- incorrect ---");
      }else {
        window.location.assign("../index.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  });