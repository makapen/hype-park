import Ember from 'ember';

export function convertIndex(params/*, hash*/) {
  return parseInt(params) + 1;
}

export default Ember.Helper.helper(convertIndex);
