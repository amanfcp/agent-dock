from app.utils import decrypt_api_key

class SlackAgent:
    def __init__(self, config, tool_config):
        self.api_token = decrypt_api_key(tool_config["api_key"])
        self.channel = config.get("channel", "general")

    def send_message(self, message: str):
        # Simulate Slack API message send
        return f"Message sent to Slack channel {self.channel}: {message}"