import axios from "axios";
const instance = axios.create({
  baseURL:

    "https://quimicback.herokuapp.com/public/api/",
  //"http://localhost/Clase/ProyectoFinal/Quimica/quimica/AppQuimica/server/public/api/",
  //"http://localhost/M7_M14/projecte_M14/quimica/AppQuimica/server/public/api/",

});
export default instance;
