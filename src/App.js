import "./App.css";
import {
  DiscordMessages,
  DiscordMessage,
  DiscordAttachments,
  DiscordActionRow,
  DiscordButton,
} from "@skyra/discord-components-react";
import { useEffect, useState } from "react";
import messages from "./messages.json";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState([]);
  const [typing, setTyping] = useState(false);

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
    if (sent.length < messages.length) {
      new Promise((resolve) => {
        setTimeout(resolve, 500);
      }).then(() => {
        setTyping(true);
        new Promise((resolve) => {
          setTimeout(resolve, 500);
        }).then(() => {
          setSent([...sent, messages[sent.length]]);
          setTyping(false);
        });
      });
    }
  }, [sent]);

  if (!user) {
    return null;
  }

  return (
    <>
      {!error ? (
        <div className="parent">
          <div className="chat">
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
            <DiscordMessages>
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
                link.setAttribute("download", 'Kanishq\'s_Cover_Letter.pdf');
                link.href = '/Discord_Internship_Cover_Letter.pdf';
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
