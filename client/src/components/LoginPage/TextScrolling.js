export var style = document.createElement('style');
export var position = 'right';

style.innerHTML = `
  @keyframes my-animation {
    0%{${position}: -${document.querySelector('.text').offsetWidth + 10}}
    100%{${position}: 100%;}
  }`;

document.head.appendChild(style);
