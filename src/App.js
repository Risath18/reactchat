import React, { useEffect, useState } from "react";

import Amplify from "@aws-amplify/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import "@aws-amplify/pubsub";

import { createMessage } from "./graphql/mutations";
import { onCreateMessage } from "./graphql/subscriptions";
import { messagesByChannelID } from "./graphql/queries";

import * as mutations from "./graphql/mutations";

import awsExports from "./aws-exports";
import "./App.css";
import SelectAuthor from "./SelectAuthor.js";

Amplify.configure(awsExports);

function App() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [currentAuthor, setAuthor] = useState("");
  const [currentRecipient, setRecipient] = useState("");
  const [showChat, setShowChat] = useState(false);

  // var currentAuthor = "Jupiter";
  const myChannelID = "1";

  //Initial Render of pre-existing Messages
  useEffect(() => {
    API.graphql(
      graphqlOperation(
        messagesByChannelID, //Identify source query
        //  { id: "body" },
        { channelID: myChannelID }
        //  { sortDirection: "ASC" }
      )
    ).then((response) => {
      //With returned query result, display the messages
      const theMessage = response.data.messagesByChannelID.items;
      //   if (theMessage) {
      setMessages(theMessage); //CHange the message
      // }
    });
  }, []);

  //For New Messages
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (event) => {
        setMessages([...messages, event.value.data.onCreateMessage]); //... messages appends pre-existing messages and appends a new message.
      },
    });

    return () => {
      subscription.unsubscribe(); //always un subscribe afterwords
    };
  }, [messages]); //messages is dependency. When this changes, effect is executed

  //Body that contains new message
  const handleChange = (event) => {
    setMessageBody(event.target.value);
  };

  //When Submit is Pressed (Enter button on keyboard)
  const handleSubmit = async (event) => {
    event.preventDefault(); //Prevent reload on site
    event.stopPropagation(); //Prevent same to be acalled quickly

    //Sample Author Tag
    const input = {
      channelID: myChannelID,
      author: currentAuthor,
      body: messageBody.trim(), //so no white spaces go through.
    };

    //Re sets messageBody and sends mutation to database
    try {
      await API.graphql(graphqlOperation(mutations.createMessage, { input }));
      setMessageBody("");
    } catch (error) {
      console.warn(error);
    }
  };

  const setJupiterAuthor = () => {
    setAuthor("Jupiter");
    setRecipient("Earth");
  };

  const setEarthAuthor = () => {
    setAuthor("Earth");
    setRecipient("Jupiter");
  };

  const showChatHandler = () => {
    setShowChat(true);
  };

  return (
    <div className="container">
      <SelectAuthor
        onJupiter={setJupiterAuthor}
        onEarth={setEarthAuthor}
        chatVisibility={showChatHandler}
      />
      <div className="recipient">{currentRecipient}</div>
      <div className="messages">
        {showChat && (
          <div className="messages-scroller">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.author === currentAuthor ? "message me" : "message"
                }
              >
                {message.body}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chat-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Type your message here..."
            onChange={handleChange}
            value={messageBody}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
