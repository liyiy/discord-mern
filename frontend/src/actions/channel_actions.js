import * as ChannelApiUtil from '../util/channel_api_util';
import { RECEIVE_SERVER } from './server_actions';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const receiveChannels = payload => {
  return {
    type: RECEIVE_CHANNELS,
    payload
  };
};

export const receiveChannel = payload => {
  return {
    type: RECEIVE_CHANNEL,
    payload
  };
};

export const removeChannel = payload => {
  return {
    type: REMOVE_CHANNEL,
    payload
  };
};

export const fetchChannels = (serverId) => dispatch => {
  return ChannelApiUtil.fetchChannels(serverId._id)
    .then(response => dispatch(receiveChannels(response)));
};

export const fetchChannel = channelId => dispatch => {
  return ChannelApiUtil.fetchChannel(channelId)
    .then(response => dispatch(receiveChannel(response)));
};

export const createChannel = channelData => dispatch => {
  return ChannelApiUtil.createChannel(channelData)
    .then(response => dispatch(receiveChannel(response)));
};

export const deleteChannel = channelId => dispatch => {
  return ChannelApiUtil.deleteChannel(channelId)
    .then(response => dispatch(removeChannel(response)));
};