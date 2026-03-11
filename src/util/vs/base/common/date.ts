import { Lazy } from './lazy';
import { LANGUAGE_DEFAULT } from './platform';

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

/**
 * Create a localized difference of the time between now and the specified date.
 * @param date The date to generate the difference from.
 * @param appendAgoLabel Whether to append the " ago" to the end.
 * @param useFullTimeWords Whether to use full words (eg. seconds) instead of
 * shortened (eg. secs).
 * @param disallowNow Whether to disallow the string "now" when the difference
 * is less than 30 seconds.
 */
export function fromNow(
	date: number | Date,
	appendAgoLabel?: boolean,
	useFullTimeWords?: boolean,
	disallowNow?: boolean,
): string {
	if (typeof date === 'undefined') {
		return 'unknown';
	}

	if (typeof date !== 'number') {
		date = date.getTime();
	}

	const seconds = Math.round((new Date().getTime() - date) / 1000);
	if (seconds < -30) {
		return 'in ' + fromNow(new Date().getTime() + seconds * 1000, false);
	}

	if (!disallowNow && seconds < 30) {
		return 'now';
	}

	let value: number;
	if (seconds < minute) {
		value = seconds;

		if (appendAgoLabel) {
			if (value === 1) {
				return useFullTimeWords ? value + ' second ago' : value + ' sec ago';
			} else {
				return useFullTimeWords ? value + ' seconds ago' : value + ' secs ago';
			}
		} else {
			if (value === 1) {
				return useFullTimeWords ? value + ' second' : value + ' sec';
			} else {
				return useFullTimeWords ? value + ' seconds' : value + ' secs';
			}
		}
	}

	if (seconds < hour) {
		value = Math.round(seconds / minute);
		if (appendAgoLabel) {
			if (value === 1) {
				return useFullTimeWords ? value + ' minute ago' : value + ' min ago';
			} else {
				return useFullTimeWords ? value + ' minutes ago' : value + ' mins ago';
			}
		} else {
			if (value === 1) {
				return useFullTimeWords ? value + ' minute' : value + ' min';
			} else {
				return useFullTimeWords ? value + ' minutes' : value + ' mins';
			}
		}
	}

	if (seconds < day) {
		value = Math.round(seconds / hour);
		if (appendAgoLabel) {
			if (value === 1) {
				return useFullTimeWords ? value + ' hour ago' : value + ' hr ago';
			} else {
				return useFullTimeWords ? value + ' hours ago' : value + ' hrs ago';
			}
		} else {
			if (value === 1) {
				return useFullTimeWords ? value + ' hour' : value + ' hr';
			} else {
				return useFullTimeWords ? value + ' hours' : value + ' hrs';
			}
		}
	}

	if (seconds < week) {
		value = Math.round(seconds / day);
		if (appendAgoLabel) {
			return value === 1 ? value + ' day ago' : value + ' days ago';
		} else {
			return value === 1 ? value + ' day' : value + ' days';
		}
	}

	if (seconds < month) {
		value = Math.round(seconds / week);
		if (appendAgoLabel) {
			if (value === 1) {
				return useFullTimeWords ? value + ' week ago' : value + ' wk ago';
			} else {
				return useFullTimeWords ? value + ' weeks ago' : value + ' wks ago';
			}
		} else {
			if (value === 1) {
				return useFullTimeWords ? value + ' week' : value + ' wk';
			} else {
				return useFullTimeWords ? value + ' weeks' : value + ' wks';
			}
		}
	}

	if (seconds < year) {
		value = Math.round(seconds / month);
		if (appendAgoLabel) {
			if (value === 1) {
				return useFullTimeWords ? value + ' month ago' : value + ' mo ago';
			} else {
				return useFullTimeWords ? value + ' months ago' : value + ' mos ago';
			}
		} else {
			if (value === 1) {
				return useFullTimeWords ? value + ' month' : value + ' mo';
			} else {
				return useFullTimeWords ? value + ' months' : value + ' mos';
			}
		}
	}

	value = Math.round(seconds / year);
	if (appendAgoLabel) {
		if (value === 1) {
			return useFullTimeWords ? value + ' year ago' : value + ' yr ago';
		} else {
			return useFullTimeWords ? value + ' years ago' : value + ' yrs ago';
		}
	} else {
		if (value === 1) {
			return useFullTimeWords ? value + ' year' : value + ' yr';
		} else {
			return useFullTimeWords ? value + ' years' : value + ' yrs';
		}
	}
}

export function fromNowByDay(date: number | Date, appendAgoLabel?: boolean, useFullTimeWords?: boolean): string {
	if (typeof date !== 'number') {
		date = date.getTime();
	}

	const todayMidnightTime = new Date();
	todayMidnightTime.setHours(0, 0, 0, 0);
	const yesterdayMidnightTime = new Date(todayMidnightTime.getTime());
	yesterdayMidnightTime.setDate(yesterdayMidnightTime.getDate() - 1);

	if (date > todayMidnightTime.getTime()) {
		return 'Today';
	}

	if (date > yesterdayMidnightTime.getTime()) {
		return 'Yesterday';
	}

	return fromNow(date, appendAgoLabel, useFullTimeWords);
}

/**
 * Gets a readable duration with intelligent/lossy precision. For example "40ms" or "3.040s")
 * @param ms The duration to get in milliseconds.
 * @param useFullTimeWords Whether to use full words (eg. seconds) instead of
 * shortened (eg. secs).
 */
export function getDurationString(ms: number, useFullTimeWords?: boolean) {
	const seconds = Math.abs(ms / 1000);
	if (seconds < 1) {
		return useFullTimeWords ? ms + ' milliseconds' : ms + 'ms';
	}
	if (seconds < minute) {
		return useFullTimeWords ? Math.round(ms) / 1000 + ' seconds' : Math.round(ms) / 1000 + 's';
	}
	if (seconds < hour) {
		return useFullTimeWords
			? Math.round(ms / (1000 * minute)) + ' minutes'
			: Math.round(ms / (1000 * minute)) + ' mins';
	}
	if (seconds < day) {
		return useFullTimeWords ? Math.round(ms / (1000 * hour)) + ' hours' : Math.round(ms / (1000 * hour)) + ' hrs';
	}
	return Math.round(ms / (1000 * day)) + ' days';
}

export function toLocalISOString(date: Date): string {
	return (
		date.getFullYear() +
		'-' +
		String(date.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(date.getDate()).padStart(2, '0') +
		'T' +
		String(date.getHours()).padStart(2, '0') +
		':' +
		String(date.getMinutes()).padStart(2, '0') +
		':' +
		String(date.getSeconds()).padStart(2, '0') +
		'.' +
		(date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
		'Z'
	);
}

export const safeIntl = {
	DateTimeFormat(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): Lazy<Intl.DateTimeFormat> {
		return new Lazy(() => {
			try {
				return new Intl.DateTimeFormat(locales, options);
			} catch {
				return new Intl.DateTimeFormat(undefined, options);
			}
		});
	},
	Collator(locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): Lazy<Intl.Collator> {
		return new Lazy(() => {
			try {
				return new Intl.Collator(locales, options);
			} catch {
				return new Intl.Collator(undefined, options);
			}
		});
	},
	Segmenter(locales?: Intl.LocalesArgument, options?: Intl.SegmenterOptions): Lazy<Intl.Segmenter> {
		return new Lazy(() => {
			try {
				return new Intl.Segmenter(locales, options);
			} catch {
				return new Intl.Segmenter(undefined, options);
			}
		});
	},
	Locale(tag: Intl.Locale | string, options?: Intl.LocaleOptions): Lazy<Intl.Locale> {
		return new Lazy(() => {
			try {
				return new Intl.Locale(tag, options);
			} catch {
				return new Intl.Locale(LANGUAGE_DEFAULT, options);
			}
		});
	},
	NumberFormat(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): Lazy<Intl.NumberFormat> {
		return new Lazy(() => {
			try {
				return new Intl.NumberFormat(locales, options);
			} catch {
				return new Intl.NumberFormat(undefined, options);
			}
		});
	},
};
