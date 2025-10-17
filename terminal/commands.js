import open from "open";
import { ABOUT, CONTACTS, FULL_NAME, COLORS } from "../data.js";
import termkit from "terminal-kit";

const { terminal: term } = termkit;

export function processCommand(command) {
  const cmd = command.trim().toLowerCase();
  const parts = cmd.split(" ");

  switch (parts[0]) {
    case "hello":
    case "hi":
      return `Hello, I'm ${FULL_NAME}. Type 'help' to see available commands.`;

    case "about":
      return getWhoami();

    case "help":
      return getHelp();

    case "whoami":
      return getWhoami();

    case "clear":
    case "cls":
      return { action: "clear" };

    case "open":
      return handleOpen(parts[1]);

    case "ls":
    case "list":
      return listCommands();

    case "skills":
      return { action: "changeTab", tab: "Skills" };

    case "experience":
    case "exp":
      return { action: "changeTab", tab: "Experience" };

    case "projects":
    case "proj":
      return { action: "changeTab", tab: "Projects" };

    case "home":
      return { action: "changeTab", tab: "Home" };

    case "contact":
    case "contacts":
      return getContacts();

    case "email":
      open(`mailto:${CONTACTS.email}`);
      return `Opening email client for ${CONTACTS.email}...`;

    case "website":
      open(`https://${CONTACTS.website}`);
      return `Opening website...`;

    case "social":
      return getSocialLinks();

    case "search":
      return `Search feature: ${parts.slice(1).join(" ") || "No search term provided"}`;

    case "theme":
      return `Available themes: dark, neon, ocean (theme switching coming soon!)`;

    case "exit":
    case "quit":
      return { action: "exit" };

    case "chat":
      return Chat();

    default:
      if (cmd.length === 0) {
        return "";
      }
      return `Command not found: ${cmd}. Type 'help' for available commands.`;
  }
}

function Chat() {
  open(`https://t.me/${CONTACTS.telegram}`);
  return "Opening Telegram in browser...";
}

function handleOpen(target) {
  if (!target) {
    return "Usage: open [resume|github|linkedin|x]";
  }

  switch (target) {
    case "resume":
      open(`https://${CONTACTS.resume}`);
      return "Opening resume in browser...";

    case "github":
      open(`https://github.com/${CONTACTS.github}`);
      return "Opening GitHub profile in browser...";

    case "linkedin":
      open(`https://linkedin.com/in/${CONTACTS.linkedin}`);
      return "Opening LinkedIn profile in browser...";

    case "x":
    case "twitter":
      open(`https://x.com/${CONTACTS.x}`);
      return "Opening X profile in browser...";

    default:
      return `Cannot open '${target}'. Valid options are: resume, github, linkedin, x`;
  }
}

function getWhoami() {
  return ABOUT;
}

function getHelp() {
  return [
    "whoami              Display my information",
    "about               Learn more about me",
    "contact/contacts    Show contact information",
    "email               Open email client",
    "website             Open my website",
    "social              Show social media links",
    "open [option]       Open in browser (resume, github, linkedin, x)",
    "skills              Go to Skills tab",
    "experience/exp      Go to Experience tab",
    "projects/proj       Go to Projects tab",
    "home                Go to Home tab",
    "theme               Show available themes",
    "search [term]       Search functionality",
    "clear/cls           Clear the terminal",
    "list                List all commands",
    "exit/quit           Exit the application",
    "chat                Chat with me on Telegram",
  ].join("\n");
}

function listCommands() {
  return "Available commands: help, whoami, about, contact, email, website, social, open, clear, list, skills, experience, projects, home, theme, search, exit, chat";
}

function getContacts() {
  const contactLines = [
    `Email:    ${CONTACTS.email}`,
    `Website:  ${CONTACTS.website}`,
    `GitHub:   github.com/${CONTACTS.github}`,
    `LinkedIn: linkedin.com/in/${CONTACTS.linkedin}`,
    `X:        x.com/${CONTACTS.x}`,
    `Telegram: t.me/${CONTACTS.telegram}`,
  ];
  return contactLines.join("\n");
}

function getSocialLinks() {
  const socialLinks = [
    `GitHub:   https://github.com/${CONTACTS.github}`,
    `LinkedIn: https://linkedin.com/in/${CONTACTS.linkedin}`,
    `X:        https://x.com/${CONTACTS.x}`,
    `Telegram: https://t.me/${CONTACTS.telegram}`,
  ];
  return socialLinks.join("\n");
}
