import React, { useContext } from "react";
// import styled from "styled-components";
// import { User } from "../../../App";
import SideNavBar from "../../components/common/sideNav/SideNav";

const auth = () => {
  // const { user } = useContext(User);

  return (
    <div>
      <SideNavBar />
      <section id="header" class="dark">
        <header>
          <h1>¡ Felicidades ! 🎉</h1>
          <p>
            Ya tienes una cuenta autorizada para poder utilizar la plataforma,
            con el <br></br>botón inferior o el de la barra superior puedes
            entrar en la aplicación.
          </p>
        </header>
        <footer>
          <a href="/login" class="button scrolly">
            Login
          </a>
        </footer>
      </section>
    </div>
  );
};

export default auth;
