import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import { NavLink } from "react-router-dom";

export default function Nav() {
  const [value, setValue] = React.useState(0);

  const handleClick = () => {
    value === 0? setValue(1):setValue(0)
  };

  return (
    <Paper square>
      <div>
        <NavLink onClick={handleClick} className={value===0?"lincActive":"linc"} to={"/"}><Tab label="Fractions" /></NavLink>
        <NavLink onClick={handleClick} className={value===1?"lincActive":"linc"} to={"/search"}><Tab label="Search" /></NavLink>
      </div>
    </Paper>
  );
}