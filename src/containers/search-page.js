import React, {Component} from "react";
import {connect} from "react-redux";
import {InstructorCard} from "../components/instructor-card";
import {Loading} from "../components/loading";
import {filter, searchByUrl} from "../actions/search";
import SearchFilter from "../components/search-filter";

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
    const filter = this.props.filter;

    if (!results || !search || !filter) {
      return <Loading/>;
    }

    return (
      <div className="columns mt-3">
        <div className="column col-3">
          <div className="column col-9 centered white-bg shadowed p-3">
            <h3>Filters</h3>
            <div className="divider"/>
            <SearchFilter onSubmit={filter}/>
          </div>
        </div>
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
  search: () => searchByUrl(dispatch, "/search" + ownProps.location.search),
  filter: values => dispatch(filter(values, "/search" + ownProps.location.search))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
