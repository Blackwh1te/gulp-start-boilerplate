/**
 * Получение индекса элемента
 * @param el{Node} - исходный элемент
 * @param closestParent{Node=} - ближайший родительский элемент, по которому можно выполнить поиск
 * @return Number
 */
export const getNodeIndex = (el) => {
  Array.from(el.parentNode.children).indexOf(el)
}
