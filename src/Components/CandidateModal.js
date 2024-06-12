import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useState } from "react";
import "../Css/CandidateModal.css"

export default function AnnouncementModal(props) {
  const { setModalIsOpen, modalIsOpen, closeModal, confirmAddCandidates } =
    props;

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
        <ModalHeader className="candidateModalHeader">
          <h2>Aday ekleme işlemini bitirmek istiyor musunuz?</h2>
        </ModalHeader>
        <ModalBody className="candidateModalBody">
          <button onClick={confirmAddCandidates} className="modalButtons">
            Evet
          </button>
          <button onClick={closeModal} className="modalButtons">
            Hayır
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
}
