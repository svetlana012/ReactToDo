const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ошибка: ${response.status}`);
  }

  return response;
};

const notesAPI = {
  getNotes: () => {
    return fetch(URL)
      .then(checkResponse)
      .then((response) => response.json());
  },

  addNote: (note) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(note),
    })
      .then(checkResponse)
      .then((response) => response.json());
  },

  deleteNote: (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    }).then(checkResponse);
  },

  toggleNote: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    }).then(checkResponse);
  },

  updateNote: (id, newTitle) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ title: newTitle }),
    }).then(checkResponse);
  },
};

export default notesAPI;
