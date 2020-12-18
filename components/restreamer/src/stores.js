import { writable, get } from 'svelte/store';

import { sanitizeLabel, sanitizeUrl } from './util';

function newInputModal() {
  const { subscribe, set, update } = writable({
    edit_id: null,
    prevValue: null,
    prevLabel: '',
    label: '',
    push_key: '',
    pull_url: '',
    visible: false,
    is_pull: false,
  });

  return {
    subscribe,
    set: v => {
      if (v.pull_url !== '') {
        v.pull_url = sanitizeUrl(v.pull_url);
      }
      if (v.push_key !== '') {
        v.push_key = sanitizeUrl(v.push_key);
      }
      return set(v);
    },
    get: () => get({subscribe}),
    openAdd: () => update(v => {
      v.visible = true;
      return v;
    }),
    openEdit: (id, val, label, is_pull) => update(v => {
      v.edit_id = id;
      v.prevValue = val;
      v.is_pull = is_pull;
      if (v.is_pull) {
        v.pull_url = sanitizeUrl(val);
      } else {
        v.push_key = sanitizeUrl(val);
      }
      if (!!label) {
        v.prevLabel = label;
        v.label = sanitizeLabel(label);
      }
      v.visible = true;
      return v;
    }),
    switchPull: () => update(v => {
      v.is_pull = true;
      return v;
    }),
    switchPush: () => update(v => {
      v.is_pull = false;
      return v;
    }),
    sanitizeLabel: () => update(v => {
      if (v.label !== '') {
        v.label = sanitizeLabel(v.label);
      }
      return v;
    }),
    close: () => update(v => {
      v.edit_id = null;
      v.prevValue = null;
      v.prevLabel = '';
      v.label = '';
      v.push_key = '';
      v.pull_url = '';
      v.visible = false;
      return v;
    }),
  };
}

function newOutputModal() {
  const { subscribe, set, update } = writable({
    input_id: null,
    multi: false,
    label: '',
    url: '',
    list: '',
    visible: false,
  });

  return {
    subscribe,
    update,
    set: v => {
      if (v.url !== '') {
        v.url = sanitizeUrl(v.url);
      }
      return set(v);
    },
    get: () => get({subscribe}),
    open: id => update(v => {
      v.input_id = id;
      v.visible = true;
      return v;
    }),
    switchSingle: () => update(v => {
      v.multi = false;
      return v;
    }),
    switchMulti: () => update(v => {
      v.multi = true;
      return v;
    }),
    sanitizeLabel: () => update(v => {
      if (v.label !== '') {
        v.label = sanitizeLabel(v.label);
      }
      return v;
    }),
    close: () => update(v => {
      v.input_id = null;
      v.label = '';
      v.url = '';
      v.list = '';
      v.visible = false;
      return v;
    }),
  };
}

export const inputModal = newInputModal();
export const outputModal = newOutputModal();
