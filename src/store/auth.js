
import firebase, { registerVersion } from 'firebase/app'
export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid') // получаем id пользователя

        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        }) // регистрируем нового пользователя с начальными данными в базе данных
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser // обращаемся к firebase  и берем поле с пользователем
      return user ? user.uid : null // проверяем есть ли id у пользователя
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo') // очищаем state при выходе, чтобы сессии пользователей не пересикались
    }
  }
}