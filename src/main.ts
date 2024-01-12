import { CalendarDate } from './calendarDate.ts';
import { ElementRegister } from './elementRegister.ts';
import { DateChangeEvent } from './elements/dateChangeEvent.ts';
import './elements/mod.ts';
import { CalendarRoot } from './elements/mod.ts';

type DocumentElements = {
  'main-image': HTMLImageElement;
  'no-ash': HTMLElement;
  controls: HTMLElement;
  'hide-ui-button': HTMLElement;
  'rotate-button': HTMLElement;
  'fit-screen-button': HTMLElement;
  'share-button': HTMLElement;
  'navigate-before-button': HTMLElement;
  'navigate-next-button': HTMLElement;
  'calendar-root': CalendarRoot;
  'share-dialog': HTMLElement;
};

const parseQueryParam = function (queryStr: string): Map<string, string> {
  const query = new Map<string, string>();
  for (const q of queryStr.slice(1).split('&')) {
    const index = q.indexOf('=');
    if (index === -1) {
      query.set(q, '');
    } else {
      query.set(q.slice(0, index), q.slice(index + 1));
    }
  }

  return query;
};

const registerCalendar = function (
  elements: ElementRegister<DocumentElements>
) {
  const elMainImage = elements.get('main-image');
  const elNoAsh = elements.get('no-ash');
  const elCalendarRoot = elements.get('calendar-root');
  const elNavigateBefore = elements.get('navigate-before-button');
  const elNavigateNext = elements.get('navigate-next-button');

  const getDateFromQuery = function (queryStr: string) {
    const query = parseQueryParam(queryStr);
    const queryDate = query.get('date');
    return typeof queryDate === 'string'
      ? CalendarDate.parse(queryDate)?.normalized()
      : null;
  };

  const updateAttributes = function (date: CalendarDate) {
    const url = `https://raw.githubusercontent.com/ash-chan-calendar/image/master/${date.dateStringShort}.png`;
    const alt = `photo of ${date}`;
    elMainImage.setAttribute('src', '');
    elMainImage.setAttribute('src', url);
    elMainImage.setAttribute('alt', alt);
    elNoAsh.classList.add('hidden');
    elCalendarRoot.setAttribute('date', date.toString());
  };

  let currentDate = getDateFromQuery(location.search) ?? CalendarDate.today();
  const setDate = function (date: CalendarDate) {
    currentDate = date;
    window.history.pushState({}, '', `?date=${date.toString()}`);
    updateAttributes(date);
  };
  const advanceDateByDate = function (date: CalendarDate, amount: number) {
    const newDate = new CalendarDate(
      date.year,
      date.month,
      date.date + amount
    ).normalized();
    setDate(newDate);
  };

  updateAttributes(currentDate);
  window.addEventListener('popstate', () => {
    currentDate = getDateFromQuery(location.search) ?? CalendarDate.today();
    elCalendarRoot.setAttribute('date', currentDate.toString());
    updateAttributes(currentDate);
  });
  elMainImage.addEventListener('error', () =>
    elNoAsh.classList.remove('hidden')
  );
  elNavigateBefore.addEventListener('click', () =>
    advanceDateByDate(currentDate, -1)
  );
  elNavigateNext.addEventListener('click', () =>
    advanceDateByDate(currentDate, +1)
  );
  elCalendarRoot.addEventListener(DateChangeEvent.eventName, (e: Event) => {
    setDate((e as DateChangeEvent).date);
  });
};

const registerUIVisibility = function (
  elements: ElementRegister<DocumentElements>
) {
  const elControls = elements.get('controls');
  const elHideUI = elements.get('hide-ui-button');

  const showUI = () => {
    elControls.classList.remove('hidden');
    document.body.removeEventListener('click', showUI);
    document.body.removeEventListener('touchend', showUI);
  };
  const hideUI = () => {
    elControls.classList.add('hidden');
    document.body.addEventListener('click', showUI);
    document.body.addEventListener('touchend', showUI);
  };

  elHideUI.addEventListener('click', (e) => {
    hideUI();
    e.stopPropagation();
  });
};

const registerFitScreen = function (
  elements: ElementRegister<DocumentElements>
) {
  const elMainImage = elements.get('main-image');
  const elFitScreen = elements.get('fit-screen-button');

  elFitScreen.addEventListener('click', () => {
    elMainImage.classList.toggle('full-size');
  });
};

const registerRotate = function (
  elements: ElementRegister<DocumentElements>,
  transitionDuration: number
) {
  const elMainImage = elements.get('main-image');
  const elRotate = elements.get('rotate-button');

  let rotateState = 0;
  elMainImage.classList.add('rotate-0');
  elRotate.addEventListener('click', () => {
    elMainImage.classList.remove(`rotate-${rotateState}`);
    rotateState = (rotateState + 1) % 5;
    elMainImage.classList.add(`rotate-${rotateState}`);

    if (rotateState === 4) {
      rotateState = 0;
      setTimeout(() => {
        if (rotateState === 0) {
          elMainImage.classList.remove('rotate-4');
          elMainImage.classList.add('rotate-0');
        }
      }, transitionDuration);
    }
  });
};

const registerShareDialog = function (
  elements: ElementRegister<DocumentElements>
) {
  const elControls = elements.get('controls');
  const elShare = elements.get('share-button');
  const elShareDialog = elements.get('share-dialog');

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
  elShareDialog.addEventListener('click', (e) => {
    e.stopPropagation();
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const elements = new ElementRegister<DocumentElements>();

  elements.setById('main-image');
  elements.setById('no-ash');
  elements.setById('controls');
  elements.setById('hide-ui-button', 'hide-ui');
  elements.setById('rotate-button', 'rotate');
  elements.setById('fit-screen-button', 'fit-screen');
  elements.setById('share-button', 'share');
  elements.setById('navigate-next-button', 'navigate-next');
  elements.setById('navigate-before-button', 'navigate-before');
  elements.setById('calendar-root');
  elements.setById('share-dialog');

  registerCalendar(elements);
  registerUIVisibility(elements);
  registerFitScreen(elements);
  registerRotate(elements, 400);
  registerShareDialog(elements);
});
