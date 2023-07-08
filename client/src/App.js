import React from "react";
import { useProvider } from "./contextAPI/context";

export default function App() {
  const location = useProvider();
  console.log(location);
  return <div>App</div>;
}
