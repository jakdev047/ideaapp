const truncateContent = (content,number) => {
  if( content.length < number ){
    return content;
  }
  else{
    return content.slice(0,number) + '...';
  }
};

const compareValues = (value1,value2) => {
  return value1 === value2 && 'selected';
};

const comparePath = (lPath,rPath) => {
  return lPath === rPath && 'active';
};

module.exports = {
  truncateContent,
  compareValues,
  comparePath
}