import React, { useState } from "react";

import { Table, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

import { TableWrapper } from "./Practice.styled";

const columns = [
  {
    title: "Picos",
    dataIndex: "picos",
    sorter: (a, b) => a.picos - b.picos,
    responsive: ["lg"],
  },
  {
    title: "Compuestos",
    dataIndex: "compuestos",
    sorter: (a, b) => a.compuestos - b.compuestos,
  },
  {
    title: "Minutos",
    dataIndex: "minutos",
    sorter: (a, b) => a.minutos - b.minutos,
    responsive: ["lg"],
  },
  {
    title: "Altura",
    dataIndex: "altura",
    sorter: (a, b) => a.altura - b.altura,
  },
  {
    title: "Inicio",
    dataIndex: "inicio",
    sorter: (a, b) => a.inicio - b.inicio,
  },
  {
    title: "Fin",
    dataIndex: "fin",
    sorter: (a, b) => a.fin - b.fin,
  },
];

const data = [];
data.push({
  key: 1,
  picos: 1,
  compuestos: "Cortisol",
  minutos: 0.74,
  altura: 56,
  inicio: 0.71,
  fin: 0.76,
});
data.push({
  key: 2,
  picos: 2,
  compuestos: "Corticosterone",
  minutos: 1.31,
  altura: 33,
  inicio: 1.29,
  fin: 1.33,
});
data.push({
  key: 3,
  picos: 3,
  compuestos: "Estradiol",
  minutos: 1.49,
  altura: 43,
  inicio: 1.45,
  fin: 1.54,
});

const showHeader = true;

const pagination = { position: "bottom" };

const CompoundTable = () => {
  const [datos, setDatos] = useState(null);

  const array = [];

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
    <TableWrapper className="col">
      <Table
        {...state}
        pagination={{ position: [state.top, state.bottom] }}
        columns={tableColumns}
        dataSource={state.hasData ? data : null}
        scroll={scroll}
        className="compound-table"
      />
    </TableWrapper>
  );
};

export default CompoundTable;
