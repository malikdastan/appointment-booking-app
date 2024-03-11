window.addEventListener("DOMContentLoaded", () => {
  // Preventing the data from getting wiped off from the window while DOM reloads
  axios
    .get(
      "https://crudcrud.com/api/352048f014644216a433fdfdf104382f/sharpeners"
    )
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function handleFormSubmit(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const userDetails = {
    username: usernameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  };

  // If a user ID is present, it's an edit, so use PUT, otherwise use POST
  const requestMethod = userDetails._id ? "put" : "post";
  const apiUrl = userDetails._id
    ? `https://crudcrud.com/api/352048f014644216a433fdfdf104382f/sharpeners/${userDetails._id}`
    : "https://crudcrud.com/api/352048f014644216a433fdfdf104382f/sharpeners";

  // Posting the payload to the server
  axios[requestMethod](apiUrl, userDetails)
    .then((response) => {
      displayUserOnScreen(response.data);
      // Clearing the input fields after successful submission
      usernameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
    })
    .catch((error) => console.log(error));
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      // Remove from UI
      userList.removeChild(event.target.parentElement);

      // Remove from server
      axios
        .delete(
          `https://crudcrud.com/api/352048f014644216a433fdfdf104382f/sharpeners/${userDetails._id}`
        )
        .then(() => console.log("User deleted from server"))
        .catch((error) => console.log(error));
    }
  });

  editBtn.addEventListener("click", function (event) {
    // Populate input fields for editing
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
    // Remove from server
    axios
      .delete(
        `https://crudcrud.com/api/352048f014644216a433fdfdf104382f/sharpeners/${userDetails._id}`
      )
      .then(() => console.log("User deleted from server"))
      .catch((error) => console.log(error));


    // Remove the current user from the UI (it will be re-added on form submission)
    userList.removeChild(event.target.parentElement);
  });
}