<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { ArrowLeftStartOnRectangle, UserGroup } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<div class="container mx-auto">
	<AppRail class="hidden lg:grid fixed top-0 left-0" height="h-dvh">
		<svelte:fragment slot="lead">
			<AppRailAnchor href="/">(icon)</AppRailAnchor>
		</svelte:fragment>
		<!-- --- -->
		<AppRailAnchor href="/home" selected={$page.url.pathname === '/home'}>
			<svelte:fragment slot="lead">
				<Icon src={UserGroup} size="25" theme="solid" class="mx-auto" />
			</svelte:fragment>
			<span>Members</span>
		</AppRailAnchor>

		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<span>(label)</span>
		</AppRailAnchor>

		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<span>(label)</span>
		</AppRailAnchor>
		<!-- --- -->
		<svelte:fragment slot="trail">
			<AppRailAnchor class="cursor-pointer">
				<form action="/home?/logout" method="post" use:enhance>
					<button type="submit" class="variant-filled-error p-5">
						<Icon src={ArrowLeftStartOnRectangle} size="25" theme="solid" class="mx-auto" />
						<span>Logout</span>
					</button>
				</form>
			</AppRailAnchor>
		</svelte:fragment>
	</AppRail>

	<main class="container lg:mx-auto p-10 lg:ml-10">
		<slot />
	</main>
</div>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full fixed bottom-0 lg:hidden"
>
	<TabAnchor href="/home" selected={$page.url.pathname === '/home'}>
		<svelte:fragment slot="lead">
			<Icon src={UserGroup} size="25" theme="solid" class="mx-auto" />
		</svelte:fragment>
		<span>Members</span>
	</TabAnchor>
	<TabAnchor href="/" selected={$page.url.pathname === '/'}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>(label)</span>
	</TabAnchor>
	<TabAnchor href="/" selected={$page.url.pathname === '/'}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>(label)</span>
	</TabAnchor>
	<!-- ... -->
</TabGroup>
