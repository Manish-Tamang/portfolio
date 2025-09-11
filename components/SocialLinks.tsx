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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    href: "https://bsky.app/profile/manishtamang.com",
    label: "Bluesky",
    icon: <SiBluesky color="#1185FF" size={28} />,
  },
];

export default function SocialLinks() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-3 justify-start items-center my-4">
        {socialLinks.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="hover:scale-110 transition-all duration-300 hover:rotate-3 hover:shadow-lg hover:shadow-gray-400/20 dark:hover:shadow-gray-600/20"
              >
                {link.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent className="rounded-[4px]">
              <p className="font-medium">{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
