import { getNodeIndex } from './utils/getNodeIndex'
import Collection from './generic/collection';

export const instance = '[data-js-tabs]';

export class Tabs {
  els = {
    tabsCaption: '[data-js-tabs-caption]',
    tabsHeader: '[data-js-tabs-header]',
    tabsContent: '[data-js-tabs-content]',
    tabsContentWrapper: '[data-js-tabs-content-wrapper]',
    tabsStrip: '[data-js-tabs-strip]'
  }

  constructor (instance) {
    this.instance = instance;
    this.tabsCaptions = this.instance.querySelectorAll(this.els.tabsCaption);
    this.tabsHeader = this.instance.querySelector(this.els.tabsHeader);
    this.tabsContents = this.instance.querySelectorAll(this.els.tabsContent);
    this.tabsContentWrapper = this.instance.querySelector(this.els.tabsContentWrapper);
    this.tabsStrip = this.instance.querySelector(this.els.tabsStrip);
    this.init();
    this.bindEvents();
  }

  handleTabsCaptionClick(e) {
    const clickedTabsCaption = e.target.closest(this.els.tabsCaption);
    const clickedTabsCaptionIndex = getNodeIndex(clickedTabsCaption);
    const clickedTabsCaptionWidth = (clickedTabsCaption.children[0] ?? clickedTabsCaption).offsetWidth;
    const clickedTabsCaptionOffsetLeft = clickedTabsCaption.offsetLeft;

    const targetTabsCaption = this.tabsCaptions[clickedTabsCaptionIndex];
    const targetTabsContent = this.tabsContents[clickedTabsCaptionIndex];

    this.tabsCaptions.forEach(tabsCaption => {
      tabsCaption.classList.remove('active');
    });

    this.tabsContents.forEach(tabsContent => {
      tabsContent.classList.remove('active');
    });

    targetTabsCaption.classList.add('active');
    targetTabsContent.classList.add('active');

    this.tabsContentWrapper.setAttribute('style', `--tabsOffset: -${clickedTabsCaptionIndex}00%`);
    this.tabsStrip.setAttribute('style', `--stripWidth: ${clickedTabsCaptionWidth}px; --stripOffset: translateX(${clickedTabsCaptionOffsetLeft}px);`);

    if (clickedTabsCaption.offsetLeft > this.tabsHeader.scrollWidth / 2) {
      this.tabsHeader.scrollBy({
        left: clickedTabsCaption.offsetLeft,
        behavior: 'smooth'
      });
    } else {
      this.tabsHeader.scrollBy({
        left: -clickedTabsCaption.offsetLeft,
        behavior: 'smooth'
      });
    }
  }

  init () {
    const firstTabsCaption = this.instance.querySelector(`${this.els.tabsCaption}:first-child`);
    const firstTabsCaptionWidth = (firstTabsCaption.children[0] ?? firstTabsCaption).offsetWidth;
    this.tabsStrip.style.width = `${firstTabsCaptionWidth}px`;
  }

  bindEvents() {
    this.tabsCaptions.forEach(tabsCaption => {
      tabsCaption.addEventListener('click', (e) => {
        this.handleTabsCaptionClick(e);
      });
    });
  }
}

export class TabsCollection extends Collection {
  constructor() {
    super(instance, Tabs);
    this.init();
  }

  init(context = document) {
    context.querySelectorAll(instance).forEach((el) => {
      this.collection = new Tabs(el);
    });
  }
}