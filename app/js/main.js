import {getNodeIndex} from './utils/getNodeIndex';

const test = () => {
  console.debug('!')
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dom-is-ready')

  console.debug(getNodeIndex(document.querySelector('#span2')))

  test()
})
