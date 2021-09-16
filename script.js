if('serviceWorker'in navigator){
  navigator.serviceWorker.register('sw.js')
  .then(reg=>console.log('Registro de SW exitoso',reg))
  .catch(err=>console.warn('Errror al registro de SW',err))
}
