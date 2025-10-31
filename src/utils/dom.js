export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag)
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  if (typeof children === 'string') el.innerHTML = children
  else children.forEach(c => el.appendChild(c))
  return el
}
