import React from "react";
import {clearError} from "../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {MODAL_CLOSE_SESSION_REQUEST, MODAL_OPEN_SESSION_REQUEST} from "../actions/types";
import Modal from "../components/modal";
import SessionRequestForm from "../components/session-request-form";
import {sessionRequest} from "../actions/sessions";

const SessionRequest = ({onSubmit, id, topics, token, handleSubmit, openModal, closeModal, clear, modal}) => {
  return !token ?
    <Redirect to="/"/> :
    (<div>
        <button className="btn btn-block btn-lg btn-primary my-2" onClick={openModal}>Session Request</button>
        <Modal modal={modal} closeModal={closeModal}>
          <SessionRequestForm
            topics={topics}
            onSubmit={onSubmit}
            initialValues={{
              topic: 1,
              date: new Date()
            }}
          />
        </Modal>
      </div>
    );
};

const mapStateToProps = state => ({
  modal: state.modals.sessionRequest
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openModal: () => dispatch({type: MODAL_OPEN_SESSION_REQUEST}),
  closeModal: () => dispatch({type: MODAL_CLOSE_SESSION_REQUEST}),
  clear: () => dispatch(clearError()),
  onSubmit: values => sessionRequest(dispatch, values, ownProps.token, ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionRequest)
