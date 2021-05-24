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
          <h1>❌ ERROR AL INTENTAR VERIFICAR ❌</h1>
          <p>
            Parece que ha habido algún problema al verificar tu usuario, en caso
            <br></br>de que el problema persista contacta con el administrador
            del servicio.
          </p>
        </header>
        <footer>
          <a href="/" class="button scrolly">
            Inicio
          </a>
        </footer>
      </section>
    </div>
  );
};

export default auth;
