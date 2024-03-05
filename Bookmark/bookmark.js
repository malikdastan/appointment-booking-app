window.addEventListener("DOMContentLoaded", () => {
    // Preventing the data from getting wiped off from the window while DOM reloads
    axios
      .get(
        "https://crudcrud.com/api/ad2dbdf80c764c75975c473e5dfe4997/bookmark"
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
    const usernameInput = document.getElementById("websitename");
    const emailInput = document.getElementById("url");
  
    const userDetails = {
      username: usernameInput.value,
      email: emailInput.value,
    };
  
    // If a user ID is present, it's an edit, so use PUT, otherwise use POST
    const requestMethod = userDetails._id ? "put" : "post";
    const apiUrl = userDetails._id
      ? `https://crudcrud.com/api/ad2dbdf80c764c75975c473e5dfe4997/bookmark/${userDetails._id}`
      : "https://crudcrud.com/api/ad2dbdf80c764c75975c473e5dfe4997/bookmark";
  
    // Posting the payload to the server
    axios[requestMethod](apiUrl, userDetails)
      .then((response) => {
        displayUserOnScreen(response.data);
        // Clearing the input fields after successful submission
        usernameInput.value = "";
        emailInput.value = "";
      })
      .catch((error) => console.log(error));
  }
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.style.marginTop = "10px";
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
    deleteBtn.style.marginLeft = "10px";
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
    editBtn.style.marginLeft = "10px";
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {

        // Remove from UI
        userList.removeChild(event.target.parentElement);
  
        // Remove from server
        axios
          .delete(
            `https://crudcrud.com/api/ad2dbdf80c764c75975c473e5dfe4997/bookmark/${userDetails._id}`
          )
          .then(() => console.log("User deleted from server"))
          .catch((error) => console.log(error));
      
    });
  
    editBtn.addEventListener("click", function (event) {
      // Populate input fields for editing
      document.getElementById("websitename").value = userDetails.username;
      document.getElementById("url").value = userDetails.email;
      // Remove from server
      axios
        .delete(
          `https://crudcrud.com/api/ad2dbdf80c764c75975c473e5dfe4997/bookmark/${userDetails._id}`
        )
        .then(() => console.log("User deleted from server"))
        .catch((error) => console.log(error));
  
  
      // Remove the current user from the UI (it will be re-added on form submission)
      userList.removeChild(event.target.parentElement);
    });
  }