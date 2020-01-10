import { LitElement, html } from 'lit-element';

import { convertIngPropertiesToYnab } from '../utils/ynab-ing-property-map.js';

import tableHeader from './table-header.js';
import tableBody from './table-body.js';

class TableDestination extends LitElement {
	constructor(data) {
		super();
		this.headers = [];
	}

	setData({ headers = [], rows = [] }) {
		this.headers = convertIngPropertiesToYnab(headers);
		this.rows = rows;

		this.render();
	}

	export() {
		return {
			headers: this.headers,
			rows: this.rows,
		};
	}

	render() {
		const header = tableHeader(this.headers);
		const body = tableBody(this.rows);

		return html`
			<table class="table">
				${header}
				${body}
			</table>
		`;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define('x-table-destination', TableDestination);

export default TableDestination;
