<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { DataHandler } from '@vincjo/datatables';

	export let handler: DataHandler;
	export let filterBy: string;
	export let availableFilters: string[] = [];

	let filterList: AutocompleteOption<string>[];
	$: filterList = availableFilters.map((filter) => {
		return {
			label: filter,
			value: filter,
			keywords: filter
		};
	});

	let value: string;

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	const onSelection = (event: CustomEvent<AutocompleteOption<string>>): void => {
		value = event.detail.label;
		if (filterBy) handler.filter(value, filterBy);
	};
</script>

<th>
	{#if availableFilters.length > 0}
		<input
			class="input autocomplete text-sm w-full variant-form-material"
			use:popup={popupSettings}
			type="text"
			placeholder="Filter"
			bind:value
			on:input={() => {
				if (filterBy) handler.filter(value, filterBy);
			}}
		/>
		<div
			data-popup="popupAutocomplete"
			class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
			tabindex="-1"
		>
			<Autocomplete bind:input={value} options={filterList} on:selection={onSelection} />
		</div>
	{:else}
		<input
			class="input text-sm w-full variant-form-material"
			type="text"
			placeholder="Filter"
			bind:value
			on:input={() => {
				if (filterBy) handler.filter(value, filterBy);
			}}
		/>
	{/if}
</th>
