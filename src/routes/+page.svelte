<script>
	import { enhance } from '$app/forms';
</script>

<main class="container flex mx-auto h-dvh justify-center items-center">
	<form action="?/login" method="post" class="card variant-soft p-5 grid gap-5 bg-" use:enhance>
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
</main>
