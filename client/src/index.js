document.addEventListener("DOMContentLoaded", () => {
  const username = document.querySelector("#username");
  const message = document.querySelector("#message");
  const messageArea = document.querySelector("#messages");


  // update the DOM with the new message array
  const updateMessages = (messages) => {
    // clear the message area
    messageArea.innerHTML = "";
    // add each message to the message area
    messages.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.innerHTML = `
        <div class="message">
          <p class="message-username"><b>${message.name}: </b>${message.message}</p>
        </div>
      `;
      messageArea.appendChild(messageDiv);
    });
  };

  // fetch all messages from the server
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const messages = await response.json();
      updateMessages(messages);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch messages every 2 seconds
  setInterval(fetchMessages, 2000);

  // create a new user
  let userId = null;
  // get the username form
  const usernameForm = document.querySelector("#username-form");
  usernameForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // if the username is empty, return
    if (username.value === "") return;
    try {
      // send a POST request to the server with the username
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.value }),
      });
      // get the user id from the response
      userId = await response.json();
      // remove the username form
      usernameForm.remove();
    } catch (error) {
      console.error(error);
    }
  });

  // create a new message
  const messageForm = document.querySelector("#message-form");
  messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // if the message is empty or the userId is null, return
    if (message.value === "") return;
    if (userId === null) return;
    // create the message data
    const messageData = {
      message: message.value,
      userId,
    };
    try {
      // send a POST request to the server with the message data
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      // update the displayed messages
      await fetchMessages();
    } catch (error) {
      console.error(error);
    }
  });
});