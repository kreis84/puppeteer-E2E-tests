const sleep = (delayMS) => {
  return new Promise( (res, rej) => {
    setTimeout(res, delayMS)
  } )
}

module.exports = {
  sleep,
}
