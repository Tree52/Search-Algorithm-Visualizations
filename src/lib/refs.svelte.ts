// prettier-ignore
function ref<T>(initial: T): {value: T} {
	let value: T = $state(initial);

	return {
		get value(): T { return value; },
		set value(v: T) { value = v; }
	};
}

export const algorithm: { value: string } = ref<string>("Linear");
export const goPressed: { value: boolean } = ref<boolean>(false);
export const target: { value: string } = ref<string>("");

export const stepIndex: { value: number } = ref<number>(0);
type Step = {
	tileColors: string[];
	tileContents: (number | null)[];

	resultContent: string;

	metaTileContents: (number | null)[];
};
export const steps: { value: Step[] } = ref<Step[]>([
	{ tileColors: [], tileContents: [], resultContent: "", metaTileContents: [] }
]);
