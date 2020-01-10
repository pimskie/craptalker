const isSupported = typeof window.speechSynthesis !== 'undefined' &&
	typeof window.speechSynthesis.onvoiceschanged !== 'undefined';

export default isSupported;
