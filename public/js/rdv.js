// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth() + 1; //January is 0!
// var yyyy = today.getFullYear();
// document.getElementById("rdv_date").setAttribute("min", yyyy + "-0" + mm + "-" + dd);
// console.log(document.getElementById("rdv_date"));

function rdvcheck() {
    if(document.getElementById("rdv_date").value==null) {
        console.log("test1")
        alert("Remplissez le champ Date")
    }else if(document.getElementById("rdv_heure").value==''){
        console.log("test2")
        alert("Remplissez le champ Heure")
    }
}