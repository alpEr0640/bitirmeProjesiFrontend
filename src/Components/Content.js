import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage"

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
      </Routes>
    </div>
  );
}

export default Content