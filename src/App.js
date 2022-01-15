import "./App.css";
import {
  DiscordMessages,
  DiscordSystemMessage,
} from "@skyra/discord-components-react";
import { useEffect, useState } from "react";
import messages from "./messages.json";
import { NeeshMessage } from "./NeeshMessage";
import Tooltip from "./Tooltip";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState([]);
  const [list, setList] = useState(messages.initial);
  const [prompts, setPrompts] = useState(messages.questions);
  const [typing, setTyping] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch("https://api.lanyard.rest/v1/users/297504183282565130").then(
      async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser({
              username: data.data.discord_user.username,
              id: data.data.discord_user.id,
              avatar: `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${data.data.discord_user.avatar}.webp?size=128`,
            });
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      }
    );
    async function sendNewMessages() {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTyping(false);
      setSent([...sent, list[sent.length]]);
    }
    if (sent.length === list.length || finished) {
      setFinished(true);
      setSent([...messages.initial, ...messages[0], ...messages[1], messages[2], ...messages[3]]);
      setTyping(false);
    } else {
      sendNewMessages();
    }
  }, [sent, finished, list]);

  if (!user) {
    return null;
  }

  const lastSent = document.getElementById("last-sent");
  if (lastSent) lastSent.scrollIntoView();

  return (
    <>
      {!error ? (
        <div className="parent">
          <div className="chat-header">
            <div className="channel">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="icon-2xnN2Y"
              >
                <path
                  fill="currentColor"
                  d="M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"
                ></path>
              </svg>
              <h3>discord-application</h3>
              <div className="channel-divider" />
              <span className="channel-desc">Built by Neesh with React</span>
            </div>
            <div className="toolbar">
              <button className="github">
                <a href="https://twitter.com/Neesh774">
                  <Tooltip content="Twitter" direction="bottom" delay="100">
                    <svg
                      version="1.1"
                      id="Logo"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 248 204"
                    >
                      <g id="Logo_1_">
                        <path
                          id="white_background"
                          class="st0"
                          d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
                        />
                      </g>
                    </svg>
                  </Tooltip>
                </a>
              </button>
              <button className="github">
                <a href="https://github.com/Neesh774">
                  <Tooltip content="Github" direction="bottom" delay="100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Tooltip>
                </a>
              </button>
              {!finished && (
                <button
                  className="skip"
                  onClick={() => {
                    if (!finished) {
                      setFinished(true);
                    }
                  }}
                  disabled={finished}
                  alt="Skip"
                >
                  <Tooltip content="Skip" direction="bottom" delay="100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                    </svg>
                  </Tooltip>
                </button>
              )}
            </div>
          </div>
          <div className="chat">
            <div className="scroller" role="group">
              <DiscordMessages>
                <div className="channel-header">
                  <div className="icon" />
                  <h1>Welcome to #discord-application!</h1>
                  <span>
                    This is the start of the #discord-application channel.
                  </span>
                </div>
                {sent.length > 0 && (
                  <div className="divider">
                    <span>{parseDate()}</span>
                  </div>
                )}
                <DiscordSystemMessage type="join">
                  Welcome, <i style={{ color: "#2ecc71" }}>{user.username}</i>.
                  We hope you brought pizza.
                </DiscordSystemMessage>
                {sent.map((message, index) => (
                  <NeeshMessage
                    content={message}
                    profile={user}
                    key={index}
                    last={false}
                    latest={index === sent.length - 1}
                    prompt={false}
                    list={list}
                    setList={setList}
                    prompts={prompts}
                    setPrompts={setPrompts}
                    setFinished={setFinished}
                    setSent={setSent}
                  />
                ))}
                {sent.length === list.length && (
                  <NeeshMessage
                    content={messages.prompt}
                    profile={user}
                    last={false}
                    latest={true}
                    prompt={true}
                    list={list}
                    setList={setList}
                    prompts={prompts}
                    setPrompts={setPrompts}
                    setFinished={setFinished}
                    setSent={setSent}
                  />
                )}
                {finished && prompts.length < 1 && (
                  <NeeshMessage
                    content={messages.finished}
                    profile={user}
                    last={true}
                    latest={true}
                    prompt={false}
                    list={list}
                    setList={setList}
                    prompts={prompts}
                    setPrompts={setPrompts}
                    setFinished={setFinished}
                    setSent={setSent}
                  />
                )}
              </DiscordMessages>
            </div>
          </div>
          <div className="footer">
            <div className="disabled">
              <span>
                You do not have permission to send messages in this channel.
              </span>
            </div>
            {typing ? (
              <div className="typing">
                <div className="typing_dot"></div>
                <div className="typing_dot"></div>
                <div className="typing_dot"></div>
                <span>
                  <b>{user.username}</b> is typing...
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="rip-parent">
          <img alt="404-RIP" className="rip-image" src="/404.svg" />
          <h3>Site Failed to Load</h3>
          <p>
            Try not to panic, it's probably already being fixed.
            <br />
            In the meantime, you should check out{" "}
            <a href="https://neesh.ilioslabs.dev">my personal website</a>.
          </p>
        </div>
      )}
    </>
  );
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parseDate = () => {
  const date = new Date();
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};