function formatDateMsByMS(millisecond) {
  return moment(new Date(millisecond)).format('mm:ss');
}

export {formatDateMsByMS}