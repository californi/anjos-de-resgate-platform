import type { MetadataRoute } from "next";
import { siteContent } from "@anjos/shared";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContent.organization.platformName,
    short_name: siteContent.organization.shortName,
    description: "Portal inicial para divulgacao e gestao de animais.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fbf9",
    theme_color: "#218767"
  };
}
