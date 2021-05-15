#!/usr/bin/env node
import { program } from "commander";
import { serveCommand } from "./commands/serve";

program.addCommand(serveCommand);

program.parse(process.argv);

// "prepublishOnly": "esbuild src/index.ts --platform=node --outfile=dist/index.js --bundle --minify --define:process.env.NODE_ENV=\\\"production\\\""
