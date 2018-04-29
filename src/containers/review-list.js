import React, {Component} from "react";
import {connect} from "react-redux";
import {MODAL_CLOSE_REVIEWS, MODAL_OPEN_REVIEWS} from "../actions/types";
import Modal from "../components/modal";
import {Loading} from "../components/loading";
import {ReviewListItem} from "../components/review-list-item";

const average = reviews => {
  const len = reviews.length;
  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b, 0);
  return len >= 0 ? sum / len : 0;
};

class ReviewList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    const openModal = this.props.openModal;
    const closeModal = this.props.closeModal;
    const modal = this.props.modal;
    const reviews = this.props.reviews;

    if (!reviews || !closeModal || !openModal) {
      return <Loading/>;
    }

    return (
      <div>
        <button className="btn btn-block btn-primary btn-lg my-2" onClick={openModal}>See All Reviews</button>
        <span className="d-block label p-2 text-center">Average Rating: {average(reviews)}</span>
        <Modal modal={modal} closeModal={closeModal}>
          <h2>User Reviews</h2>
          <div className="divider"/>
          {reviews.map(review =>
            <ReviewListItem key={review.id} review={review}/>
          )}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modals.reviewList
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: () => ownProps.loadReviews(ownProps.instructorId),
  openModal: () => dispatch({type: MODAL_OPEN_REVIEWS}),
  closeModal: () => dispatch({type: MODAL_CLOSE_REVIEWS})
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)
