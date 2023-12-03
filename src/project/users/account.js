import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link,  useParams } from "react-router-dom";
function Account() {
  const { userId } = useParams();
  const [account, setAccount] = useState(null);
  const findUserById = async (userId) => {
    const user = await client.findUserById(userId);
    setAccount(user);
  };

  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };


  useEffect(() => {
    if (userId) {
        findUserById(userId);
      } else {
  
    fetchAccount();}
  }, []);
  return (
    <div className="w-50">
      <h1>Account</h1>
      <h1>{userId}</h1>
      {account && (
        <div>
          <input value={account.password}
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>
          <input value={account.firstName}
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/>
          <input value={account.lastName}
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/>
          <input value={account.dob}
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value })}/>
          <input value={account.email}
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/>
          <select onChange={(e) => setAccount({ ...account,
              role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          
        </div>
      )}
      <button onClick={save}>
     Save
  </button>
  <button onClick={signout}>
    Signout
  </button>
      <Link to="/project/admin/users" className="btn btn-warning w-100">
    Users
  </Link>

    </div>
  );
}
export default Account;