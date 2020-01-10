import { html } from 'lit-element';

const tableHeader = headers => html`
	<thead>
		<tr>
			${headers.map(header => html`<th>${header}</th>`)}
		</tr>
	</thead>
`;

export default tableHeader;
