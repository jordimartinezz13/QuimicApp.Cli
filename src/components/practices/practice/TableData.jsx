import React, { useState, useEffect } from "react";
import axios from "../../common/http";

import { Descriptions } from "antd";

const Practices = () => {
  const [datos, setDatos] = useState(null);

  const array = [];

  const condId = 5;

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("condicion/" + condId);
        array.push({
          nombre: response.data.nombre_columna,
          longitud: response.data.longitud_columna,
          diametro: response.data.diametro_interior_columna,
          tamano: response.data.tamano_particula,
          temperatura: response.data.temperatura,
          velocidad: response.data.velocidad_flujo,
          eluyente: response.data.eluyente,
          detector: response.data.detector_uv,
        });
        setDatos(array);
      } catch (e) {}
    }
    getData();
  }, []);

  // console.log(array);
  // datos ? console.log(datos[0].nombre) : console.log("hola");

  return (
    <Descriptions
      title="Condiciones"
      layout="horizontal"
      column={1}
      bordered={true}
      className="col"
    >
      <Descriptions.Item label="Nombre columna">
        {datos ? datos[0].nombre : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Longitud columna">
        {datos ? datos[0].longitud : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Diámetro interior columna">
        {datos ? datos[0].diametro : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Tamaño de partícula">
        {datos ? datos[0].tamano : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Temperatura">
        {datos ? datos[0].temperatura : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Velocidad de flujo">
        {datos ? datos[0].velocidad : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Eluyente">
        {datos ? datos[0].eluyente : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Detector UV">
        {datos ? datos[0].detector : ""}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default Practices;
