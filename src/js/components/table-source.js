import { LitElement, html } from 'lit-element';
import tableHeader from './table-header.js';
import tableBody from './table-body.js';

class TableSource extends LitElement {
	constructor(data) {
		super();
		this.headers = [];
	}

	setData({ headers = [], rows = [] }) {
		this.headers = headers;
		this.rows = rows;

		this.render();
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

customElements.define('x-table-source', TableSource);

export default TableSource;
