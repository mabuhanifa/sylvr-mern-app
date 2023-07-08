import React from "react";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  console.log(location);
  return <div>App</div>;
}
