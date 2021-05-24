import React, { useContext } from "react";
// import styled from "styled-components";
// import { User } from "../../../App";
import SideNavBar from "../../components/common/sideNav/SideNav";

const PageNotFound = () => {
  // const { user } = useContext(User);

  return (
    <div>
      <SideNavBar />
      <section id="header" class="dark">
        <header>
          <h1>❌ ERROR 404 ❌</h1>
          <br></br>
          <br></br>
          <h3>
            Uy, llegaste a un mundo desconocido. <br></br>
            Mejor regresa al inicio.
          </h3>
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

export default PageNotFound;
