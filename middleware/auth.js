export default function ({ store, error, redirect }) {
  // console.log('store', store.getters.getToken)
  if (!store.getters.token) {
    redirect('/login')
  }
}
