import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === "production" ? "/Search-Algorithm-Visualizations" : ""
		}
	},

	preprocess: preprocess({
		scss: {
			includePaths: ["src"]
		}
	})
};

export default config;
