import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaMastodon,
} from "react-icons/fa6";
import { SiBluesky, SiDailydotdev } from "react-icons/si";

const socialLinks = [
  {
    href: "https://www.facebook.com/manishgoletamang",
    label: "Facebook",
    icon: <FaFacebook color="#1877F3" size={28} />,
  },
  {
    href: "https://www.instagram.com/golecodes/",
    label: "Instagram",
    icon: <FaInstagram color="#E4405F" size={28} />,
  },
  {
    href: "https://x.com/intent/user?screen_name=Manishtamangxyz",
    label: "X (Twitter)",
    icon: <FaXTwitter color="#000000" size={28} />,
  },
  {
    href: "https://www.linkedin.com/in/manish-tamang/",
    label: "LinkedIn",
    icon: <FaLinkedin color="#0A66C2" size={28} />,
  },
  {
    href: "https://github.com/Manish-Tamang",
    label: "GitHub",
    icon: <FaGithub color="#333" size={28} />,
  },
  {
    href: "https://app.daily.dev/manishtamang",
    label: "daily.dev",
    icon: <SiDailydotdev color="#131416" size={28} />,
  },
  {
    href: "https://www.youtube.com/@golecodes",
    label: "YouTube",
    icon: <FaYoutube color="#FF0000" size={28} />,
  },
  {
    href: "https://mastodon.social/@manishtamang",
    label: "Mastodon",
    icon: <FaMastodon color="#6364FF" size={28} />,
  },
  {
    href: "https://bsky.app/profile/manishtamang.bsky.social",
    label: "Bluesky",
    icon: <SiBluesky color="#1185FF" size={28} />,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3 justify-start items-center my-4">
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="hover:scale-110 transition-transform"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
