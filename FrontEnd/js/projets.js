function affichages(tous) {
  let affichage = "<div>";
  for (let projet of tous) {
    affichage += `<figure id="${projet.id}2">    <img src="${projet.imageUrl}" alt="${projet.title}"></img>   <figcaption> ${projet.title} </figcaption>    </figure>`;
  }
  affichage += "</div>";
  document.querySelector(".gallery").innerHTML = affichage;
}
function affichagesGalleriePhoto(tous) {
  let affichage = '<div id="imgWorks">';
  for (let projet of tous) {
    affichage += `<figure class="edition" id="${projet.id}">    <img src="${projet.imageUrl}" alt="${projet.title}"></img>  <i class="fa-sharp fa-solid fa-arrows-up-down-left-right"></i>  <label> <input class="edit" type="checkbox" value="${projet.id}"> <span class="poubelle"> <i class="fa-sharp fa-solid fa-trash-can"></i> </span> </label>     <figcaption> éditer </figcaption>    </figure>`;
  }
  affichage += "</div>";
  document.querySelector("#galeriePhoto").innerHTML = affichage;
}



fetch("http://localhost:5678/api/works")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function (value) {
  const tous = value.filter(obj => obj.categoryId > 0);

  const objets = value.filter(obj => obj.categoryId == 1);

  const appartements = value.filter(obj => obj.categoryId == 2);

  const hotelsRestaurants = value.filter(obj => obj.categoryId == 3);

  
  let elts = document.querySelectorAll("input[name='filtre']");
  
  let findSelected = () => {
    let selected = document.querySelector("input[name='filtre']:checked").value;
    if (selected == 0) {
      affichages(tous);
    }
    else if (selected == 1) {
      affichages(objets);
    }
    else if (selected == 2) {
      affichages(appartements);
    }
    else if (selected == 3) {
      affichages(hotelsRestaurants);
    }
  }

  findSelected();

  elts.forEach(elts => {
    elts.addEventListener("change", findSelected);
  })
})
.catch(function(err) {
  if (err.status > 500) {
    alert("Une erreur serveur c'est produite !")
  }
});




const token = JSON.parse(localStorage.getItem('tokens'));
const tokens = token.token;


//                        Une fois connecté
if (token) {
  document.querySelector('#in').style.display = "none";
  document.querySelector('#out').style.display = "inline";

  document.querySelector('#log').addEventListener("click", function(){
    localStorage.removeItem('tokens');
    location.reload();
  });

                  // les changement css une fois connecté
  document.querySelector("#publication").style.display = "flex";
  document.querySelector("header").style.margin = "40px auto 50px auto";
  document.querySelector(".filtres").style.display = "none";
  document.querySelector("#portfolio h2").style.margin = "2em 0";
  document.querySelector("#fig a").style.display = "block";
  document.querySelector(".containerModale a").style.display = "block";


  let modal = document.querySelector("#modal1");

  document.querySelector(".modalLink").addEventListener("click", function() {
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    document.querySelector("#jsModalClose").addEventListener("click", closeModal);
    document.querySelector(".jsModalStop").addEventListener("click", stopPropagation);

    fetch("http://localhost:5678/api/works")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      const tous = value.filter(obj => obj.categoryId > 0);
      affichagesGalleriePhoto(tous);
      suppressionPhoto();
    })
    .catch(function(err) {
      if (err.status > 500) {
        alert("Une erreur serveur c'est produite !");
      }
    });
  })


  const closeModal = function (e) {
    e.preventDefault();
    if (modal.style.display = "none") return
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    document.querySelector("#jsModalClose").removeEventListener("click", closeModal);
    document.querySelector(".jsModalStop").removeEventListener("click", stopPropagation);
  }
  
  const stopPropagation = function(e) {
    e.stopPropagation();
  }




  function suppressionPhoto() {
    
    document.querySelectorAll(".edit").forEach(element => {
      
      element.addEventListener('click', function () {
        let valueToDelete = this.value;

        let modale = document.getElementById('modalSupr');
        modale.style.display = null;
        modale.removeAttribute('aria-hidden');
        modale.setAttribute('aria-modal', 'true');

        document.getElementById('non').addEventListener('click', function () {
          modale.style.display = "none";
        })
        document.getElementById('oui').addEventListener('click', function () {

          document.getElementById(valueToDelete).remove();
          document.getElementById(valueToDelete + "2").remove();


          fetch(`http://localhost:5678/api/works/${valueToDelete}`, {
            method: "DELETE",
            body: null,
            headers: {
              Authorization: `Bearer ${tokens}`,
            }
          })
          .then((reponse) => reponse.json())
          .catch(function(err) {
            if (err.status > 400) {
              alert("Vous n'êtes pas autorisé à suprimer ce contenus veuillez vous connecter !");
            }
            if (err.status > 500) {
              alert("Une erreur serveur c'est produite !");
            }
          });

          modale.style.display = "none";
        })
      })
    });
  }


  let file = "";
  let valider = document.querySelector('.valider');

  document.querySelector(".buttonPhoto").addEventListener("click", function() {
    document.querySelector("#jsModalReturn").style.display = "var(--fa-display,inline-block)";
    document.querySelector("#titleModal").style.display = "none";
    document.querySelector("#titleModal2").style.display = "block";
    document.querySelector("#galeriePhoto div").style.display = "none";
    document.querySelector(".buttonPhoto").style.display = "none";
    document.querySelector(".valider").style.display = "inline-block";
    document.querySelector(".supprimer").style.display = "none";
    
    let affichage = "<div>";

    affichage += '<label class="containerPhoto" for="photo">';
    affichage += '<span id="img"> <i class="fa-regular fa-image"></i> </span>';
    affichage += '<span class="buttonAjoutPhoto"> + Ajouter photo <strong id="errNotification1">*</strong></span>';
    affichage += '<input type="file" id="photo" name="photo" accept=".jpg, .jpeg, .png" onchange="afficheImage(this);">';
    affichage += '<span id="imgNotification">jpg, png : 4mo max</span>';
    affichage += '</label>';

    affichage += '<label class="weight" for="title">Titre <strong id="errNotification3">*</strong></label>';
    affichage += '<input type="text" name="title" id="title">';

    affichage += '<label class="weight" for="categorie">Catégorie <strong id="errNotification4">*</strong></label>';
    affichage += '<select name="categorie" id="categorie">';
    affichage += '<option value="0" selected></option>';
    affichage += '<option value="1">Objets</option>';
    affichage += '<option value="2">Appartements</option>';
    affichage += '<option value="3">Hotels & Restaurants</option>';
    affichage += '</select>';

    affichage += "</div>";
    document.querySelector("#galeriePhoto").innerHTML = affichage;
                          //  Notifications d'erreur pour l'ajout de photos
    document.getElementById('formAjoutPhoto').addEventListener('change', errNotif);
    document.getElementById('formAjoutPhoto').addEventListener('change', controleAjoutPhoto);

                            //  Si je clique sur la flèche de retour en arrière
    document.querySelector("#jsModalReturn").addEventListener("click", RetourEnArriere);
  })

  function errNotif() {
    let titre = document.querySelector("#title").value;
    let categorie = document.getElementById('categorie').value;

    if (titre == "") {
      console.log("rien ne ce passe(titre)");
    }else{
      document.getElementById("errNotification3").style.display = "none";
    }
    if (categorie === "0") {
      console.log("rien ne ce passe(catégorie)");
    }else{
      document.getElementById("errNotification4").style.display = "none";
    }
  }


  function controleAjoutPhoto() {
    let titre = document.querySelector("#title").value;
    let categorie = document.getElementById('categorie').value;

    if (titre == "" || categorie == "0" || file == "") {
      console.log("Rien ne change");
    } else {
      console.log("yo");
      valider.removeAttribute('disabled');
      valider.style.background = "var(--vert)";
      valider.addEventListener('mouseover', () => {
        valider.style.color = "var(--vert)";
        valider.style.background = "var(--white)";
        valider.style.transition = "0.3s";
      })
      valider.addEventListener('mouseout', () => {
        valider.style.color = "var(--white)";
        valider.style.background = "var(--vert)";
        valider.style.transition = "0.3s";
      })
    }
  }


  function RetourEnArriere() {
    // ***                             controle de l'ajout de photo(remove)                 ***
    document.getElementById('formAjoutPhoto').removeEventListener('change', errNotif);
    document.getElementById('formAjoutPhoto').removeEventListener('change', controleAjoutPhoto);
    valider.setAttribute('disabled','disabled');
    valider.style.background = "#A7A7A7";
    valider.removeEventListener('mouseover', () => {
      valider.style.color = "var(--vert)";
      valider.style.background = "var(--white)";
      valider.style.transition = "0.3s";
    })
    valider.removeEventListener('mouseout', () => {
      valider.style.color = "var(--white)";
      valider.style.background = "var(--vert)";
      valider.style.transition = "0.3s";
    })
    // ***                                                                                  ***
      
    document.querySelector("#jsModalReturn").style.display = "none";
    document.querySelector("#titleModal").style.display = "block";
    document.querySelector("#titleModal2").style.display = "none";
    document.querySelector("#galeriePhoto div").style.display = "grid";
    document.querySelector(".buttonPhoto").style.display = "block";
    document.querySelector(".valider").style.display = "none";
    document.querySelector(".supprimer").style.display = "block";
      
      
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      const tou = value.filter(obj => obj.categoryId > 0);
      affichagesGalleriePhoto(tou);
      suppressionPhoto();
    })
    .catch((res) => {
      console.log("une erreur est survenue !");
      if (res.status > 500) {
        alert("Une erreur serveur c'est produite !");
      }
    });
            
      
    document.querySelector(".containerPhoto").style.display = "none";
    document.querySelector(".weight").style.display = "none";
    document.querySelector("label[for='categorie']").style.display = "none";
    document.querySelector("#categorie").style.display = "none";
    document.querySelector("#title").style.display = "none";
  }



  function afficheImage(input) {
    file = document.querySelector('input[type="file"]').files;
    file = file[0];


    document.querySelector("#img").style.display = "none";
    document.querySelector(".buttonAjoutPhoto").style.display = "none";
    document.querySelector("#imgNotification").style.display = "none";
    document.querySelector(".containerPhoto").style.padding = "0";
    let newAffichage = '<img id="resultat">';
    document.querySelector(".containerPhoto").innerHTML = newAffichage;


    if (input.files && input.files[0]) {
      let reader = new FileReader();
  
      reader.onload = function (e) {
          document.getElementById('resultat').src =  e.target.result;
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }


  valider.addEventListener("click", function(e) {
    e.preventDefault();

    let title = document.getElementById("title").value;

    let categorie = document.getElementById('categorie').value;

    let formData = new FormData();
  
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", categorie);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
      body: formData,
    })
    .then((res) => res.json())
    .catch((err) => {
      if (err > 400) {
        alert("Oups! Vous ne pouvez pas poster une nouvelle photo, Veuillez vous connecter !");
      }
      if (err > 500) {
        alert("Oups! Une erreur serveur c'est produite !");
      }
    });

    RetourEnArriere();
    
    // Fermeture de la modale
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    document.querySelector("#jsModalClose").removeEventListener("click", closeModal);
    document.querySelector(".jsModalStop").removeEventListener("click", stopPropagation);



    fetch("http://localhost:5678/api/works")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      const tous = value.filter(obj => obj.categoryId > 0);
      affichages(tous);
    })
    .catch(function(err) {
      if (err.status > 500) {
        alert("Une erreur serveur c'est produite !")
      }
    });
  });
}