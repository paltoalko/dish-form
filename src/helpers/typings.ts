export type FormType = {
	name: string;
	preparation_time: string;
	type: string;
	no_of_slices?: number;
	diameter?: number;
	spiciness_scale?: number;
	slices_of_bread?: number;
	id: number;
};

export type FormValues = {
	name: string;
	hours: number;
	minutes: number;
	seconds: number;
	type: string;
	no_of_slices?: number;
	diameter?: number;
	spiciness_scale?: number;
	slices_of_bread?: number;
};
