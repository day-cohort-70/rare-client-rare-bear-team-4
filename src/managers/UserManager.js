export const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users?id=${userId}`).then((res) =>
      res.json()
    )
  }