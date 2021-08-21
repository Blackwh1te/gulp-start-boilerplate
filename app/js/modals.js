import { lock, unlock } from 'tua-body-scroll-lock'
import { getAttr } from './utils/getAttr'

export default class Modals {
  els = {
    modal: '[data-js-modal]',
    modalContent: '[data-js-modal-content]',
    modalTargetBtn: '[data-js-modal-target]',
    modalCloseBtn: '[data-js-modal-close-btn]',
  }

  classStates = {
    isOpen: 'is-open',
  }

  constructor () {
    this.bindEvents()
  }

  openModal (id) {
    const modal = document.querySelector(id)

    if (modal) {
      modal.classList.add(this.classStates.isOpen)
      lock()
    }
  }

  closeModalByInnerEl (innerEl) {
    const modal = innerEl.closest(this.els.modal)

    if (modal) {
      modal.classList.remove((this.classStates.isOpen))
      unlock()
    }
  }

  handleClick (e) {
    const { target } = e

    switch (true) {
      case target.matches(this.els.modalTargetBtn):
        this.openModal(target.getAttribute(getAttr(this.els.modalTargetBtn)))
        break
      case target.matches(this.els.modalCloseBtn):
        this.closeModalByInnerEl(target)
        break
      case !target.closest(this.els.modalContent):
        this.closeModalByInnerEl(target)
        break
      default:
        break
    }
  }

  bindEvents () {
    document.addEventListener('click', (e) => this.handleClick(e))
  }
}
