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
    console.log(appartements[0]);

    const hotelsRestaurants = value.filter(obj => obj.id == 3);
    console.log(hotelsRestaurants[0]);

    let findSelectElts = () => {
      let select = document.getElementById("categorie");
      let choice = select.selectedIndex;
      let selectedOption = select.options[choice].value;
      
      if (selectedOption == 1) {
        return objets[0].name;
      }
      else if (selectedOption == 2) {
        return appartements[0].name;      
      }
      else if (selectedOption == 3) {
        return hotelsRestaurants[0].name;     
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });




  document.querySelector(".valider").addEventListener("click", function(e) {
    e.preventDefault();

    let title = document.getElementById("title").value;

    console.log(title);
    let photo = localStorage.getItem('imgData');
    console.log(photo);

    
    
    console.log(localStorage.getItem('lastId'));
    console.log(token.userId);

    if(photo === null) {
      alert("Erreur: image Obligatoire");
      return; 
    }
    if(title.trim() === "") {
      alert("Erreur: Titre Obligatoire");
      return;
    }
    else {
      console.log(tokens);
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: JSON.stringify({
          id: localStorage.getItem('lastId'),
          title: title,
          imageUrl: photo,
          categoryId: valeurCherchee,
          userId: token.userId
        }),
        headers: {
          "Content-type": "application/json; charsert=UTF-8",
          Authorization: `Bearer ${tokens}`
        },
      })
      .then((res) => res.json()) 
      .then((json) => console.log(json));
    }
  })










  function afficheImage(input) {
    let file = document.querySelector('input[type="file"]').files;
    file = file[0];
    console.log(file);
    

    let UrlPageCourante = window.location.href;
    let Url = new URL(UrlPageCourante);
    let protocol = Url.protocol;
    let host = Url.host;

    console.log(Url);
    console.log(protocol);
    console.log(host);

    const imgUrl = `${protocol}//localhost:5678/images/${file.name}`;
    localStorage.setItem('imgUrl', imgUrl);
    console.log(localStorage.getItem('imgUrl'));
 

    if(file.length = 1) {
      document.querySelector("#img").style.display = "none";
      document.querySelector(".buttonAjoutPhoto").style.display = "none";
      // document.querySelector("#photo").style.display = "none";
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




    const fileName = file.name;
    console.log(fileName);

    const fileType = file.type;
    console.log(fileType);

    let fil = `image=@${fileName};type=${fileType}`;
    console.log(fil);


    document.querySelector(".formAjoutPhoto").addEventListener("submit", function(e) {
      e.preventDefault();
  
      let title = document.getElementById("title").value;
      console.log(title);
  
      // let photo = localStorage.getItem('imgUrl');
      // console.log(photo);
      // const img = document.getElementById('resultat').src;
      // console.log(img);
      const img = file;
      console.log(img);
  
      let categorie = document.getElementById('categorie').value;
      console.log(categorie);
      
      if(!title || !categorie || !img) {
        console.error('Veuillez remplir tous les champs du formulaire');
        return;
      }
      // if(img === null) {
      //   alert("Erreur: image Obligatoire");
      //   return; 
      // }
      // if(title.trim() === "") {
      //   alert("Erreur: Titre Obligatoire");
      //   return;
      // }
      console.log(tokens);
  
      // let formData = new FormData();
  
      // formData.append("image", img);
      // formData.append("title", title);
      // formData.append("category", categorie);

      // const res = Object.fromEntries(formData);
      // const payload = JSON.stringify(res);
      // console.log(formData);
      // console.log(payload);
      // console.log(res[0]);
  
      // var request = new XMLHttpRequest();
      // request.open("POST", "http://localhost:5678/api/works");
      // request.setRequestHeader('Authorization', `Bearer ${tokens}`);
      // request.setRequestHeader('accept', "application/json");
      // request.setRequestHeader("Content-Type", "multipart/form-data");
      // request.send(formData);
    
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-type": "multipart/form-data",
          Authorization: 'Bearer' + tokens,
        },
      })
      .then((res) => res.json()) 
      .then((json) => console.log(json))
      .catch(error => console.error("Erreur lors de l'ajout du projet :", error));
    });
  }