import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '~/store/ducks/search';

import { View, TextInput, ActivityIndicator } from 'react-native';
import SongList from '~/components/SongList';

import styles from './styles';
import { colors } from '~/styles';

class Search extends Component {
  static navigationOptions = {
    title: 'Buscar',
  };

  static propTypes = {
    searchRequest: PropTypes.func.isRequired,
    search: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
        }),
      ),
      loading: PropTypes.bool,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const { searchRequest } = this.props;
    this.searchRequest = debounce(searchRequest, 500);
  }

  state = {
    searchInput: '',
  };

  search = (searchInput) => {
    this.setState({ searchInput });
    this.searchRequest(searchInput);
  };

  render() {
    const { searchInput } = this.state;
    const { search } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar por músicas..."
            placeholderTextColor={colors.dark}
            underlineColorAndroid={colors.transparent}
            value={searchInput}
            onChangeText={this.search}
          />
        </View>
        {search.loading && (
          <ActivityIndicator size="small" color={colors.regular} style={styles.loading} />
        )}
        <SongList data={search.data} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
