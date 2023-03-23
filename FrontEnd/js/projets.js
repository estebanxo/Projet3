function affichages(tous) {
  let affichage = "<div>";
  for (let projet of tous) {
    affichage += `<figure>    <img src="${projet.imageUrl}" alt="${projet.title}"></img>   <figcaption> ${projet.title} </figcaption>    </figure>`;
  }
  affichage += "</div>";
  document.querySelector(".gallery").innerHTML = affichage;
}
function affichagesGalleriePhoto(tous) {
  let affichage = '<div id="imgWorks">';
  for (let projet of tous) {
    affichage += `<figure class="edition">    <img src="${projet.imageUrl}" alt="${projet.title}"></img>  <i class="fa-sharp fa-solid fa-arrows-up-down-left-right"></i>  <label for="${projet.id}"> <input type="checkbox" name="delete" id="${projet.id}" value=${projet.id}>   <span class="edit"><i class="fa-sharp fa-solid fa-trash-can"></i></span>   </label>  <figcaption> éditer </figcaption>    </figure>`;
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
  console.log(tous);
  const last = tous[tous.length-1];
  console.log(last.id);

  const objets = value.filter(obj => obj.categoryId == 1);
  console.log(objets);
  const appartements = value.filter(obj => obj.categoryId == 2);
  console.log(appartements);
  const hotelsRestaurants = value.filter(obj => obj.categoryId == 3);
  console.log(hotelsRestaurants);
  
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
  // Une erreur est survenue
});

// for (var i = 0; i < localStorage.length; i++) {
//   console.log(localStorage.getItem(localStorage.key(i)));
// }

console.log(localStorage.getItem('tokens'));
const token = JSON.parse(localStorage.getItem('tokens'));
console.log(token.token);

if (token) {
  document.querySelector('#in').style.display = "none";
  document.querySelector('#out').style.display = "inline";

  document.querySelector('#log').addEventListener("click", function(){
    localStorage.removeItem('tokens');
    location.reload();
  });

  document.querySelector("#publication").style.display = "flex";
  document.querySelector("header").style.margin = "40px auto 50px auto";
  document.querySelector(".filtres").style.display = "none";
  document.querySelector("#portfolio h2").style.margin = "2em 0";
  document.querySelector("#fig a").style.display = "block";
  document.querySelector(".containerModale a").style.display = "block";

  let modal = document.querySelector("#modal1");
  const focusableSelector = 'button, a';
  let focusable = [];
  let previouslyFocusedElement = null;

  document.querySelector(".modalLink").addEventListener("click", function() {
    focusable = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus');
    modal.style.display = null;
    focusable[0].focus();
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    document.querySelector("#jsModalClose").addEventListener("click", closeModal);
    document.querySelector(".jsModalStop").addEventListener("click", stopPropagation);
  })

  const closeModal = function (e) {
    e.preventDefault();
    if (modal.style.display = "none") return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
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
  const focusInModal = function (e) {
    e.preventDefault();
    let index = focusable.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true) {
      index--;
    }else {
      index++;
    }
    if (index >= focusable.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusable.length -1;
    }
    focusable[index].focus();
  }

  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key ==="Esc") {
      closeModal(e);
    }
    else if (e.key === 'Tab' && modal !== null) {
      focusInModal(e);
    }
  })

  fetch("http://localhost:5678/api/works")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    const tous = value.filter(obj => obj.categoryId > 0);
    console.log(tous);
    document.querySelector(".modalLink").addEventListener("click", affichagesGalleriePhoto(tous));
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  
  document.querySelector(".supprimer").addEventListener("click", function () {

    let valueToDelete = document.querySelectorAll("input[name='delete']");

    let deletion = () => {
      let id = document.querySelector("input[name='delete']:checked").value;
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        body: null,
        headers: {
          "Content-type": "application/json; charsert=UTF-8",
        },
      })
      .then((reponse) => reponse.json())

      .then((json) => alert("Gallerie supprimé"))

      .catch(function(err) {
        // Une erreur est survenue
      });
    }

    valueToDelete.forEach(valueToDelete => {
      valueToDelete.addEventListener("checked", deletion);
    })
  })

  document.querySelector(".buttonPhoto").addEventListener("click", function() {
    document.querySelector("#jsModalReturn").style.display = "var(--fa-display,inline-block)";
    document.querySelector("#titleModal").style.display = "none";
    document.querySelector("#titleModal2").style.display = "block";
    document.querySelector("#galeriePhoto div").style.display = "none";
    document.querySelector(".buttonPhoto").style.display = "none";
    document.querySelector(".valider").style.display = "inline-block";
    document.querySelector(".supprimer").style.display = "none";
    document.querySelector("#formAjoutPhoto").style.display = "flex";
    let affichage = "<div>";

    affichage += '<label class="containerPhoto" for="photo">';
    affichage += '<span id="img"> <i class="fa-regular fa-image"></i> </span>';
    affichage += '<span class="buttonAjoutPhoto"> + Ajouter photo </span>';
    affichage += '<input type="file" id="photo" name="photo" accept="image/*" onchange="afficheImage();">'
    affichage += '<span id="imgNotification">jpg, png : 4mo max</span>';
    affichage += '</label>';

    affichage += '<label class="weight" for="title">Titre</label>';
    affichage += '<input type="text" name="title" id="title">';

    affichage += '<label class="weight" for="categorie">Catégorie</label>';
    affichage += '<select name="categorie" id="categorie">';
    affichage += '<option name="option" value="1">Objets</option>';
    affichage += '<option name="option" value="2">Appartements</option>';
    affichage += '<option name="option" value="3" selected>Hotels & Restaurants</option>';
    affichage += '</select>';

    affichage += "</div>";
    document.querySelector("#galeriePhoto").innerHTML = affichage;

  })

  function afficheImage() {
    let file = document.querySelector('input[type="file"]').files;
    console.log(file);
    if(file.length = 1) {
      document.querySelector("#img").style.display = "none";
      document.querySelector(".buttonAjoutPhoto").style.display = "none";
      document.querySelector("#photo").style.display = "none";
      document.querySelector("#imgNotification").style.display = "none";
      document.querySelector(".containerPhoto").style.padding = "0";
      let newAffichage = '<img id="resultat">';
      document.querySelector(".containerPhoto").innerHTML = newAffichage;

      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document
          .getElementById("resultat")
          .setAttribute('src', event.target.result);
      }
      fileReader.readAsDataURL(file[0]);
    }
  }

  fetch("http://localhost:5678/api/categories")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {

    const objets = value.filter(obj => obj.id == 1);
    console.log(objets);

    const appartements = value.filter(obj => obj.id == 2);
    console.log(appartements);

    const hotelsRestaurants = value.filter(obj => obj.id == 3);
    console.log(hotelsRestaurants);

    let findSelectElts = () => {
      let selectedOption = document.querySelector("option[name='option']:selected").value;
      if (selectedOption == 1) {
        return objets;
      }
      else if (selectedOption == 2) {
        return appartements;
      }
      else if (selectedOption == 3) {
        return hotelsRestaurants;
      }
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  document.querySelector(".valider").addEventListener("submit", function(e) {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let photo = document.querySelector("#photo").value;
    console.log(photo);
    let selectedOption = document.querySelector("option[name='option']:selected").value;
    if(photo === "") {
      alert("Erreur: image Obligatoire");
      return; 
    }
    if(title.trim() === "") {
      alert("Erreur: Titre Obligatoire");
      return;
    }
    else {
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: JSON.stringify({
          id: last.id,
          title: title,
          imageUrl: photo,
          categoryId: selectedOption,
          userId: token[10],
        }),
        headers: {
          "Content-type": "application/json; charsert=UTF-8",
        },
      })
      .then((res) => res.json()) 
      .then((json) => console.log(json));
    }
  })
}

