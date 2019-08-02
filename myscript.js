// Creare un calendario dinamico con le festività.
// Partiamo dal gennaio 2018 dando la possibilità di cambiare mese,
// gestendo il caso in cui l’API non possa ritornare festività.
// Il calendario partirà da gennaio 2018 e
// si concluderà a dicembre 2018 (unici dati disponibili sull’API).
$(document).ready(function(){

  var source = $("#template").html();
  var template = Handlebars.compile(source);
  var dataBase = moment("2018-01-01");
  var anno = dataBase.format("YYYY");
  console.log("questo è l'anno:", anno);
  var mese = parseInt(dataBase.format("M")) -1;
  console.log("questo mese è:", mese);

  var giorniMese = dataBase.daysInMonth();
  console.log(giorniMese);

  $(".calendario h1").text(dataBase.format("MMMM YYYY"));

  for (var i = 1; i <= giorniMese ; i++) {
    var jan = moment([anno, mese, i]).format("dddd D MMMM");

    var context = {giorno: jan, holidays: moment([anno, mese, i]).format("YYYY-MM-DD")};
    var html = template(context);
    $(".lista").append(html);

  }
  var urlHoliday = "https://flynn.boolean.careers/exercises/api/holidays";

  $.ajax(
    {
      url : urlHoliday,
      data : {"year": "2018", "month": mese},
      method : "GET",
      success : function(data) {
        var festa = data.response;
        console.log(festa);

        for (var i = 0; i < festa.length; i++) {
          var objfesta = festa[i];
          console.log(objfesta.name, objfesta.date);

          var liFest = $("li[dateref='" + objfesta.date + "']");
          console.log(liFest);
          if (liFest) {
            liFest.append(", " + objfesta.name);
            liFest.addClass("red");

          }
        }
      },
      error : function (richiesta,stato,errore) {
        alert("Si è verificato un errore" + errore);

      }
    }
  );


});

// var mesegen = moment().month(11);
// console.log(mesegen);
