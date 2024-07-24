<script lang="ts">
	type tileProps = {
		tileIndex: number;
		tileContent: number | null;
	};

	const { tileIndex, tileContent }: tileProps = $props();
</script>

<div style:background-color="var(--tile-color)" tabindex="-1">
	{tileContent}
	<div>
		{tileIndex}
	</div>
</div>

<style lang="scss">
	div {
		position: relative;

		&:hover {
			padding: 0.3rem;
		}

		div {
			bottom: -1.3rem;
			font-size: 0.5rem;
			position: absolute;
		}
	}
</style>
