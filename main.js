#!/usr/bin/env node

const chalk = require("chalk");
const ncp = require("copy-paste");
const { log } = console;
const pjson = require("./package.json");

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("-"));
const words = args.filter((a) => !a.startsWith("-"));

const alternating = flags.includes("--alternating") || flags.includes("-a");
const help = flags.includes("--help") || flags.includes("-h");

const randomMethod = (c) =>
  Math.random() > 0.5 ? c.toLowerCase() : c.toUpperCase();
const alternatingMethod = (c, i) => (i % 2 ? c.toLowerCase() : c.toUpperCase());

if (words.length === 0 || help) {
  log(chalk.bold(chalk.green(`Boomercase v${pjson.version}`)));
  log("CLI that generates text in a boomer-ified way. For example:");
  log(chalk.yellow("boomercase"), "=>", chalk.green("BoOmeRcAse"));
  log(
    "By default, it will decide randomly whether a character should be uppercase or lowercase."
  );
  log(
    "To change this to",
    chalk.cyan("alternating"),
    "mode, add the",
    chalk.cyan("--alternating"),
    "or",
    chalk.cyan("-a"),
    "flag."
  );
  process.exit(0);
}

log(
  chalk.blue("Generating boomerified text using"),
  chalk.cyan(alternating ? "alternating" : "random"),
  chalk.blue("method...")
);

const boomerify = (str) =>
  [...str]
    .map((c, i) => (alternating ? alternatingMethod(c, i) : randomMethod(c)))
    .join("");

const result = words.map((w) => boomerify(w)).join(" ");

ncp.copy(result, () => {
  log(chalk.green("Success! Generated the following text:"));
  log(result);
  log(chalk.green("and copied it to clipboard."));
  process.exit(0);
});
