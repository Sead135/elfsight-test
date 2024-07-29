export const getStatusColor = (status = '') => {
  return {
    alive: '#008000',
    dead: '#ff0000',
    unknown: '#808080'
  }[status];
};
