/**
 * Config
 */

export const setConfidenceThreshold = (state, { confidenceThreshold }) => {
  state.confidenceThreshold = confidenceThreshold;
};

/**
 * Transcript
 */

export function addUserRecord(state, { line, confidence }) {
  state.queue.push({ isKelly: false, line: line.trim(), confidence });
}

export function addKellyRecord(state, { line }) {
  state.queue.push({ isKelly: true, line: line.trim() });
}

/**
 * Index
 */

export function nextIndex(state) {
  state.index += 1;
}

export function resetIndex(state) {
  state.index = 0;
}

/**
 * Install
 */

export function setCommand(state, { name, commands }) {
  state.commands.set(name, commands);
}

export function setHelp(state, { name, help }) {
  state.helps.set(name, help);
}

export function setScript(state, { name, script }) {
  state.scripts.set(name, script);
}

export function setDependency(state, { dependencyName, dependency }) {
  state.dependencies.set(dependencyName, () => dependency);
}

/**
 * Engage
 */
export function engage(state, { name }) {
  state.engagedWith = name;
}

export function disengage(state) {
  state.engagedWith = null;
}
