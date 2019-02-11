import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h3>Woops!</h3>
    <Link to="/">Head back to safety!</Link>
  </div>
);

export default NotFound;
