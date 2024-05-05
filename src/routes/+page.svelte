<script>
	import { enhance } from '$app/forms';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<main class="container flex mx-auto h-dvh justify-center items-center">
	<form action="/login" method="post" class="card variant-soft p-5 grid gap-5 bg-" use:enhance>
		<h1 class="h1 mb-5">Login</h1>

		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<input type="text" placeholder="Username" />
			<div class="input-group-shim">@sunwayanime.com</div>
		</div>

		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="password" placeholder="Password" />
			<a href="/" title="Username already in use.">
				<Icon src={ExclamationCircle} theme="solid" class="text-warning-500 animate-pulse h-5" />
			</a>
		</div>

		<button type="submit" class="btn variant-filled-primary">Login</button>
	</form>
</main>
