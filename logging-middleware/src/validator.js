import { ALLOWED_LEVELS, ALLOWED_PACKAGES, ALLOWED_STACKS } from "./constants.js";

const stackSet = new Set(ALLOWED_STACKS);
const levelSet = new Set(ALLOWED_LEVELS);
const packageSet = new Set(ALLOWED_PACKAGES);

export function validateInputs(stack, level, packageName, message) {
  if (!stackSet.has(stack)) {
    throw new Error(
      `Invalid stack: ${String(stack)}. Allowed values: ${ALLOWED_STACKS.join(
        ", "
      )}.`
    );
  }

  if (!levelSet.has(level)) {
    throw new Error(
      `Invalid level: ${String(level)}. Allowed values: ${ALLOWED_LEVELS.join(
        ", "
      )}.`
    );
  }

  if (!packageSet.has(packageName)) {
    throw new Error(
      `Invalid package: ${String(
        packageName
      )}. Allowed values: ${ALLOWED_PACKAGES.join(", ")}.`
    );
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    throw new Error("Invalid message: message must be a non-empty string.");
  }
}
