import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { colors } from '~/styles';

const SongItem = ({ song, player, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.info}>
      <Text style={[styles.title, player.currentSong.id === song.id ? styles.active : {}]}>
        {song.title}
      </Text>
      <Text style={styles.author}>{song.author}</Text>
    </View>
    {player.loadingId === song.id ? (
      <ActivityIndicator size="small" color={colors.regular} styles={styles.loading} />
    ) : (
      <Icon name="play-circle-outline" size={24} style={styles.play} />
    )}
  </TouchableOpacity>
);

SongItem.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  player: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(SongItem);
