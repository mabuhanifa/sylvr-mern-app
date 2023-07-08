import React from "react";
import { Toaster } from "react-hot-toast";
import Nav from "./Nav";

export default function Home() {
  return (
    <div>
      <div className="p-5 md:px-20 py-10">
        <Toaster />
        <Nav />
      </div>
    </div>
  );
}
