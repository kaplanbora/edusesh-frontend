import React, {Component} from "react";
import {connect} from "react-redux";
import Modal from "../components/modal";
import {UserReview} from "../components/user-review";
import {CreateReview} from "../components/create-review";
import {MODAL_CLOSE_REVIEW, MODAL_OPEN_REVIEW} from "../actions/types";
import {createReview, loadReview} from "../actions/review";

class SessionReview extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    const userRole = this.props.userRole;
    const review = this.props.review;
    const open = this.props.openModal;
    const close = this.props.closeModal;
    const isOpen= this.props.modal;

    return (
      <div>
        {userRole === "instructor" &&
        <button className="btn btn-primary btn-block" onClick={open}>See User Review</button>}
        {userRole === "trainee" &&
        <button className="btn btn-primary btn-block" onClick={open}>Review Session</button>}
        <Modal modal={isOpen} closeModal={close}>
          {userRole === "instructor" &&
          <UserReview review={review}/>}
          {userRole === "trainee" &&
          <CreateReview review={review}/>}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  review: state.review,
  modal: state.modal.review
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: () => dispatch(loadReview(ownProps.token, ownProps.sessionId)),
  create: values => dispatch(createReview(ownProps.token, ownProps.sessionId, values)),
  openModal: () => dispatch({type: MODAL_OPEN_REVIEW}),
  closeModal: () => dispatch({type: MODAL_CLOSE_REVIEW})
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionReview);
