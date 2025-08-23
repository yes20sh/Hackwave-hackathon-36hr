import React, { memo } from "react";
import classes from "./index.module.css";

const Container = ({ children, paddingNotMobile = false }) => {
  return (
    <div
      className={`${classes.root} ${
        paddingNotMobile ? classes.paddingNotMobile : ""
      }`}
    >
      {children}
    </div>
  );
};

export default memo(Container);
