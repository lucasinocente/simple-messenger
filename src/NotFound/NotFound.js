import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="not_found">
      <h1>404 - Página não encontrada</h1>
      <p>Parece que este lugar não existe.</p>
      <Link to="/" className="not_found__go_back">
        voltar
      </Link>
    </section>
  );
};

export default NotFound;
