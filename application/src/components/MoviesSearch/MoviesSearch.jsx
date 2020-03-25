import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './MoviesSearchHoc';

class MoviesSearch extends React.Component {

  render() {
    const { classes, handleChange, handleSearch, name } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
            onChange={handleChange('name')}
            onKeyPress={(e)=> handleSearch(e)}
          placeholder="Search…"
            value = {name}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
};

export default withHocs(MoviesSearch);
