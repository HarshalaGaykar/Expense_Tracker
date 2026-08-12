function UserInfo({ user, logoutUser }) {
  return (
    <div className="box">
      <p>Welcome, {user.fullName}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default UserInfo;
