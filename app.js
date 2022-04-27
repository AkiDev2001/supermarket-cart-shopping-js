var addItemButtons = document.getElementsByClassName("ajouter");
// var sommeI = 0;
var listprix = [];
var once = true;

var printPDF = function () {
  var originalThead = document.getElementsByTagName("th");
  var printedTable = document.createElement("table");
  var printedThead = document.createElement("thead");
  var printedTbody = document.createElement("tbody");

  for (var i = 0; i < originalThead.length; i++) {
    var printedTheadTh = document.createElement("th");
    var originalTh = originalThead[i].innerHTML;
    var textOriginalTh = document.createTextNode(originalTh);
    printedTheadTh.appendChild(textOriginalTh);
    printedThead.appendChild(printedTheadTh);
  }

  printedTable.appendChild(printedThead);

  var originalTbody = document.getElementById("objet").childNodes;
  for (var i = 0; i < originalTbody.length; i++) {
    var tdObject = originalTbody[i].firstChild.innerHTML;
    var tdPrix = originalTbody[i].childNodes[1].innerHTML;
    var tdQte = originalTbody[i].getElementsByClassName("quantite")[0].value;

    var textTdObject = document.createTextNode(tdObject);
    var textTdPrix = document.createTextNode(tdPrix + " DH");
    var textTdQte = document.createTextNode(tdQte);

    var newTdObject = document.createElement("td");
    var newTdPrix = document.createElement("td");
    var newTdQte = document.createElement("td");
    newTdObject.appendChild(textTdObject);
    newTdPrix.appendChild(textTdPrix);
    newTdQte.appendChild(textTdQte);

    var newTr = document.createElement("tr");
    newTr.appendChild(newTdObject);
    newTr.appendChild(newTdPrix);
    newTr.appendChild(newTdQte);

    printedTbody.appendChild(newTr);
  }

  printedTable.appendChild(printedTbody);

  var total = document.getElementById("prixtopay").innerHTML;
  const time = new Date();
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const hour =
    "[" +
    time.getUTCHours() +
    ":" +
    time.getUTCMinutes() +
    ":" +
    time.getUTCSeconds() +
    "]";
  const fulldate = day + "/" + month + "/" + year + " " + hour;

  var style = "<style>";
  style += "body { font-family: Helvetica; }";
  style +=
    "table { display: block; color: #2d2d2d; background-color: #ffffff; margin: 20px; padding: 10px; font-weight: bolder; font-size: 18px; }";
  style += "table tbody tr td { width: 400px;}";
  style +=
    "td { padding: 6px 0; border: 2px; text-align: center; font-style: italic; color: #444040}";
  style += "</style>";
  var win = window.open("", "", "height=700,width=700");
  win.document.write("<html><head>");
  win.document.write("<title>LISTE PANIER</title>");
  win.document.write(style);
  win.document.write("</head>");
  win.document.write("<body>");
  win.document.write("<center>");
  win.document.write(printedTable.outerHTML);
  win.document.write("</center>");
  win.document.write("<center>");
  win.document.write("<b> PRIX TOTAL : &nbsp;&nbsp;&nbsp;&nbsp; <b>");
  win.document.write(
    "<b>" + total + " DH <b><br><br><br><br>" + fulldate + "<br>"
  );
  win.document.write("<i> Merci! SUPERMARCHÉ Akram TAIYB <i>");
  win.document.write("</center>");
  win.document.write("</body></html>");
  win.document.close();
  win.print();
  total.innerHTML = "";
  printedThead.innerHTML = "";
  printedTbody.innerHTML = "";
};

var updateTotal = function () {
  var somme = 0;
  var prices = document.getElementsByClassName("prixuni");
  var quantities = document.getElementsByClassName("quantite");
  var total = Number(document.getElementById("prixtopay").innerHTML);
  for (var i = 0; i < prices.length; i++) {
    somme += Number(prices[i].textContent) * Number(quantities[i].value);
    total = somme;
    document.getElementById("prixtopay").innerHTML = total;
  }
};

for (var i = 0; i < addItemButtons.length; i++) {
  var button = addItemButtons[i];
  var panier = [];
  button.addEventListener("click", function (e) {
    var objet = e.target;
    var nomObjet =
      objet.parentNode.parentNode.getElementsByTagName("h5")[0].innerHTML;
    var prix =
      objet.parentNode.parentNode.getElementsByClassName("digitalprice")[0]
        .innerHTML;
    if (!panier.includes(nomObjet)) {
      panier.push(nomObjet);
    }
    var objetListe = document.getElementById("objet");
    var inpanier = document.querySelectorAll(".inpanier");
    for (item of panier) {
      var unique = true;
      for (k of inpanier) {
        if (item == k.innerHTML) {
          unique = false;
          alert(item + " est deja ajouté!");
        }
      }
      if (unique) {
        var nbrItems = document.getElementById("totalNbr");
        nbrItems.innerHTML = Number(nbrItems.innerHTML) + 1;
        var tdQte = document.createElement("td");
        var qteInput = document.createElement("input");
        qteInput.type = "number";
        qteInput.min = "1";
        qteInput.max = "10";
        qteInput.value = "1";
        qteInput.classList.add("quantite");
        tdQte.appendChild(qteInput);
        var texte = document.createTextNode(item);
        var tr = document.createElement("tr");
        var tdObjet = document.createElement("td");
        var tdPrix = document.createElement("td");
        var prixTexte = document.createTextNode(prix);
        tdPrix.appendChild(prixTexte);
        tdObjet.appendChild(texte);
        tdPrix.classList.add("prixuni");
        tdObjet.classList.add("inpanier");
        var removeIcon = document.createElement("img");
        removeIcon.classList.add("removeicon");
        removeIcon.src =
          "https://img.icons8.com/fluency/48/000000/clear-symbol.png";
        removeIcon.style =
          "width: 24px; height: 24px; cursor: pointer; vertical-align: bottom; line-height: 20px; margin-left: 10px;";
        removeIcon.addEventListener("click", function (e) {
          nbrItems.innerHTML = Number(nbrItems.innerHTML) - 1;
          var here = e.target.parentNode.parentNode;
          var container = e.target.parentNode.parentNode.parentNode;
          container.removeChild(here);
          if (Number(nbrItems.innerHTML) == 0) {
            // console.log(true);
            document.getElementById("prixtopay").innerHTML = 0;
            document.getElementById("intolist").disabled = true;
          } else {
            document.getElementById("intolist").disabled = false;
            updateTotal();
          }
        });
        tdQte.appendChild(removeIcon);
        tr.appendChild(tdObjet);
        tr.appendChild(tdPrix);
        tr.appendChild(tdQte);
        objetListe.appendChild(tr);
        qteInput.addEventListener("change", function () {
          updateTotal();
        });
      }
      panier.shift();
      if (Number(nbrItems.innerHTML) != 0) {
        document.getElementById("intolist").disabled = false;
      } else {
        document.getElementById("intolist").disabled = true;
      }
    }
    updateTotal();
  });
}
