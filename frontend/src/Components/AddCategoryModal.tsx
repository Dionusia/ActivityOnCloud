import React from "react";
import { Modal, Button } from "flowbite-react";
import { AddCategoryModalProps } from "../InterfacesAndTypes/Interfaces";

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  show,
  onClose,
  newCategory,
  setNewCategory,
  handleSave,
}) => (
  <Modal
    show={show}
    onClose={onClose}
    className="fixed inset-0 w-full h-full flex items-center justify-center"
  >
    <div className="fixed inset-0 bg-white opacity-50"></div>
    <div className="bg-white p-4 rounded-lg w-1/2 max-w-lg mx-auto z-10">
      <Modal.Header className="text-center">Add Category</Modal.Header>
      <Modal.Body className="p-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen"
        />
      </Modal.Body>
      <Modal.Footer className="p-4">
        <Button
          className="w-full mb-2 bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
          type="button"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="w-full bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </div>
  </Modal>
);
export default AddCategoryModal;
