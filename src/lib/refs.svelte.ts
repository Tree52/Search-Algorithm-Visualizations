type Step = {
	tileColors: string[];
	tileContents: (number | null)[];

	resultContent: string;

	metaTileContents: (number | null)[];
};

type Ref<T> = {
	value: T;
	reset: () => void;
};

const deepCopy = (obj: object): object => JSON.parse(JSON.stringify(obj));

function ref<T>(initial: T): Ref<T> {
	const isObj: boolean = typeof initial === "object" ? true : false;
	let value: T = $state(isObj ? (deepCopy(initial!) as T) : initial);
	const reset = (): T => (value = isObj ? (deepCopy(initial!) as T) : initial);

	// prettier-ignore
	return {
    get value(): T { return value; },
    set value(v: T) { value = v; },
    reset
  };
}

export const algorithm: Ref<string> = ref<string>("Linear");
export const target: Ref<string> = ref<string>("");
export const stepsIndexer: Ref<number> = ref<number>(0);
export const steps: Ref<Step[]> = ref<Step[]>([
	{ tileColors: [], tileContents: [], resultContent: "", metaTileContents: [] }
]);
