from app.utils import decrypt_api_key

class GitHubAgent:
    def __init__(self, config, tool_config):
        self.api_token = decrypt_api_key(tool_config["api_key"])
        self.repo = config.get("repo_name", "")

    def summarize_prs(self):
        # Simulate response (replace with real API call later)
        return f"PR Summary for repository {self.repo}: 3 open PRs found."
