import React, { useState } from "react";
import PropTypes from "prop-types";

const ModalEdit = ({
  setShowModal,
  currentValue,
  setCurrentValue,
  onClick,
}) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#DFDEDC] outline-none focus:outline-none ">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t  ">
            <input
              className="w-full rounded mb-3 py-1.5 px-2"
              type="text"
              placeholder="What do want to do?"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              autoFocus
            />
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 bg-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalEdit.propTypes = {
  setShowModal: PropTypes.func,
  currentValue: PropTypes.string,
  setCurrentValue: PropTypes.func,
  onClick: PropTypes.func,
};

export default ModalEdit;
