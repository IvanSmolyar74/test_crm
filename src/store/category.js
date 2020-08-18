import firebase from 'firebase/app';

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const catrgory = firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: catrgory.key }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}