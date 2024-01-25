document.addEventListener("DOMContentLoaded", function() {
    // Dossier contenant les photos
    const dossierPhotos = "./static/images";
  
    // Récupérer l'élément du corps du document
    const body = document.body;
  
    // Générer la galerie HTML
    const galerieHTML = document.createElement("div");

    galerieHTML.className = "galerie";
  
    // Charger la liste des fichiers depuis le dossier
    fetch(`${dossierPhotos}/`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
  
        // Trier les fichiers dans le dossier par ordre alphabétique
        const fichiersPhotos = Array.from(doc.querySelectorAll("a"))
          .map(a => a.getAttribute("href"))
          .filter(href => !href.startsWith("."))
          .sort();
  
        // Parcourir chaque fichier et ajouter à la galerie HTML
        fichiersPhotos.forEach(fichierPhoto => {
          const [index, dimensionWithExtension] = fichierPhoto.split("_");

          // Vérifier si dimensionWithExtension est défini et n'est pas 'undefined'
          if (dimensionWithExtension && dimensionWithExtension !== 'undefined') {
            const dimension = dimensionWithExtension.replace(/\.[^/.]+$/, ""); // Retirer l'extension
            const imgElement = `<img class='image' src='${fichierPhoto}' alt='Tableau ${index}'>`;
            const divElement = `<div class='image-container'><h2>${dimension}</h2>${imgElement}</div>`;
            galerieHTML.innerHTML += divElement;
          }
        });
  
        // Ajouter la galerie au corps du document
        body.appendChild(galerieHTML);
      })
      .catch(error => console.error("Erreur lors de la récupération des fichiers :", error));
});
