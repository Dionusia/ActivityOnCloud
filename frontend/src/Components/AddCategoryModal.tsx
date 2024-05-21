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
    className="mx-auto my-auto w-1/2 max-x-lg"
  >
    <Modal.Header className="m-2">Add Category</Modal.Header>
    <Modal.Body className="m-2">
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className="m-2  w-2/3 shadow-sm focus:ring-customGreen focus:border-customGreen  sm:text-sm border-gray-300 rounded-md"
      />
    </Modal.Body>
    <Modal.Footer className="m-2">
      <Button
        className="w-1/8   flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
        type="button"
        onClick={handleSave}
      >
        Save
      </Button>
      <Button
        className="w-1/8   flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
        onClick={onClose}
      >
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);
export default AddCategoryModal;
