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
    elMainImage.setAttribute('src', '');
    if (date.gt(CalendarDate.today())) {
      elMainImage.setAttribute('src', 'https://ash-cale.com/404');
      elMainImage.setAttribute('alt', '');
    } else {
      const rawURL = `https://raw.githubusercontent.com/ash-chan-calendar/image/master/${date.dateStringShort}.png`;
      const url = `https://ash-cale.com/_next/image?url=${encodeURI(
        rawURL
      )}&w=1920&q=75`;
      const alt = `photo of ${date}`;
      elMainImage.setAttribute('src', url);
      elMainImage.setAttribute('alt', alt);
    }
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

const registerRotateAndScale = function (
  elements: ElementRegister<DocumentElements>,
  windowResizeDebounce = 250
) {
  const elMainImage = elements.get('main-image');
  const elRotate = elements.get('rotate-button');
  const elFitScreen = elements.get('fit-screen-button');

  let enlarged = false;
  let rotationUnit = 0;
  let scale = 1;

  const calculateImageScale = function () {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;
    const imageWidth = elMainImage.width;
    const imageHeight = elMainImage.height;

    if (rotationUnit % 2 === 0) {
      // 0deg or 180deg (equivalent) rotation
      if (enlarged) {
        return Math.max(screenWidth / imageWidth, screenHeight / imageHeight);
      } else {
        return Math.min(screenWidth / imageWidth, screenHeight / imageHeight);
      }
    } else {
      // 90deg or 270deg (equivalent) rotation
      if (enlarged) {
        return Math.max(screenHeight / imageWidth, screenWidth / imageHeight);
      } else {
        return Math.min(screenHeight / imageWidth, screenWidth / imageHeight);
      }
    }
  };
  const setImageTransform = function () {
    elMainImage.style.transform = `translate(-50%, -50%) rotate(${
      rotationUnit * 90
    }deg) scale(${scale})`;
  };
  const updateImageTransform = function (animate = true) {
    if (animate) {
      elMainImage.classList.remove('no-transition');
    } else {
      elMainImage.classList.add('no-transition');
    }
    scale = calculateImageScale();
    setImageTransform();
  };

  elMainImage.addEventListener('load', () => {
    updateImageTransform(false);
  });

  elFitScreen.addEventListener('click', () => {
    enlarged = !enlarged;
    updateImageTransform();
  });

  elRotate.addEventListener('click', () => {
    rotationUnit += 1;
    updateImageTransform();
  });

  let windowResizeTimeout: number | undefined = undefined;
  window.addEventListener('resize', () => {
    clearTimeout(windowResizeTimeout);
    windowResizeTimeout = setTimeout(() => {
      updateImageTransform();
    }, windowResizeDebounce);
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
  registerRotateAndScale(elements);
  registerShareDialog(elements);
});
