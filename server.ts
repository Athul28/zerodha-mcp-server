import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getProfile, getHoldings, placeOrder } from ".";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

// Add an addition tool
server.registerTool(
  "add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() },
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

server.registerTool(
  "get-profile",
  {
    title: "Get Profile Tool",
    description: "This is used to fetch the users zerodha profile",
    inputSchema: {},
  },
  async ({}) => {
    const userProfile = await getProfile();
    return {
      content: [{ type: "text", text: JSON.stringify(userProfile) }],
    };
  }
);

server.registerTool(
  "get-holdings",
  {
    title: "Get User Holdings",
    description:
      "This is used to fetch user's current holdings in zerodha platform",
    inputSchema: {},
  },
  async ({}) => {
    const userHoldings = await getHoldings();
    return {
      content: [{ type: "text", text: JSON.stringify(userHoldings) }],
    };
  }
);

// server.registerTool(
//   "place-order",
//   {
//     title: "Place a trade order",
//     description:
//       "This is used to place a real trade order on zerodha platform for the user",
//     inputSchema: {},
//   },
//   async ({}) => {
//     const order = await placeOrder({
//       exchange: "NSE",
//       tradingsymbol: "ONGC",
//       transaction_type: "BUY",
//       quantity: 1,
//       product: "CNC",
//       order_type: "MARKET",
//     });
//     return {
//       content: [{ type: "text", text: JSON.stringify(order) }],
//     };
//   }
// );

// Add a dynamic greeting resource
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  {
    title: "Greeting Resource", // Display name for UI
    description: "Dynamic greeting generator",
  },
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
