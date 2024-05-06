<script lang="ts">
	import { enhance } from '$app/forms';
	import { getToastStore, popup, type ToastSettings } from '@skeletonlabs/skeleton';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from './$types.js';

	export let data;

	let phone: string | undefined;
	let selected: string;

	const toastStore = getToastStore();

	const submitter: SubmitFunction = async () => {
		return async ({ result, update }) => {
			const toast: ToastSettings = {
				message: '',
				background: 'variant-filled-success',
				hoverable: true,
				timeout: 5000
			};

			switch (result.type) {
				case 'failure': {
					toast.message = result.data!.message;
					toast.background = 'variant-filled-error';
					break;
				}
				case 'success': {
					toast.message = result.data!.message;
					break;
				}
			}

			toastStore.trigger(toast);
			return update({ reset: result.type === 'success' });
		};
	};
</script>

<section class="container mx-auto flex justify-center items-center min-h-dvh">
	<form
		action="?/register"
		method="post"
		class="card variant-soft p-10 grid gap-5 m-10"
		enctype="multipart/form-data"
		use:enhance={submitter}
	>
		<header class="mb-2">
			<h1 class="h1 mb-2">Member Registration</h1>
			<p>
				Join to be a full fledged weeb today!
				<br />
				<strong>One-time Registration Fee: RM10</strong>
			</p>
		</header>

		<div class="card p-5 variant-ghost grid gap-5">
			<h2 class="h3">Personal Details</h2>
			<label class="label">
				<span>Student ID <span class="text-error-500">*</span></span>
				<input
					class="input"
					type="text"
					name="studentId"
					id="studentId"
					placeholder="YYMMXXXX"
					maxlength="8"
					required
				/>
			</label>

			<label class="label">
				<span>First Name <span class="text-error-500">*</span></span>
				<input
					class="input"
					type="text"
					name="firstName"
					id="firstName"
					placeholder="John"
					maxlength="45"
					required
				/>
			</label>

			<label class="label">
				<span>Surname <span class="text-error-500">*</span></span>
				<input
					class="input"
					type="text"
					name="surname"
					id="surname"
					placeholder="Doe"
					maxlength="45"
					required
				/>
			</label>

			<label class="label">
				<span>Course <span class="text-error-500">*</span></span>
				<input
					class="input"
					type="text"
					name="course"
					id="course"
					placeholder="Bachelor of Software Engineering (Hons)"
					maxlength="100"
					required
				/>
			</label>

			<label class="label">
				<span>Phone Number <span class="text-error-500">*</span></span>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<select bind:value={selected} name="phoneCode" id="phoneCode">
						{#each data.phoneCodes as code}
							<option selected={code.dial_code === '+60'} value={code.dial_code}>
								{code.emoji}
								<span>{code.dial_code}</span>
							</option>
						{/each}
					</select>
					<input
						type="text"
						name="phoneNumber"
						id="phoneNumber"
						placeholder="07-2xx-xxxx"
						maxlength="15"
						required
						bind:value={phone}
						on:input={() => {
							if (selected === '+60') {
								phone = phone
									?.match(/\d*/g)
									?.join('')
									.match(/(\d{0,2})(\d{0,3})(\d{0,4})/)
									?.slice(1)
									.join('-')
									.replace(/-*$/g, '');
							}
						}}
					/>
				</div>
			</label>

			<label class="label">
				<span>
					Discord Username
					<span class="text-error-500">*</span>
					<noscript class="[&+*]:hidden" />
					<button
						type="button"
						class="inline-block cursor-pointer"
						use:popup={{
							event: 'click',
							target: 'discordTooltip',
							placement: 'top'
						}}
					>
						<Icon src={ExclamationCircle} size="15" />
					</button>
					<div class="card shadow-xl" data-popup="discordTooltip">
						<header class="card-header">
							<img
								src="/discord-guide.png"
								alt="Discord username guide"
								class="variant-soft rounded w-full p-4"
							/>
						</header>
						<section class="p-4">
							<p>
								Your Discord username is important for us to verify you. <br />Please try to keep
								the capitalization of the input the same as your username if possible.
							</p>
						</section>
						<div class="arrow bg-surface-100-800-token" />
					</div>
				</span>
				<input
					class="input"
					type="text"
					name="discord"
					id="discord"
					placeholder="officialspimy"
					maxlength="32"
					required
				/>
			</label>
		</div>

		<div class="card p-5 variant-ghost grid gap-5">
			<h2 class="h3">Interest Check</h2>

			<div class="space-y-2">
				<span>What activities are you hoping to participate in?</span>
				{#each data.activities as activity}
					<label class="flex space-x-2">
						<input
							class="checkbox mt-1"
							type="checkbox"
							name="activity-{activity.id}"
							id="activity-{activity.id}"
						/>
						<dl>
							<dt>{activity.name}</dt>
							<dd>
								{#each activity.examples as example}
									<ul class="list-disc ml-10">
										<li>{example}</li>
									</ul>
								{/each}
							</dd>
						</dl>
					</label>
				{/each}
			</div>

			<label class="label">
				<span>Why are you joining the Anime Club?</span>
				<textarea
					class="textarea"
					name="reason"
					id="reason"
					rows="4"
					placeholder="I like anime and wish to meet like-minded people."
				/>
			</label>
		</div>

		<div class="card p-5 variant-ghost grid gap-5">
			<h2 class="h3">Verification</h2>

			<label class="label" for="pop">
				<span>
					Proof of Payment
					<span class="text-error-500">*</span>
				</span>
				<input
					class="input"
					type="file"
					name="pop"
					id="pop"
					accept="image/png, image/jpeg, .pdf"
					required
				/>
			</label>

			<label class="label">
				<span>
					As double verification, who's your favourite husbando/waifu?
					<span class="text-error-500">*</span>
					<noscript class="[&+*]:hidden" />
					<button
						type="button"
						class="inline-block cursor-pointer"
						use:popup={{
							event: 'click',
							target: 'favHusWaifuTooltip',
							placement: 'top'
						}}
					>
						<Icon src={ExclamationCircle} size="15" />
					</button>
					<div class="card shadow-xl" data-popup="favHusWaifuTooltip">
						<section class="p-4">
							<p>
								Make sure to also include this in your self-introduction on the Discord server as
								this serves as a top priority for verification.
							</p>
						</section>
						<div class="arrow bg-surface-100-800-token" />
					</div>
				</span>
				<input
					class="input"
					type="text"
					name="favHusWaifu"
					id="favHusWaifu"
					placeholder="Kamisato Ayaka"
					maxlength="32"
					required
				/>
			</label>
		</div>

		<div class="flex gap-5">
			<button type="reset" class="btn variant-filled-warning w-full">Clear</button>
			<button type="submit" class="btn variant-filled-primary w-full">Submit</button>
		</div>
	</form>
</section>
