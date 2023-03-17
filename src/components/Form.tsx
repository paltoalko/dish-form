import React, { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Box, Button, Select, Slider, TextField, Typography, Paper, Alert } from "@mui/material";
import { hourMarks, minuteMarks, secondsMarks, spiceMarks } from "../helpers/constants";

// import { FormValues } from "../helpers/typings";

interface TaskProps {
	newTaskHandler: (data: object) => void;
	changedTaskHandler: (data: object, id: number) => void;
	preloadedValues: any;
	handleExit(): void;
}

type FormValues = {
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

const DishForm: React.FC<{}> = () => {
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
		register,
		unregister,
		watch,
	} = useForm<FormValues>({
		shouldUnregister: true,
	});

	const watchDataType = watch("type");
	const [timeError, setTimeError] = useState(false);

	useEffect(() => {
		if (watchDataType) {
			register("type");
		} else {
			unregister("type");
		}
		console.log(watchDataType);
	}, [register, unregister, watchDataType]);

	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData({ ...formData, [name]: value });
	// };

	const checkTime = (time) => {
		if (time === "00:00:00") {
			setTimeError(true);
		} else return true;
	};

	const onSubmit = (data) => {
		const time = `${data.hours ? data.hours : "00"}:${data.minutes ? data.hours : "00"}:${
			data.seconds ? data.hours : "00"
		}`;
		checkTime(time);
		console.log(checkTime(time));
	};

	return (
		<Box className={styles.wrapper}>
			<Paper className={styles.container}>
				<Typography variant='h3'>Dish Form</Typography>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Box className={styles.topForm}>
						<Box>
							<Typography variant='h5' fontWeight={400} className={styles.labelText}>
								Title
							</Typography>
							<Controller
								name='name'
								aria-label='dish-title'
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<TextField
										onChange={onChange}
										value={value || ""}
										inputProps={{ maxLength: 20 }}
										className={styles.textField}
									/>
								)}
							/>
							<Box>
								{errors.name && (
									<Typography variant='caption' color='error'>
										Please add title.
									</Typography>
								)}
							</Box>
						</Box>
						<Box>
							<Typography variant='h5' fontWeight={400} className={styles.labelText}>
								Type
							</Typography>
							<Controller
								control={control}
								name='type'
								aria-label='dish-type'
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<Select
										value={value || ""}
										onChange={onChange}
										sx={{ color: "black", height: "45px", minWidth: "120px" }}>
										<MenuItem sx={{ color: "black" }} value={"pizza"} defaultValue=''>
											Pizza
										</MenuItem>
										<MenuItem sx={{ color: "black" }} value={"soup"} defaultValue=''>
											Soup
										</MenuItem>
										<MenuItem sx={{ color: "black" }} value={"sandwich"} defaultValue=''>
											Sandwich
										</MenuItem>
									</Select>
								)}
							/>
							<Box>
								{errors.name && (
									<Typography variant='caption' color='error'>
										Please select type.
									</Typography>
								)}
							</Box>
						</Box>
					</Box>

					<Typography variant='h5' fontWeight={400}>
						Time
					</Typography>

					<Typography variant='body1' fontWeight={400}>
						Hours
					</Typography>
					<Controller
						control={control}
						name='hours'
						aria-label='hours'
						render={({ field: { value, ...field } }) => (
							<Slider
								{...field}
								onChange={(value) => {
									setTimeError(false);
									field.onChange(value);
								}}
								valueLabelDisplay='auto'
								value={value || 0}
								max={72}
								step={1}
								marks={hourMarks}
								classes={{ markLabel: styles.mark }}
								className={styles.slider}
							/>
						)}
					/>
					<Box>{errors.hours && <Typography variant='caption'>Please select the amount of hours.</Typography>}</Box>
					<Typography variant='body1' fontWeight={400}>
						Minutes
					</Typography>
					<Controller
						control={control}
						name='minutes'
						aria-label='minutes'
						render={({ field: { value, ...field } }) => (
							<Slider
								{...field}
								onChange={(value) => {
									setTimeError(false);
									field.onChange(value);
								}}
								valueLabelDisplay='auto'
								value={value || 0}
								max={59}
								step={1}
								marks={minuteMarks}
								classes={{ markLabel: styles.mark }}
							/>
						)}
					/>
					<Typography variant='body1' fontWeight={400}>
						Seconds
					</Typography>
					<Controller
						control={control}
						name='seconds'
						aria-label='seconds'
						render={({ field: { value, ...field } }) => (
							<Slider
								{...field}
								onChange={(value) => {
									setTimeError(false);
									field.onChange(value);
								}}
								valueLabelDisplay='auto'
								value={value || 0}
								max={59}
								step={1}
								marks={secondsMarks}
								classes={{ markLabel: styles.mark }}
							/>
						)}
					/>

					{timeError && (
						<Typography variant='caption' color='error' sx={{ marginTop: "1em" }}>
							Please add time.
						</Typography>
					)}

					{watchDataType === "pizza" && (
						<Box className={styles.bottomForm}>
							<Typography variant='h5' fontWeight={400} className={styles.labelText}>
								Number of slices
							</Typography>
							<Controller
								name='no_of_slices'
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<TextField
										type='number'
										onChange={onChange}
										value={value || ""}
										inputProps={{ maxLength: 20 }}
										className={styles.textField}
									/>
								)}
							/>
							<Typography variant='h5' fontWeight={400} className={styles.labelText}>
								Diameter
							</Typography>
							<Controller
								name='diameter'
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<TextField
										type='number'
										onChange={onChange}
										value={value || ""}
										inputProps={{ maxLength: 20 }}
										className={styles.textField}
									/>
								)}
							/>
						</Box>
					)}
					{watchDataType === "soup" && (
						<Box className={styles.bottomForm}>
							<Typography variant='h5' fontWeight={400} className={styles.labelText}>
								Spiceness scale
							</Typography>
							<Controller
								control={control}
								name='spiciness_scale'
								render={({ field: { value, ...field } }) => (
									<Slider
										{...field}
										onChange={(value) => field.onChange(value)}
										valueLabelDisplay='auto'
										value={value || 0}
										max={10}
										step={1}
										marks={spiceMarks}
										classes={{ markLabel: styles.mark }}
										className={styles.slider}
									/>
								)}
							/>
						</Box>
					)}
					{watchDataType === "sandwich" && (
						<Box className={styles.bottomForm}>
							<Typography variant='h5' fontWeight={400} className={styles.labelText}>
								Slices of bread
							</Typography>
							<Controller
								name='diameter'
								control={control}
								render={({ field: { onChange, value } }) => (
									<TextField
										InputProps={{ inputProps: { min: 0, max: 10 } }}
										type='number'
										onChange={onChange}
										value={value || ""}
										className={styles.textField}
									/>
								)}
							/>
						</Box>
					)}
					<Button
						type='submit'
						color='success'
						variant='contained'
						size='large'
						sx={{ minWidth: "150px", fontSize: "1.2em", margin: "1em" }}>
						Submit
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default DishForm;
