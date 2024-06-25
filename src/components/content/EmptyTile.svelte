<script lang="ts">
	type tileProps = {
		tileContent: number | null;
	};

	const { tileContent }: tileProps = $props();
</script>

<div tabindex="-1">
	{tileContent}
</div>

<style lang="scss">
	div {
		border: 2px white solid;
	}
</style>
