const firebaseConfig = {
    apiKey: "AIzaSyCvBjl8aFHUbhmzTNB7ADRyR0gg5E0dqmU",
    authDomain: "modelagemdedados-8bb6b.firebaseapp.com",
    projectId: "modelagemdedados-8bb6b",
    storageBucket: "modelagemdedados-8bb6b.firebasestorage.app",
    messagingSenderId: "700559412106",
    appId: "1:700559412106:web:54b97c83c3d29638125673"
  };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Cadastro
window.register = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      set(ref(db, "users/" + uid), {
        email: email,
        role: role
      });

      alert("Usuário criado!");
    });
};

// Login
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      get(child(ref(db), "users/" + uid)).then((snapshot) => {
        const role = snapshot.val().role;

        if (role === "admin") {
          loadAdminView();
        } else {
          loadUserView();
        }
      });
    });
};

function loadAdminView() {
  document.body.innerHTML = `
    <h1>ADMIN</h1>
    <button onclick="getAdminData()">Ver admin-data</button>
  `;
}

function loadUserView() {
  document.body.innerHTML = `
    <h1>USER</h1>
    <button onclick="getUserData()">Ver meus dados</button>
  `;
}

window.getAdminData = function () {
  get(ref(db, "admin-data")).then(snapshot => {
    alert(JSON.stringify(snapshot.val()));
  });
};

window.getUserData = function () {
  const uid = auth.currentUser.uid;
  get(ref(db, "user-data/" + uid)).then(snapshot => {
    alert(JSON.stringify(snapshot.val()));
  });
};