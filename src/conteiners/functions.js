export function timerSet(num) {
  let day, hour, minute, second
  second = Math.floor(num % 60)
  minute = num / 60
  hour = minute / 60
  day = Math.floor(hour / 24)

  hour = Math.floor(hour % 24)
  minute = Math.floor(minute % 60)

  day = String(day)
  hour = String(hour)
  minute = String(minute)
  second = String(second)

  day = day.length < 2 ? 0 + day : day
  hour = hour.length < 2 ? 0 + hour : hour
  minute = minute.length < 2 ? 0 + minute : minute
  second = second.length < 2 ? 0 + second : second
  return {
    d: day,
    h: hour,
    m: minute,
    s: second
  }

}

export const time = (item) => {
  let today = new Date()
  item.date = new Date( Date.parse(item.date))
  if (item.date.getDate() < today.getDate()) {
    return item.date.toLocaleDateString()
  } else {
    return item.date.toLocaleTimeString()
  }
}

export const addClass = (arr, item, key, nameClass, key2, nameClass2) => {
  let changeArr = [...arr]
  if (item[key] === true) {
    changeArr.push(nameClass)

  }
  if (item[key2] === true) {
    changeArr.push(nameClass2)

  }
  changeArr = changeArr.join(' ')
  return changeArr
}

export const clickHandler = (event, fun) => {
  let val
  if (event.target.tagName === 'BUTTON') {
    val = event.target.parentNode.childNodes[1].value
    if (val.trim() === '') {
      return
    }
    fun(val.trim())
    event.target.parentNode.childNodes[1].value = ''
  }
  if (event.target.tagName === 'INPUT') {
    val = event.target.value
    if (event.keyCode === 13) {
      if (val.trim() === '') {
        return
      }
      fun(val.trim())
      event.target.value = ''
    }
  }

}


export const selfCategCounter = (arr1, arr2) => {
  let someCat = new Map()
  for (let i = 0; i < arr1.length; i++) {
    let counter = arr2.filter(item => item.selfCategory === arr1[i].name && item.deleted !== true).length
    arr2.map(item => {
      if (item.selfCategory === arr1[i].name && item.deleted !== true) {
        someCat.set(arr1[i].name, counter)
      } return item
    })

  }
  return someCat
}      
