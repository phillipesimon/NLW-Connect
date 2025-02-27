const app = document.getElementById("app");
const users = [
  {
    email: "john.doe@example.com",
    phone: "123-456-7890",
    ref: 100,
    refBy: null,
  },
  {
    email: "jane.doe@example.com",
    phone: "987-654-3210",
    ref: 200,
    refBy: 100,
  },
  {
    email: "mark.doe@example.com",
    phone: "555-555-5555",
    ref: 300,
    refBy: 100,
  },
];

const getUser = (userData) => {
  return users.find((users) => {
    return users.email === userData.email;
  });
};

const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy === userData.ref;
  });
  return subs.length;
};

const showInvite = (userData) => {
  app.innerHTML = `
  <input type="text" id="link" value="https://evento.com?ref=${
    userData.ref
  }" disabled>
  <div id="stats">
  <h4>
  ${getTotalSubscribers(userData)} subscribers
  </h4>
  <p>
  Inscrições feitas
  </p>
  </div>
  `;
};

const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 200),
    refBy: 100,
  };
  users.push(newUser);
  console.log("User saved:", newUser);
  return newUser;
};

const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const user = getUser(userData);
    if (user) {
      showInvite(user);
    } else {
      const newUser = saveUser(userData);
      showInvite(newUser);
    }
  };
};

const startApp = () => {
  const content = `
    <form id="form">
    <input type="email" name="email" placeholder="e-mail">
    <input type="text" name="phone" placeholder="telefone">
    <button>Confirmar</button>
  </form>
    `;
  app.innerHTML = content;
  formAction();
};
startApp();

document.getElementById("logo").onclick = () => startApp();
