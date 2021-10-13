/**
 * Config
 */

export function learn(state, { skill }) {
  state.skills.push(skill);
}

export const setConfidenceThreshold = (state, { confidenceThreshold }) => {
  state.confidenceThreshold = confidenceThreshold;
};

/**
 * Input
 */

export function setActiveSkill(state, { activeSkill }) {
  state.activeSkill = activeSkill;
}

export function addLine(state, { line }) {
  state.queue.push(line);
}

export function amendLastLine(state) {
  state.queue.splice(state.queue.length - 2, 1);
}

export function clearQueue(state) {
  state.queue = [];
  state.index = 0
}

export function nextLine(state) {
  state.index += 1;
}

export function reset(state) {
  state.activeSkill = null
  state.queue = [];
  state.index = 0
}