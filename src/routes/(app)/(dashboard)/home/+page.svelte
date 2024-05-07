<script>
	import { enhance } from '$app/forms';
</script>

<h1 class="h1">Home</h1>
<form action="?/logout" method="post" use:enhance>
	<button type="submit">Logout</button>
</form>
