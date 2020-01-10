import { html } from 'lit-element';

const tableRow = row => html`
	<tr>
		${row.map(cell => html`<td>${cell}</td>`)}
	</tr>`;

const tableBody = rows => html`
	<tbody>
		${rows.map(tableRow)}
	</tbody>
`;

export default tableBody;
