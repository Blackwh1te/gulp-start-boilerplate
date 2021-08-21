import Collection from './generic/collection'
import { getAttr } from './utils/getAttr'
import { makeRequest } from './utils/makeRequest'
import { parseJSON } from './utils/parseJSON'

export const instance = '[data-js-form]'

export class Form {
  els = {
    instance,
  }

  defaultConfig = {
    url: './json/example.json',
    method: 'GET',
    type: 'json',
  }

  constructor (instance) {
    this.instance = instance
    this.cfg = this.getCfg()
    this.cfg.method = window.App.debug ? 'GET' : 'POST'
    this.bindEvents()
  }

  getCfg () {
    return {
      ...this.defaultConfig,
      ...parseJSON(this.instance.getAttribute(getAttr(this.els.instance))),
    }
  }

  handleFormSubmit (e) {
    e.preventDefault()

    const formData = new FormData(this.instance)

    makeRequest({
      ...this.cfg,
      data: formData,
    }).then((response) => {
      console.debug(response)
    }, (reject) => {
      console.error(reject)
    })
  }

  bindEvents () {
    this.instance.addEventListener('submit', (e) => this.handleFormSubmit(e))
  }
}

export class FormCollection extends Collection {
  constructor () {
    super(instance, Form)
    this.init()
  }

  init (context = document) {
    context.querySelectorAll(instance).forEach((el) => {
      this.collection = new Form(el)
    })
  }
}
