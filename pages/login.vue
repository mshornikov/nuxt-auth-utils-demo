<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const state = reactive({
	email: "",
	password: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent) {
	toast.add({
		title: "Success",
		description: "The form has been submitted.",
		color: "success",
	});
	console.log(event.data);
}
</script>

<template>
	<UContainer class="h-screen flex flex-col items-center justify-center">
		<UCard class="min-w-sm">
			<template #header>
				<h1 class="text-xl text-pretty font-semibold">Login</h1>
			</template>

			<UForm :state="state" class="space-y-4" @submit="onSubmit">
				<UFormField label="Email" name="email" required>
					<UInput v-model="state.email" type="email" />
				</UFormField>

				<UFormField label="Password" name="password" required>
					<UInput v-model="state.password" type="password" />
				</UFormField>

				<UButton type="submit"> Submit </UButton>
			</UForm>
		</UCard>
	</UContainer>
</template>
