const truncateContent = (content,number) => {
  if( content.length < number ){
    return content;
  }
  else{
    return content.slice(0,number) + '...';
  }
}

module.exports = {
  truncateContent
}