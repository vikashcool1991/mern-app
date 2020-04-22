module.exports = {
  regexQuery: (field, value) => {
    const ret = {};
    ret[field] = {
      $regex: value,
      $options: 'i',
    };
    return ret;
  },
  excludeFields: (...fields) => fields.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {}),
};