import React, { useContext } from "react";
// import styled from "styled-components";
// import { User } from "../../../App";
import { history } from "react-router-dom";
import SideNavBar from "../../components/common/sideNav/SideNav";
import Swal from "sweetalert2";
import axios from "../../components/common/http";
import swal from "sweetalert";
import carga from "../../assets/img/load/ajax-loader.gif";

const verpw = () => {
  // const { user } = useContext(User);

  let VerAut = null;
  let val = null;

  const getGET = () => {
    // capturamos la url
    var loc = document.location.href;

    // si existe el interrogante
    if (loc.indexOf("?") > 0) {
      // cogemos la parte de la url que hay despues del interrogante
      var getString = loc.split("?")[1];

      // obtenemos un array con cada clave=valor
      var GET = getString.split("&");
      var get = {};

      // recorremos todo el array de valores
      for (var i = 0, l = GET.length; i < l; i++) {
        var tmp = GET[i].split("=");
        get[tmp[0]] = unescape(decodeURI(tmp[1]));
      }
      VerAut = get["verificar"];
      return get["verificar"];
      //var edad = valores['edad'];
    }
  };
  const datos = async () => {
    Swal.fire({
      title: "Cambiar contraseña",
      html: `<label for='Epss'>Contraseña:</label>
      <input class="swal2-input" id='Epss' type='password' >
      <label for='Epss1'>Repetir contraseña:</label>
      <input class="swal2-input" id='Epss1' type='password' >`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const Epss = Swal.getPopup().querySelector("#Epss").value;
        const Epss1 = Swal.getPopup().querySelector("#Epss1").value;
        if (!Epss || !Epss1) {
          Swal.showValidationMessage(`Algún campo obligatorio vacío`);
        }
        return {
          Epss: Epss,
          Epss1: Epss1,
        };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value.Epss == result.value.Epss1) {
        val = result.value.Epss;
        VerAut = getGET();
        verificar();
      } else {
        swal({
          title: "Error en campos",
        });
      }
    });
  };

  const verificar = async () => {
    // capturamos la url
    //var VerAut = get["veri"];
    //var edad = valores['edad'];
    //?a=1
    //getGET();
    console.log(val);
    //let peticion = datos();
    if (VerAut) {
      swal({
        //title: "Comprobando ...",
        icon: carga,
        button: false,
        allowOutsideClick: false,
      });
      await axios
        .put(`usr/co-pw/${VerAut}`, "password=" + val)
        .then((response) => {
          //console.log(response.data);
          if (response.status >= 200 && response.status <= 205) {
            //console.log(response.data[1].nombre);
            //console.log(response.data);
            //window.location.reload(true);
            console.log(val);
            swal({
              title: "Contraseña cambiada correctamente",
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 1800);
            // history.push("/");
          }
        })
        .catch(function (error) {
          if (error.status == 401) {
            swal({
              title: "Error acceso " + error.response.status,
              text: "Error, no tienes acceso a esta sección.",
              icon: "error",
              button: "Aceptar",
              timer: "3000",
            });
          } else {
            swal({
              title: "Error interno " + error.response.status,
              text: "Error interno, vuelve a intentarlo en unos momentos.",
              icon: "error",
              button: "Aceptar",
              timer: "3000",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error",
        html: `Error desconocido`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        focusConfirm: false,
      });
    }
  };

  return (
    <div>
      <SideNavBar />
      <section id="header" class="dark">
        <header>
          <h1>Actualiza tu contraseña</h1>
          <p>Para cambiar la contraseña pulsa el botón inferior.</p>
        </header>
        <footer>
          <a
            class="button scrolly"
            onClick={(e) => {
              datos();
            }}
          >
            Actualizar contraseña
          </a>
        </footer>
      </section>
    </div>
  );
};

export default verpw;
