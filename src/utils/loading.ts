import { nextTick } from 'vue'

export default {
  show: () => {
    const bodys = document.body
    const div: HTMLDivElement = document.createElement('div')
    div.className = 'block-loading'
    div.innerHTML = `
           <div class="block-loading-box">
                <div class="diamond-grid">
                     ${Array.from({ length: 9 }, () => `<div></div>`).join('')}
                </div>
            </div>
            `
    bodys.insertBefore(div, bodys.childNodes[0])
  },
  hide: () => {
    nextTick(() => {
      setTimeout(() => {
        const el = document.querySelector('.block-loading')
        el && el.parentNode?.removeChild(el)
      }, 500)
    })
  },
}
