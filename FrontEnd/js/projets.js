function affichages(tous) {
  let affichage = "<div>";
  for (let projet of tous) {
    affichage += `<figure>    <img src="${projet.imageUrl}" alt="${projet.title}"></img>   <figcaption> ${projet.title} </figcaption>    </figure>`;
  }
  affichage += "</div>";
  document.querySelector(".gallery").innerHTML = affichage;
}

fetch("http://localhost:5678/api/works")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function (value) {
  const Tous1 = value.filter(obj => obj.categoryId > 0);
  console.log(Tous1);
  const Objets1 = value.filter(obj => obj.categoryId == 1);
  console.log(Objets1);
  const appartements1 = value.filter(obj => obj.categoryId == 2);
  console.log(appartements1);
  const hotelsRestaurants1 = value.filter(obj => obj.categoryId == 3);
  console.log(hotelsRestaurants1);
  
  let elts = document.querySelectorAll("input[name='filtre']");
  
  let findSelected = () => {
    let selected = document.querySelector("input[name='filtre']:checked").value;
    if (selected == 0) {
      affichages(Tous1);
    }
    else if (selected == 1) {
      affichages(Objets1);
    }
    else if (selected == 2) {
      affichages(appartements1);
    }
    else if (selected == 3) {
      affichages(hotelsRestaurants1);
    }
  }

  findSelected();

  elts.forEach(elts => {
    elts.addEventListener("change", findSelected);
  })
})
.catch(function(err) {
  // Une erreur est survenue
});

const token = localStorage.getItem('tokens');
console.log(token);

if (token) {
  document.querySelector('#in').style.display = "none";
  document.querySelector('#out').style.display = "inline";

  document.querySelector('#log').addEventListener("click", function(){
    localStorage.removeItem('tokens');
    location.reload();
  });

  document.querySelector(".filtres").style.display = "none";
  document.querySelector("#portfolio h2").style.margin = "2em 0";
  document.querySelector("#fig a").style.display = "block";
  document.querySelector(".containerModale a").style.display = "block";
}

// let button = form.submit.addEventListener("click", (e)=> {
//   e.preventDefault();
//   const login = 'http://localhost:5678/api/users/login';

//   fetch(login, {
//     method: "POST",
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: form.email.value,
//       password: form.password.value,
//     }),
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//     localStorage.setItem('tokens', JSON.stringify(data));
//     if (data.error) {
//       alert("!! ERROR !! 'Email' or 'Password' --- incorrect ---");
//     }else {
//       window.location.assign("../index.html");
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });