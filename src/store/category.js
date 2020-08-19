import firebase from 'firebase/app';

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid'); // получаем id текущего пользователя (auth.js)
        const catrgories = (await (firebase.database().ref(`/users/${uid}/categories`).once('value'))).val() // получаем данные категорий из firebase

        return Object.keys(catrgories).map(key => ({ ...catrgories[key], id: key }))// возвращаем отформатированный массив
      } catch (e) {
        commit('setError', e); // обрабатываем ошибки (index.js)
        throw e;
      }
    },
    async updateCategories({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid'); // получаем id текущего пользователя (auth.js)
        firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit }) // обновляем категорию в firebase
      } catch (e) {
        commit('setError', e); // обрабатываем ошибки (index.js)
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid'); // получаем id текущего пользователя (auth.js)
        const catrgory = firebase.database().ref(`/users/${uid}/categories`).push({ title, limit }) // создаем новую таблицу с категориями и  получаем категорию
        return { title, limit, id: catrgory.key } // возвращаем объект  с данными из firebase
      } catch (e) {
        commit('setError', e); // обрабатываем ошибки (index.js)
        throw e;
      }
    }
  }
}