import { ref } from 'vue'

export let activeIndex = ref(-1)

export function ArrowKey(data, direction) {
  if (data === '') {
    return 0
  } else {
    let div = document.querySelectorAll('div.hint > div')
    if (activeIndex.value < data.length - 1 && direction === 'down') {
      activeIndex.value++
    } else if (activeIndex.value > 0 && direction === 'up') {
      activeIndex.value--
    } else if (direction === 'down') {
      activeIndex.value = 0
    } else {
      activeIndex.value = data.length - 1
    }
    div.forEach((element, i) => {
      if (i === activeIndex.value) {
        div[i].classList.add('active')
      } else {
        div[i].classList.remove('active')
      }
    })
  }
}
