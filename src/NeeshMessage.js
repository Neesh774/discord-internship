import {
  DiscordMessage,
  DiscordAttachments,
  DiscordActionRow,
  DiscordButton,
  DiscordCommand,
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
} from "@skyra/discord-components-react";
import highlight from "highlight.js";
import "highlight.js/styles/base16/solarized-dark.css";
import { useEffect } from "react";
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const renderText = (txt) =>
  txt.startsWith("code") ? (
    <code
      dangerouslySetInnerHTML={{
        __html: highlight.highlightAuto(txt.substring(4)).value,
      }}
    ></code>
  ) : (
    txt
      .split(" ")
      .map((part) =>
        URL_REGEX.test(part) ? <a href={part}>{part} </a> : part + " "
      )
  );

export const NeeshMessage = ({ profile, content, last, latest }) => {
  useEffect(() => {
    highlight.highlightAll();
  });
  if (!profile || !content) {
    return;
  }
  return (
    <DiscordMessage
      author={content.type === "command" ? content.bot : profile.username}
      avatar={content.type === "command" ? content.avatar : profile.avatar}
      roleColor="#2ecc71"
      className={typeof content === 'string' && content.includes("code") ? "code" : ""}
      id={latest ? "last-sent" : ""}
    >
      {typeof content === "string" ? (
        renderText(content)
      ) : content.type === "command" ? (
        <DiscordCommand
          slot="reply"
          author={profile.username}
          avatar={profile.avatar}
          roleColor="#2ecc71"
          command={content.command}
        ></DiscordCommand>
      ) : (
        ""
      )}
      {typeof content.response === "object" ? (
        <DiscordEmbed
          slot="embeds"
          color="#5663f3"
          embedTitle={content.response.title}
          thumbnail={content.response.thumbnail}
        >
          {content.response.description}
          <DiscordEmbedFields slot="fields">
            {content.response.fields.map((field) => (
              <DiscordEmbedField
                key={field.name}
                fieldTitle={field.name}
                inline={field.inline}
                inlineIndex={field.inline ? field.inlineIndex : 1}
              >
                {field.value}
              </DiscordEmbedField>
            ))}
          </DiscordEmbedFields>
        </DiscordEmbed>
      ) : (
        ""
      )}
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
