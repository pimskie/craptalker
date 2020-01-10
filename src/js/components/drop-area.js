
import events from '../utils/events.js';
import emitter from '../utils/emitter.js';

const TYPES_ALLOWED = ['application/vnd.ms-excel', 'text/plain'];

class DragArea {
	constructor(el) {
		this.el = el;

		this.el.addEventListener('dragenter', e => this.onDragEnter(e));
		this.el.addEventListener('dragover', e => this.onDragOver(e));
		this.el.addEventListener('dragleave', e => this.onDragLeave(e));
		this.el.addEventListener('drop', e => this.onDrop(e));
	}

	get isActive() {
		return this.el.classList.contains('is-active');
	}

	set isActive(active) {
		return this.el.classList.toggle('is-active', active);
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDragEnter(e) {
		this.isActive = true;
	}

	onDragLeave(e) {
		this.isActive = false;
	}

	onDrop(e) {
		e.preventDefault();

		this.isActive = false;

		const { dataTransfer: { files = [] } } = e;

		if (!files.length) {
			console.warn('No file dropped');

			return;
		}

		const [file] = files;

		this.processFile(file);
	}

	async processFile(file) {
		const { type } = file;

		if (!TYPES_ALLOWED.includes(type)) {
			console.warn(`"${type}" is not allowed`);

			return;
		}

		const content = await file.text();

		emitter.emit(events.file.DROPPED, content);
	}
}

export default DragArea;
