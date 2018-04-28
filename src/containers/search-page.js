import React,{Component} from "react";
import {connect} from "react-redux";
import {InstructorCard} from "../components/instructor-card";
import {Loading} from "../components/loading";
import {searchByUrl} from "../actions/search";

class SearchPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.search();
  }

  render() {
    const results = this.props.results;
    const search = this.props.search;

    if (!results || !search) {
      return <Loading/>;
    }

    return (
      <div className="columns">
        <div className="column col-3"/>
        <div className="column col-9">
          <div className="card-container">
            {results.map(instructor =>
              <InstructorCard key={instructor.userId} instructor={instructor}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.searchResults
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: () => searchByUrl(dispatch, "/search" + ownProps.location.search)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
