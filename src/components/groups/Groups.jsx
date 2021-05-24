import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import axios from "../common/http";
import swal from "sweetalert";
import Swal from "sweetalert2";
import carga from "../../assets/img/load/ajax-loader.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faEye } from "@fortawesome/free-solid-svg-icons";
import { CreateButton, TableWrapper } from "./Groups.styled";

// import "./groups.css";

const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    //sorter: (a, b) => a.nombre - b.nombre,
    sorter: (a, b) => {
      if (a.nombre < b.nombre) return 1;
      if (b.nombre < a.nombre) return -1;
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    //sorter: (a, b) => a.apellidos - b.apellidos,
    responsive: ["lg"],
    sorter: (a, b) => {
      if (a.apellidos < b.apellidos) return 1;
      if (b.apellidos < a.apellidos) return -1;
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },

  {
    title: "Grupo",
    dataIndex: "grupo",
    //sorter: (a, b) => a.grupo - b.grupo,
    sorter: (a, b) => {
      if (a.grupo < b.grupo) return 1;
      if (b.grupo < a.grupo) return -1;
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    //sorter: (a, b) => a.email - b.email,
    responsive: ["lg"],
    sorter: (a, b) => {
      if (a.email < b.email) return 1;
      if (b.email < a.email) return -1;
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  // {
  //   title: "Profesor",
  //   dataIndex: "profesor",
  //   // sorter: (a, b) => a.profesor - b.profesor,
  //   responsive: ["lg"],
  //   sorter: (a, b) => {
  //     if (a.profesor < b.profesor) return 1;
  //     if (b.profesor < a.profesor) return -1;
  //     return 0;
  //   },
  //   sortDirections: ["descend", "ascend"],
  // },
  // {
  //   title: "",
  //   key: "accion",
  //   dataIndex: "accion",
  //   render: () => (
  //     <Space size="middle">
  //       <a title="Ver">
  //         <FontAwesomeIcon icon={faEye} className="view-icon" />
  //       </a>
  //       <a title="Editar">
  //         <FontAwesomeIcon icon={faEdit} className="view-icon" />
  //       </a>
  //       <a title="Eliminar">
  //         <FontAwesomeIcon icon={faTimes} className="delete-icon" />
  //       </a>
  //     </Space>
  //   ),
  // },
];

// const data = [];

const showHeader = true;

const pagination = { position: "bottom" };

const Grupos = () => {
  // const { token } = useContext(User);
  const [datos, setDatos] = useState();

  const array = [];

  useEffect(async () => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      await axios
        .get("group-usuario")
        .then((response) => {
          //console.log(response.data);
          if (response.status >= 200 && response.status <= 205) {
            //console.log(response.data[1].nombre);
            //console.log(response.data, response.data.length);
            for (let i = 0; i < response.data.length; i++) {
              //console.log(response.data[i].email);
              if (response.data[i].email) {
                array.push({
                  key: i,
                  nombre: response.data[i].nombre,
                  apellidos: response.data[i].apellidos,
                  email: response.data[i].email,
                  id_grupo: response.data[i].id_grupo,
                  grupo: response.data[i].nombre_grupo,
                });
              } else {
                array.push({
                  key: i,
                  nombre: (
                    <>
                      {response.data[i].nombre}&nbsp;&nbsp;
                      <a
                        className="btn btn-primary"
                        onClick={(e) => {
                          onEdit(response.data[i].id, response.data[i].nombre);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                      </a>
                      &nbsp;&nbsp;
                      <a
                        className="btn btn-danger"
                        onClick={(e) => {
                          onDelete(response.data[i].id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="delete-icon"
                        />
                      </a>
                    </>
                  ),
                  apellidos: response.data[i].apellidos,
                  email: response.data[i].email,
                  id_grupo: response.data[i].id_grupo,
                  grupo: response.data[i].nombre_grupo,
                });
              }
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

  const onEdit = async (id, nombreUsuario) => {
    // swal({
    //   title: "Error acceso " + id,
    // });
    Swal.fire({
      title: "Editar",
      html: `<label for='Enombre'>Nombre:</label>
      <input class="swal2-input" id='Enombre' type='text' value='${nombreUsuario}'>
      `,
      // <input id='Eprofe' type='checkbox'>
      // <label class="swal2-input" for='Eprofe'>&nbsp;Es profesor</label><br>
      // <input id='Eadmin' type='checkbox'>
      // <label class="swal2-input" for='Eadmin'>&nbsp;Es admin</label>
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const Enombre = Swal.getPopup().querySelector("#Enombre").value;
        if (!Enombre) {
          Swal.showValidationMessage(`Algún campo obligatorio vacío`);
        }
        return {
          Enombre: Enombre,
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
          nombre: `${result.value.Enombre}`,
        };
        axios
          .put("grupo/" + `${id}`, peticion)
          .then((response) => {
            //console.log(response.data);
            if (response.status >= 200 && response.status <= 205) {
              //console.log(response.data[1].nombre);
              //console.log(response.data);
              window.location.reload(true);
              //Users.array1[key].nombreUsuario = response.data.nombreUsuario;
              //Users.array1[key].nombre = response.data.nombre;
              //Users.array1[key].apellidos = response.data.apellidos;

              // swal({
              //   icon: "success",
              //   title: "Actualizado",
              //   text: `
              //     Usuario: ${result.value.EnombreUsuario}
              //     Nombre: ${result.value.Enombre}
              //     Apellidos: ${result.value.Eapellidos}
              //     Email: ${result.value.Eemail}
              //   `,
              // });
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

  const onCreateBut = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem("user"));

    if (usuarioLogeado) {
      if (usuarioLogeado.id_profesor) {
        return (
          <CreateButton
            className="btn"
            onClick={(e) => {
              onCreate();
            }}
          >
            + Crear Grupo
          </CreateButton>
        );
      } else {
        columns.splice(5);
      }
    }
  };

  const onCreate = async () => {
    var peticion = [];

    Swal.fire({
      title: "Crear grupo",
      html: `
      <label for='Enombre'>Nombre:</label>
      <input class="swal2-input" id='Enombre' type='text' placeholder="Nombre">`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const Enombre = Swal.getPopup().querySelector("#Enombre").value;
        if (!Enombre) {
          Swal.showValidationMessage(`Algún campo obligatorio vacío`);
        }
        return {
          Enombre: Enombre,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        peticion = {
          nombre: `${result.value.Enombre}`,
        };
        peticionCrear(peticion);
      }
    });
  };

  const peticionCrear = async (peticion) => {
    await axios
      .post("grupo", peticion)
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
      text: "Eliminarás a todos los usuarios del grupo y una vez eliminado no podrás volver a recuperarlo.",
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
          .delete("grupo/" + id)
          .then((response) => {
            //console.log(response.data);
            if (response.status >= 200 && response.status <= 205) {
              var usuarioLogeado = JSON.parse(sessionStorage.getItem("user"));
              if (usuarioLogeado.id_profesor) {
                window.location.reload(true);
              } else {
                sessionStorage.clear();
                window.location.href = "/";
              }
              swal({
                title: "Grupo eliminado",
                text: "  ",
                icon: "success",
                button: false,
                timer: "1800",
              });
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
                text: "El grupo tiene alumnos asignados",
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
  var usuarioLogeado = JSON.parse(sessionStorage.getItem("user"));
  var hola = "Estos son los datos de tu grupo.";
  if (JSON.parse(usuarioLogeado.id_profesor)) {
    columns.splice(1);
    hola = "Estos son los grupos que hay registrados.";
  }

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

  const nombreUsu = sessionStorage.getItem("user").username;

  const mensajeGrupo = () => {
    var usuarioLogeado = JSON.parse(sessionStorage.getItem("user"));

    if (array[0].grupo) {
      return (
        usuarioLogeado.username +
        " estas en el grupo " +
        array[0].grupo +
        " con estos otros usuarios."
      );
    } else {
      return usuarioLogeado.username + " no estás asignado en ningún grupo.";
    }
  };

  return (
    <>
      {onCreateBut()}
      <TableWrapper>
        {/* <CreateButton>+ Crear grupo</CreateButton> */}
        <Table
          {...state}
          pagination={{ position: [state.top, state.bottom], pageSize: 6 }}
          columns={tableColumns}
          dataSource={datos ? datos : null}
          scroll={scroll}
          className="groups-table"
        />
      </TableWrapper>
    </>
  );
};

export default Grupos;
