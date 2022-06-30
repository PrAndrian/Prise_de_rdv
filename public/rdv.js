var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
document.getElementById("rdvDate").setAttribute("min", yyyy + "-0" + mm + "-" + dd);
console.log(document.getElementById("rdvDate"));

