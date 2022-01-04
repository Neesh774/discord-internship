import "./App.css";
import {
  DiscordMessages,
  DiscordMessage,
  DiscordAttachments,
  DiscordActionRow,
  DiscordButton,
  DiscordSystemMessage,
} from "@skyra/discord-components-react";
import { useEffect, useState } from "react";
import messages from "./messages.json";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState([]);
  const [typing, setTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speed, setSpeed] = useState(1);

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
    if (sent.length === messages.length || finished) {
      setFinished(true);
      setSent(messages);
      setTyping(false);
    } else {
      if (speed !== -1) {
        new Promise((resolve) => {
          setTimeout(resolve, 1500 / speed);
        }).then(() => {
          setTyping(true);
          new Promise((resolve) => {
            setTimeout(resolve, 500 / speed);
          }).then(() => {
            if (!finished) {
              setSent([...sent, messages[sent.length]]);
              setTyping(false);
            }
          });
        });
      }
    }
  }, [sent, finished, speed]);

  if (!user) {
    return null;
  }

  return (
    <>
      {!error ? (
        <div className="parent">
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
                  Welcome, <i style={{ color: "#2ecc71" }}>{user.username}</i>. We hope
                  you brought pizza.
                </DiscordSystemMessage>
                {sent.map((message, index) => (
                  <NeeshMessage
                    content={message}
                    profile={user}
                    key={index}
                    last={index === messages.length - 1}
                  />
                ))}
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
      <div className="overlay">
        <button className="github">
          <a href="https://github.com/Neesh774">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </button>
        <button
          className={`skip ${finished ? "disabled-button" : ""}`}
          onClick={() => {
            if (!finished) {
              setFinished(true);
            }
          }}
          disabled={finished}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
          </svg>
        </button>
        <button
          className={`speed ${finished ? "disabled-button" : ""}`}
          onClick={() => {
            switch (speed) {
              case 1:
                setSpeed(2);
                break;
              case 2:
                setSpeed(-1);
                break;
              case -1:
                setSpeed(1);
                break;
              default:
                break;
            }
          }}
          disabled={finished}
        >
          {speed === -1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clip-rule="evenodd"
              />
            </svg>
          ) : speed === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

const NeeshMessage = ({ profile, content, last }) => {
  if (!profile || !content) {
    return;
  }
  return (
    <DiscordMessage
      author={profile.username}
      avatar={profile.avatar}
      roleColor="#2ecc71"
    >
      {renderText(content)}
      {last ? (
        <DiscordAttachments>
          <DiscordActionRow>
            <DiscordButton
              type="primary"
              onClick={() => {
                var link = document.createElement("a");
                // If you don't know the name or want to use
                // the webserver default set name = ''
                link.setAttribute("download", "Kanishq's_Cover_Letter.pdf");
                link.href = "/Discord_Internship_Cover_Letter.pdf";
                document.body.appendChild(link);
                link.click();
                link.remove();
              }}
            >
              Download Cover Letter
            </DiscordButton>
            <DiscordButton url="https://neesh.ilioslabs.dev/resume">
              Resume
            </DiscordButton>
            <DiscordButton url="https://github.com/Neesh774">
              Github
            </DiscordButton>
            <DiscordButton url="https://www.linkedin.com/in/kanishqk/">
              LinkedIn
            </DiscordButton>
          </DiscordActionRow>
        </DiscordAttachments>
      ) : (
        ""
      )}
    </DiscordMessage>
  );
};

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

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const renderText = (txt) =>
  txt
    .split(" ")
    .map((part) =>
      URL_REGEX.test(part) ? <a href={part}>{part} </a> : part + " "
    );
