const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const notesAPI = {
  getNotes: () => {
    return fetch(URL).then((response) => response.json());
  },

  addNote: (note) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(note),
    }).then((response) => response.json());
  },

  deleteNote: (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
  },

  toggleNote: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },

  updateNote: (id, newTitle) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ title: newTitle }),
    });
  }
};

export default notesAPI;
