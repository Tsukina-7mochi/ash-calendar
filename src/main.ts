import { CalendarDate } from './calendarDate.ts';
import './elements/mod.ts';

const getElementByIdOrThrow = function(elementId: string): HTMLElement {
  const element = document.getElementById(elementId);
  if(element === null) {
    throw Error(`element of id ${elementId} is not found.`);
  }

  return element;
}

const parseQueryParam = function(queryStr: string): Map<string, string> {
  const query = new Map<string, string>();
  for(const q of location.search.slice(1).split('&')) {
    const index = q.indexOf('=');
    if(index === -1) {
        query.set(q, '');
    } else {
        query.set(q.slice(0, index), q.slice(index + 1));
    }
  }

  return query;
}

window.addEventListener('DOMContentLoaded', () => {
  const query = parseQueryParam(location.search);

  const elMainImage = getElementByIdOrThrow('main-image');
  const elNoAsh = getElementByIdOrThrow('no-ash');
  const elControls = getElementByIdOrThrow('controls');
  const elHideUI = getElementByIdOrThrow('hide-ui');
  const elRotate = getElementByIdOrThrow('rotate');
  const elFitScreen = getElementByIdOrThrow('fit-screen');
  const elShare = getElementByIdOrThrow('share');
  const elNavigateBefore = getElementByIdOrThrow('navigate-before');
  const elNavigateNext = getElementByIdOrThrow('navigate-next');
  const elCalendarRoot = getElementByIdOrThrow('calendar-root');
  const elShareDialog = getElementByIdOrThrow('share-dialog');

  let date = ((date?: string) => {
    if(typeof date !== 'string') {
      return CalendarDate.today();
    }
    return CalendarDate.parse(date) ?? CalendarDate.today();
  })(query.get('date')).normalized();

  elMainImage.addEventListener('error', () => {
    elNoAsh.classList.remove('hidden');
  });

  const updateImage = function() {
    const url = `https://raw.githubusercontent.com/ash-chan-calendar/image/master/${date.dateStringShort}.png`;
    const alt = `photo of ${date}`;

    elMainImage.setAttribute('src', url);
    elMainImage.setAttribute('alt', alt);
    elNoAsh.classList.add('hidden');
  }

  const changeDateByDate = function(amount: number) {
    date = new CalendarDate(
      date.year,
      date.month,
      date.date + amount
    ).normalized();
    if(!date.equals(CalendarDate.today())) {
      query.set('date', date.toString());

      const searchBody = [...query.entries()].map(([key, value]) => `${key}=${value}`).join('&');
      location.search = `?${searchBody}`;
    }
    elCalendarRoot.setAttribute('date', date.toString());
  }

  updateImage();
  elCalendarRoot.setAttribute('date', date.toString());
  elNavigateBefore.addEventListener('click', () => changeDateByDate(-1));
  elNavigateNext.addEventListener('click', () => changeDateByDate(+1));

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

  elControls.addEventListener('click', () => {
    elShareDialog.classList.add('hidden');
  });
  elShare.addEventListener('click', (e) => {
    elShareDialog.classList.remove('hidden');
    e.stopPropagation();
  });
  elShareDialog.addEventListener('close', () => {
    elShareDialog.classList.add('hidden');
  });
});
