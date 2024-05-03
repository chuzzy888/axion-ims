import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";


function BackButton() {
  let navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className=" text-slate-900 text-3xl  m-5 ">
      <IoChevronBackOutline />

    </button>
  );
}

export default BackButton;
