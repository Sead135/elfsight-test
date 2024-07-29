export const getStatusColor = (status = '') => {
  const formatStatus = status.toLowerCase();
  return {
    alive: '#008000',
    dead: '#ff0000',
    unknown: '#808080'
  }[formatStatus];
};
