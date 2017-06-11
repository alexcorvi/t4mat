export interface Dictionary {
	units: {
		a: string[];
		b: string[];
		c: string[];
		d: string[];
		e: string[];
		f: string[];
		g: string[];
	};
	names: {
		days: string[][];
		months: string[][];
	},
	indicators: {
		past: string,
		future: string
	}
}