# 🚀 Kite MCP Server

This project exposes Zerodha Kite APIs (profile, holdings, order placement) as an MCP (Model Context Protocol) server, so that Claude Desktop (or any MCP client) can interact with your trading account programmatically.

Built with [Bun](https://bun.sh) + Model Context Protocol SDK.

---

## 📦 Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd kite-test
bun install
```

### 2. Create a Kite Trade App

- Go to [developers.kite.trade](https://developers.kite.trade)
- Click **Create New App**
- Note down your **API Key** and **API Secret**

### 3. Get Access Token

To get your **Access Token**:

1. Open this URL in your browser (replace `xxx` with your API key):

    ```
    https://kite.zerodha.com/connect/login?v=3&api_key=xxx
    ```

2. Log in to your Zerodha account.  
    After login, you'll be redirected to your app's redirect URL with a `request_token` in the URL.

3. Exchange the `request_token` for an `access_token` by making a POST request to the Kite `/session/token` API, using your `api_key`, `api_secret`, and the `request_token`.  
    (See [Kite Connect docs](https://kite.trade/docs/connect/v3/) for details.)

Use the resulting `access_token` in your `.env` file.

### 4. Environment Variables

Create a `.env` file in your project root:

```env
API_KEY=your_api_key
API_SECRET=your_api_secret
ACCESS_TOKEN=your_access_token
```

---

## ▶️ Running the Server

Start the MCP server:

```bash
bun run server.ts
```

This launches an MCP server over stdio with the following tools:

- **add** → simple addition (`a + b`)
- **get-profile** → fetch Zerodha user profile
- **get-holdings** → fetch Zerodha account holdings
- (optional) **place-order** → place a trade order (disabled by default)

And one resource:

- `greeting://{name}` → returns a dynamic greeting (example resource)

---

## 💻 Connect to Claude Desktop

1. Open Claude Desktop
2. Go to **Settings → MCP Servers → Add**
3. Point Claude to a `mcp.json` file like:

        ```json
        {
            "mcpServers": {
                "kite": {
                    "command": "bun",
                    "args": ["run", "server.ts"]
                }
            }
        }
        ```

4. Restart Claude → your MCP server will appear as `kite`

---

## 🧪 Usage Examples in Claude

Once connected, you can ask Claude:

- Fetch your Zerodha profile using `get-profile`
- List your holdings with `get-holdings`
- Place realtime orders with `place-order`

---

## ⚠️ Warning

The `place-order` tool is real and will place live trades in your Zerodha account.  
**Keep it commented out unless you explicitly want to trade.**

---

## 🛠️ Tech Stack

- **[Bun](https://bun.sh/)** (runtime)
- **[Express](https://expressjs.com/)** (if needed for HTTP transport)
- **[@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)** (MCP SDK)
- **[Kite Connect API](https://kite.trade/docs/connect/v3/)** (Zerodha trading API)
- **[zerodha-mcp-server](https://github.com/Athul28/zerodha-mcp-server)** (this project)

