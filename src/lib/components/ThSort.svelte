<script lang="ts">
	import { ArrowDown, ArrowUp, ArrowsUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { DataHandler } from '@vincjo/datatables';

	export let handler: DataHandler;
	export let orderBy: string;

	const sorted = handler.getSort();
</script>

<th on:click={() => handler.sort(orderBy)} class="cursor-pointer select-none">
	<div class="flex h-full items-center justify-start gap-x-2">
		{#if $sorted.identifier === orderBy}
			{#if $sorted.direction === 'asc'}
				<Icon src={ArrowDown} size="15" />
			{:else if $sorted.direction === 'desc'}
				<Icon src={ArrowUp} size="15" />
			{/if}
		{:else}
			<Icon src={ArrowsUpDown} size="15" />
		{/if}
		<slot />
	</div>
</th>
