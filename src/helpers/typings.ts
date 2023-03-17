export type FormType = {
	name: string;
	time: string;
	type: string;
	no_of_slices?: number;
	diameter?: number;
	spiciness_scale?: number;
	slices_of_bread?: number;
	id: string;
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
