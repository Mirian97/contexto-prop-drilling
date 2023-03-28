import { useEffect, useState } from 'react';
import useUser from "../../hooks/useUser";
import './styles.css';

function UsersRegister() {
  const { userInEditing, setUserInEditing, usersData, setUsersData } = useUser();

  const [localName, setLocalName] = useState('');
  const [localAge, setLocalAge] = useState('');

  useEffect(() => {
    if (userInEditing) {
      setLocalName(userInEditing.name);
      setLocalAge(userInEditing.age);
      return;
    }

    setLocalName('');
    setLocalAge('');
  }, [userInEditing]);

  async function handleRegisterUser() {

    if (!localName || !localAge) {
      return;
    }

    const lastItem = usersData.length ? usersData[usersData.length - 1].id + 1 : 1;

    setUsersData([...usersData, { id: lastItem, name: localName, age: localAge }]);

    setLocalName('');
    setLocalAge('');
  }

  async function handleEditUser() {

    if (!localName || !localAge) {
      return;
    }
    const localUsersData = [...usersData];

    const currentUser = localUsersData.find(item => item.id === userInEditing.id);

    currentUser.name = localName;
    currentUser.age = localAge;

    setUsersData(localUsersData);

    setUserInEditing(false);
  }

  return (
    <div className="left">
      <h1>{userInEditing ? 'Editando' : 'Adicionar'} usuário</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setLocalName(e.target.value)}
        value={localName}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setLocalAge(e.target.valueAsNumber)}
        value={localAge}
      />
      <button onClick={() =>
        userInEditing
          ? handleEditUser()
          : handleRegisterUser()}
      >
        {userInEditing ? 'Editar' : 'Adicionar'}
      </button>
      {userInEditing && <button onClick={() => setUserInEditing(false)}>Cancelar</button>}
    </div>
  );
}

export default UsersRegister;