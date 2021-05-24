import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router";

import SideNavBar from "../../../components/common/sideNav/SideNav";
import Practice from "../../../components/practices/practice/Practice";

const PracticePage = () => {
  const [state, setState] = useState(false);

  const { id } = useParams();

  return (
    <>
      <SideNavBar />
      <div className="container">
        <Practice id={id} />
      </div>
      ;
    </>
  );
};

export default PracticePage;
