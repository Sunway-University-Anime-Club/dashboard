<script lang="ts">
	import { enhance } from '$app/forms';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { ExclamationTriangle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from './$types';

	const toastStore = getToastStore();

	const submitter: SubmitFunction = async () => {
		return async ({ result, update }) => {
			const toast: ToastSettings = {
				message: '',
				hoverable: true,
				timeout: 5000
			};

			switch (result.type) {
				case 'failure': {
					toast.message = result.data!.message;
					toast.background = 'variant-filled-error';
					break;
				}
				case 'redirect': {
					toast.message = 'Successfully logged in.';
					toast.background = 'variant-filled-success';
					break;
				}
			}

			toastStore.trigger(toast);
			return update({ reset: false });
		};
	};

	export let form;
</script>

<main class="container flex-col gap-5 flex mx-auto h-dvh justify-center items-center">
	<form
		action="?/login"
		method="post"
		class="card variant-soft p-5 grid gap-5 bg-"
		use:enhance={submitter}
	>
		<h1 class="h1 mb-5">Login</h1>

		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<input type="text" placeholder="Username" name="email" id="email" required />
			<div class="input-group-shim">@sunwayanime.com</div>
		</div>

		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="password" placeholder="Password" name="password" id="password" required />
		</div>

		<button type="submit" class="btn variant-filled-primary">Login</button>
	</form>

	{#if form && form.message}
		<noscript>
			<aside class="alert variant-ghost-error">
				<!-- Icon -->
				<Icon
					src={ExclamationTriangle}
					theme="solid"
					size="10%"
					class="text-warning-500 animate-pulse"
				/>
				<!-- Message -->
				<div class="alert-message">
					<h3 class="h3">Error</h3>
					<p>{form.message}</p>
				</div>
			</aside>
		</noscript>
	{/if}
</main>
