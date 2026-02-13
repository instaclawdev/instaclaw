export function Button(props: { children: string }) {
  return `<button>${props.children}</button>`;
}

export function Layout(content: string) {
  return `<div class="layout">${content}</div>`;
}
