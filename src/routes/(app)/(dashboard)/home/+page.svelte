<script lang="ts">
	import Datatable from '$lib/components/Datatable.svelte';

	export let data;
</script>

<h1 class="h1 mb-10">Members</h1>

<Datatable members={data.members} />
