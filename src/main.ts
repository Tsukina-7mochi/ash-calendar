import './elements/mod.ts';

const getElementByIdOrThrow = (elementId: string): HTMLElement => {
  const element = document.getElementById(elementId);
  if(element === null) {
    throw Error(`element of id ${elementId} is not found.`);
  }

  return element;
}

window.addEventListener('DOMContentLoaded', () => {
  const elMainImage = getElementByIdOrThrow('main-image');
  const elControls = getElementByIdOrThrow('controls');
  const elHideUI = getElementByIdOrThrow('hide-ui');
  const elRotate = getElementByIdOrThrow('rotate');
  const elFitScreen = getElementByIdOrThrow('fit-screen');
  const elShare = getElementByIdOrThrow('share');
  const elNavigateBefore = getElementByIdOrThrow('navigate-before');
  const elNavigateNext = getElementByIdOrThrow('navigate-next');
  const elCalendarRoot = getElementByIdOrThrow('calendar-root');

  const hideUI = () => elControls.classList.add('hidden');
  const showUI = () => elControls.classList.remove('hidden');
  const clickHideUI = () => elHideUI.click();
  elMainImage.addEventListener('click', clickHideUI);
  elMainImage.addEventListener('touchend', clickHideUI);
  elHideUI.addEventListener('enable', hideUI);
  elHideUI.addEventListener('disable', showUI);

  elFitScreen.addEventListener('click', () => {
    elMainImage.classList.toggle('full-size');
  });

  const transitionDuration = 400;
  let rotateState = 0;
  elMainImage.classList.add('rotate-0');
  elRotate.addEventListener('click', () => {
    elMainImage.classList.remove(`rotate-${rotateState}`);
    rotateState = (rotateState + 1) % 5;
    elMainImage.classList.add(`rotate-${rotateState}`);

    if(rotateState === 4) {
      rotateState = 0;
      setTimeout(() => {
        if(rotateState === 0) {
          elMainImage.classList.remove('rotate-4');
          elMainImage.classList.add('rotate-0');
        }
      }, transitionDuration);
    }
  });
});
