import { forwardRef } from "react";
import Slide from "@mui/material/Slide";

export const TransitionComponent = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
