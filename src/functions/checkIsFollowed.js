function checkIsFollowed(data, loggedUserId, setFollowed) {
  if (data?.followers) {
    const isExists = data.followers.indexOf(loggedUserId);
    if (isExists > -1) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }
}

export default checkIsFollowed;
