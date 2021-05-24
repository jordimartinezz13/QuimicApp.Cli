import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "../common/http";
import { Table, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import carga from "../../assets/img/load/ajax-loader.gif";
import Swal from "sweetalert2";

import { CreateButton, TableWrapper } from "./Practices.styled";

const columns = [
  {
    title: "Profesor",
    dataIndex: "profesor",
    // sorter: (a, b) => a.profesor - b.profesor,
    sorter: (a, b) => {
      if (a.profesor < b.profesor) return 1;
      if (b.profesor < a.profesor) return -1;
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  // {
  //   title: "Compuesto en muestra",
  //   dataIndex: "compuestoEnMuestra",
  //   // sorter: (a, b) => a.profesor - b.profesor,
  // },
  {
    title: "Enunciado",
    dataIndex: "enunciado",
    // sorter: (a, b) => a.grupo - b.grupo,
  },
  {
    title: "Fecha inicio",
    dataIndex: "fechaInicio",
    // sorter: (a, b) => a.fechaInicio - b.fechaInicio,
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: "Fecha fin",
    dataIndex: "fechaFin",
    // sorter: (a, b) => a.fechaFin - b.fechaFin,
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: "",
    key: "accion",
    render: (text, record) => (
      <Space size="middle">
        <Link title="Ver" to={{ pathname: `/practicas/practica/${record.id}` }}>
          <FontAwesomeIcon icon={faEye} className="view-icon" />
        </Link>
        <a title="Editar">
          <FontAwesomeIcon
            icon={faEdit}
            className="view-icon"
            onClick={(e) => {
              onUpdate(
                record.key,
                record.id,
                record.enunciado,
                record.id_profesor,
                record.compuestoEnMuestra,
                record.fechaInicio,
                record.fechaFin,
                record.profesor
              );
            }}
          />
        </a>
        <a title="Eliminar">
          <FontAwesomeIcon
            icon={faTimes}
            className="delete-icon"
            onClick={(e) => {
              onDelete(record.id);
            }}
          />
        </a>
      </Space>
    ),
  },
];
const onCreateBut = () => {
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("user"));

  if (usuarioLogeado) {
    if (usuarioLogeado.id_profesor) {
      return (
        <CreateButton
          className="btn"
          onClick={(e) => {
            onCreate(usuarioLogeado.id_profesor);
          }}
        >
          + Crear
        </CreateButton>
      );
    }
  }
};

const onCreate = async (id) => {
  var peticion = [];

  Swal.fire({
    title: "Crear componente",
    html: `
    <label for='Eenunciado'>Enunciado:</label><br>
    <input class="swal2-input" id='Eenunciado' type='text' placeholder="Enunciado"><br>
    <label for='EfechaInicio'>Fecha inicio:</label><br>
    <input class="swal2-input" id='EfechaInicio' type='date' placeholder="2021-05-01"><br>
    <label for='EfechaFin'>Fecha fin:</label><br>
    <input class="swal2-input" id='EfechaFin' type='date' placeholder="2021-05-01"><br>
    `,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Crear",
    cancelButtonText: "Cancelar",
    focusConfirm: false,
    preConfirm: () => {
      const Eenunciado = Swal.getPopup().querySelector("#Eenunciado").value;
      const EfechaInicio = Swal.getPopup().querySelector("#EfechaInicio").value;
      const EfechaFin = Swal.getPopup().querySelector("#EfechaFin").value;
      // if (!Enombre) {
      //   Swal.showValidationMessage(`Algún campo obligatorio vacío`);
      // }
      return {
        Eenunciado: Eenunciado,
        EfechaInicio: EfechaInicio,
        EfechaFin: EfechaFin,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      peticion = {
        id_profesor: id,
        enunciado: `${result.value.Eenunciado}`,
        fecha_inicio: `${result.value.EfechaInicio}`,
        fecha_fin: `${result.value.EfechaFin}`,
      };
      peticionCrear(peticion);
    }
  });
};

const peticionCrear = async (peticion) => {
  await axios
    .post("practica", peticion)
    .then((response) => {
      //console.log(response.data);
      if (response.status >= 200 && response.status <= 205) {
        //console.log(response.data[1].nombre);
        //console.log(response.data);
        window.location.reload(true);
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
};

const onDelete = (id) => {
  swal({
    title: "¿Estás seguro?",
    text: "Eliminarás la práctica y luego no podrás volver a recuperarla.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      //SI
      //console.log(rol);

      swal({
        //title: "Comprobando ...",
        icon: carga,
        button: false,
        allowOutsideClick: false,
      });
      axios
        .delete("practica/" + id)
        .then((response) => {
          //console.log(response.data);
          if (response.status >= 200 && response.status <= 205) {
            window.location.reload(true);
            // swal({
            //   title: "Practica eliminada",
            //   text: "  ",
            //   icon: "success",
            //   button: false,
            //   timer: "1800",
            // });
          }
        })
        .catch(function (error) {
          //console.log("EEEEEEEEEEEEEEEE", error, "AAAAAAAAAAAAAAAAAAA");
          if (error.status == 401) {
            swal({
              title: "Error acceso " + error.response.status,
              text: "Error, no tienes acceso a esta sección.",
              icon: "error",
              button: "Aceptar",
              timer: "3000",
            });
          } else {
            //console.log(error.response.data["Error"]);
            swal({
              title: "Error " + error.response.status,
              text: "Error interno",
              icon: "error",
              button: "Aceptar",
              timer: "3000",
            });
          }
        });
    } else {
      //swal("Grupo no eliminado");
    }
  });
};

const onUpNull = (variable) => {
  if (variable == null) {
    return "";
  } else {
    return variable;
  }
};

const onUpdate = async (
  key,
  id,
  enunciado,
  id_profesor,
  compuestoEnMuestra,
  fechaInicio,
  fechaFin,
  profesor
) => {
  //e.preventDefault();
  //const data = this.state.data.filter(item => item.key !== key);
  //this.setState({ data, isPageTween: false });
  //console.log(key, e);
  //history.push("/editUsuario");
  // const grupos = await groups(rol, id_grupo, grupo);
  //console.log(grupos, "AAAAAAAAAAAAAAAAAAAAAA");
  enunciado = onUpNull(enunciado);
  fechaInicio = onUpNull(fechaInicio);
  fechaFin = onUpNull(fechaFin);
  profesor = onUpNull(profesor);
  Swal.fire({
    title: "Editar",
    html: `<label for='Eenunciado'>Enunciado:</label><br>
    <input class="swal2-input" id='Eenunciado' type='text' value='${enunciado}'><br>
    <label for='EfechaInicio'>Fecha inicio:</label><br>
    <input class="swal2-input" id='EfechaInicio' type='date' value='${fechaInicio}' placeholder="2021-05-01"><br>
    <label for='EfechaFin'>Fecha fin:</label><br>
    <input class="swal2-input" id='EfechaFin' type='date' value='${fechaFin}' placeholder="2021-05-01"><br>`,

    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Editar",
    cancelButtonText: "Cancelar",
    focusConfirm: false,
    preConfirm: () => {
      const Eenunciado = Swal.getPopup().querySelector("#Eenunciado").value;
      const EfechaInicio = Swal.getPopup().querySelector("#EfechaInicio").value;
      const EfechaFin = Swal.getPopup().querySelector("#EfechaFin").value;
      //alert(Egrupo);
      //const Eprofe = Swal.getPopup().querySelector("#Eprofe").checked;
      //const Eadmin = Swal.getPopup().querySelector("#Eadmin").checked;
      // if (!EnombreCompuesto || !Eformula) {
      //   Swal.showValidationMessage(`Algún campo obligatorio vacío`);
      // }
      return {
        Eenunciado: Eenunciado,
        EfechaInicio: EfechaInicio,
        EfechaFin: EfechaFin,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      swal({
        //title: "Comprobando ...",
        icon: carga,
        button: false,
        allowOutsideClick: false,
      });
      let peticion = [];
      peticion = {
        enunciado: `${result.value.Eenunciado}`,
        fecha_inicio: `${result.value.EfechaInicio}`,
        fecha_fin: `${result.value.EfechaFin}`,
        id_profesor: id_profesor,
        id_compuesto_en_muestra: compuestoEnMuestra,
        id: id,
      };
      console.log(peticion);
      axios
        .put("practica/" + id, peticion)
        .then((response) => {
          //console.log(response.data);
          if (response.status >= 200 && response.status <= 205) {
            //console.log(response.data[1].nombre);
            //console.log(response.data);
            window.location.reload(true);
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
    }
  });
};

const showHeader = true;

const pagination = { position: "bottom" };

const Practices = () => {
  const [datos, setDatos] = useState();
  const array = [];

  useEffect(async () => {
    //console.log(token, axios, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      // console.log(user);
      //if (user.id_profesor) {
      var usuarioLogeado = JSON.parse(sessionStorage.getItem("user"));
      //console.log(usuarioLogeado);

      //LARAVEL CONTROLA SI EL USUARIO QUE PIDE ES ADMIN O NO
      await axios
        .get("practicas1")
        .then((response) => {
          //console.log(response.data);
          if (response.status >= 200 && response.status <= 205) {
            //console.log(response.data[1].nombre);
            //console.log(response.data, response.data.length);
            for (let i = 0; i < response.data.length; i++) {
              //console.log(response.data[i]);
              array.push({
                key: i,
                id: response.data[i].id,
                enunciado: response.data[i].enunciado,
                id_profesor: response.data[i].id_profesor,
                compuestoEnMuestra: response.data[i].id_compuesto_en_muestra,
                fechaInicio: response.data[i].fecha_inicio,
                fechaFin: response.data[i].fecha_fin,
                profesor: response.data[i].nombre_profesor,
              });
            }
            //console.log(array1);

            //history.push("/");
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
      //if (usuarioLogeado.id_profesor) {
      //} else {
      //console.log("ALUMNO");
      //columns.splice(5);
      //}
    }
    //console.log(array1);
    //console.log(array1);
    setDatos(array);
  }, []);

  const [state, setState] = useState({
    bordered: false,
    loading: false,
    pagination,
    size: "default",
    showHeader,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: "fixed",
    top: "none",
    bottom: "bottomRight",
    xScroll: false,
    yScroll: false,
  });

  const handleDataChange = (hasData) => {
    this.setState({ hasData });
  };

  const scroll = {};
  if (state.yScroll) {
    scroll.y = 240;
  }
  if (state.xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: state.ellipsis,
  }));
  if (state.xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  return (
    <>
      {onCreateBut()}
      <TableWrapper>
        {/* <CreateButton>+ Crear componente</CreateButton> */}
        <Table
          {...state}
          pagination={{ position: [state.top, state.bottom], pageSize: 6 }}
          columns={tableColumns}
          dataSource={datos ? datos : null}
          scroll={scroll}
          className="practices-table"
        />
      </TableWrapper>
    </>
  );
};

export default Practices;
