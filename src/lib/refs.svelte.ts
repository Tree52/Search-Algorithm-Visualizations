type Step = {
  tileColors: string[];
  tileContents: (number | null)[];

  resultContent: string;

  metaTileContents: (number | null)[];
};

type Ref<T> = {
  v: T;
  reset: () => void;
};

const deepCopy = (obj: object): object => JSON.parse(JSON.stringify(obj));

function ref<T>(initial: T): Ref<T> {
  const isObj: boolean = typeof initial === "object" ? true : false;
  let v: T = $state(isObj ? (deepCopy(initial!) as T) : initial);
  const reset = (): T => (v = isObj ? (deepCopy(initial!) as T) : initial);

  // prettier-ignore
  return {
    get v(): T { return v; },
    set v(value: T) { v = value; },
    reset
  };
}

export const algorithm: Ref<string> = ref<string>("Linear");
export const target: Ref<string> = ref<string>("");
export const stepsIndexer: Ref<number> = ref<number>(0);
export const steps: Ref<Step[]> = ref<Step[]>([{ tileColors: [], tileContents: [], resultContent: "", metaTileContents: [] }]);
