<script lang="ts">
	// Import local datatable components
	import Pagination from '$lib/components/Pagination.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import Search from '$lib/components/Search.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import ThSort from '$lib/components/ThSort.svelte';
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { DataHandler } from '@vincjo/datatables';

	export let members;
	export let yearFilters: string[];

	// Init data handler - CLIENT
	const handler = new DataHandler(members, { rowsPerPage: 5 });
	const rows = handler.getRows();

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const handleDownload = async (type: 'csv' | 'json') => {
		return await fetch(`/home?type=${type}`, { method: 'GET' })
			.then(async (res) => {
				return {
					blob: await res.blob(),
					filename: String(res.headers.get('Content-Disposition')).split('filename=')[1]
				};
			})
			.then(({ blob, filename }) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				a.remove();
			});
	};
</script>

<div class="container space-y-4">
	<header class="flex justify-between">
		<Search {handler} />

		<div class="flex justify-center gap-5">
			<button class="btn variant-soft rounded-md w-48 justify-between" use:popup={popupCombobox}>
				<span class="capitalize">Export Table</span>
				<span>↓</span>
				<div class="card w-48 shadow-xl" data-popup="popupCombobox">
					<ListBox rounded="rounded-md" padding="p-0">
						<ListBoxItem bind:group={comboboxValue} name="medium" value="csv">
							<button class="w-full p-2" type="submit" on:click={() => handleDownload('csv')}>
								CSV
							</button>
						</ListBoxItem>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="json">
							<button class="w-full p-2" type="submit" on:click={() => handleDownload('json')}>
								JSON
							</button>
						</ListBoxItem>
					</ListBox>
					<div class="arrow bg-surface-100-800-token" />
				</div>
			</button>
			<RowsPerPage {handler} />
		</div>
	</header>
	<div class="overflow-y-auto rounded-md">
		<table class="table table-hover table-comfortable w-max table-auto">
			<thead>
				<tr>
					<ThSort {handler} orderBy="registerationDate">Registration Date</ThSort>
					<ThSort {handler} orderBy="studentId">Student ID</ThSort>
					<ThSort {handler} orderBy="firstName">First Name</ThSort>
					<ThSort {handler} orderBy="lastName">Surname</ThSort>
					<ThSort {handler} orderBy="course">Course</ThSort>
					<ThSort {handler} orderBy="phone">Phone Number</ThSort>
					<ThSort {handler} orderBy="discord">Discord Username</ThSort>
					<ThSort {handler} orderBy="joinReason">Reason for Joining</ThSort>
					<ThSort {handler} orderBy="memberInterestedActivities">Interested Activities</ThSort>
					<ThSort {handler} orderBy="proofOfPayment">Proof of Payment</ThSort>
					<ThSort {handler} orderBy="favHusbandoWaifu">Favourite Husbando/Waifu</ThSort>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="registerationDate" availableFilters={yearFilters} />
					<ThFilter {handler} filterBy="studentId" />
					<ThFilter {handler} filterBy="firstName" />
					<ThFilter {handler} filterBy="lastName" />
					<ThFilter {handler} filterBy="course" />
					<ThFilter {handler} filterBy="phone" />
					<ThFilter {handler} filterBy="discord" />
					<ThFilter {handler} filterBy="joinReason" />
					<ThFilter {handler} filterBy="activities" />
					<ThFilter {handler} filterBy="proofOfPayment" />
					<ThFilter {handler} filterBy="favHusbandoWaifu" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.registerationDate}</td>
						<td>{row.studentId}</td>
						<td>{row.firstName}</td>
						<td>{row.lastName}</td>
						<td>{row.course}</td>
						<td>{row.phone}</td>
						<td>{row.discord}</td>
						<td>{row.joinReason}</td>
						<td>{row.activities}</td>
						<td>
							<a href={String(row.proofOfPayment)} class="anchor" target="_blank">
								{row.proofOfPayment}
							</a>
						</td>
						<td>{row.favHusbandoWaifu}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
