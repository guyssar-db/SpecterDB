import { writable } from 'svelte/store';

// State
export const selectedTypes = writable<string[]>([]);
export const includeEvidence = writable<Set<string>>(new Set());
export const excludeEvidence = writable<Set<string>>(new Set());
export const hiddenGhosts = writable<Set<string>>(new Set());
