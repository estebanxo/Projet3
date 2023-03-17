function affichages(tous) {
  let affichage = "<div>";
  for (let projet of tous) {
    affichage += `<figure>    <img src="${projet.imageUrl}" alt="${projet.title}"></img>   <figcaption> ${projet.title} </figcaption>    </figure>`;
  }
  affichage += "</div>";
  document.querySelector(".gallery").innerHTML = affichage;
}
function affichagesGalleriePhoto(tous) {
  let affichage = "<div>";
  for (let projet of tous) {
    affichage += `<figure class="edition">    <img src="${projet.imageUrl}" alt="${projet.title}"></img>  <i class="fa-sharp fa-solid fa-arrows-up-down-left-right"></i>  <label for="${projet.id}"> <input type="checkbox" name="delete" id="${projet.id}">   <span class="edit"><i class="fa-sharp fa-solid fa-trash-can"></i></span>   </label>  <figcaption> éditer </figcaption>    </figure>`;
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

const token = localStorage.getItem('tokens');
console.log(token);

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
    document.querySelector(".jsModalClose").addEventListener("click", closeModal);
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
    document.querySelector(".jsModalClose").removeEventListener("click", closeModal);
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
  
}