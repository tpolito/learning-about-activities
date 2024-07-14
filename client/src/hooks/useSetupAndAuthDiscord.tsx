import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useEffect, useState } from "react";

type AuthResponse = {
  access_token: string;
  user: {
    username: string;
    discriminator: string;
    id: string;
    public_flags: number;
    avatar?: string | null | undefined;
    global_name?: string | null | undefined;
  };
  scopes: (
    | -1
    | "identify"
    | "email"
    | "connections"
    | "guilds"
    | "guilds.join"
    | "guilds.members.read"
    | "gdm.join"
    | "bot"
    | "rpc"
    | "rpc.notifications.read"
    | "rpc.voice.read"
    | "rpc.voice.write"
    | "rpc.video.read"
    | "rpc.video.write"
    | "rpc.screenshare.read"
    | "rpc.screenshare.write"
    | "rpc.activities.write"
    | "webhook.incoming"
    | "messages.read"
    | "applications.builds.upload"
    | "applications.builds.read"
    | "applications.commands"
    | "applications.commands.permissions.update"
    | "applications.commands.update"
    | "applications.store.update"
    | "applications.entitlements"
    | "activities.read"
    | "activities.write"
    | "relationships.read"
    | "relationships.write"
    | "voice"
    | "dm_channels.read"
    | "role_connections.write"
    | "presences.read"
    | "presences.write"
    | "openid"
    | "dm_channels.messages.read"
    | "dm_channels.messages.write"
    | "gateway.connect"
    | "account.global_name.update"
    | "payment_sources.country_code"
  )[];
  expires: string;
  application: {
    id: string;
    description: string;
    name: string;
    icon?: string | null | undefined;
    rpc_origins?: string[] | undefined;
  };
};

export const useSetupAndAuthDiscord = () => {
  const [auth, setAuth] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const discordSDK = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

    async function setupAndAuthDiscordSdk() {
      try {
        await discordSDK.ready();
        console.log("Discord SDK is ready");

        const { code } = await discordSDK.commands.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          state: "",
          prompt: "none",
          scope: ["identify", "guilds"],
        });

        const response = await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const responseJson = await response.json();
        const { access_token } = responseJson;
        const authResult = await discordSDK.commands.authenticate({
          access_token,
        });

        if (!authResult) {
          throw new Error("Failed to authenticate");
        }

        setAuth(authResult);
        console.log("Discord SDK is authenticated");
      } catch (e) {
        if (typeof e === "string") {
          console.error("Error setting up Discord SDK", e);
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    }

    setupAndAuthDiscordSdk();
  }, []);

  return { auth, isLoading, error };
};
