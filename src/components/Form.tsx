import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Form.module.css";
import { useForm, Controller } from "react-hook-form";
import {
	MenuItem,
	Box,
	Button,
	Select,
	Slider,
	TextField,
	Typography,
	Paper,
	CircularProgress,
	Alert,
} from "@mui/material";
import { hourMarks, minuteMarks, secondsMarks, spiceMarks } from "../helpers/constants";
import { FormContext } from "./api/formHandler";
import { FormType, FormValues } from "helpers/typings";

const DishForm: React.FC<{}> = () => {
	const {
		handleSubmit,
		formState: { errors },
		control,
		register,
		unregister,
		watch,
	} = useForm<FormValues>({
		shouldUnregister: true,
	});

	const watchDataType = watch("type");
	const [timeError, setTimeError] = useState(false);
	const { postForm, loading, error, success } = useContext(FormContext);
	useEffect(() => {
		if (watchDataType) {
			register("type");
		} else {
			unregister("type");
		}
	}, [register, unregister, watchDataType]);

	const checkTime = (time: string) => {
		if (time === "00:00:00") {
			setTimeError(true);
		} else return true;
	};

	const onSubmit = (data: FormValues) => {
		const time = `${data.hours ? data.hours : "00"}:${data.minutes ? data.hours : "00"}:${
			data.seconds ? data.hours : "00"
		}`;

		const id = new Date().valueOf();
		if (checkTime(time)) {
			const obj: FormType = {
				name: data.name,
				preparation_time: time,
				type: data.type,
				no_of_slices: data.no_of_slices,
				diameter: data.diameter,
				spiciness_scale: data.spiciness_scale,
				slices_of_bread: data.slices_of_bread,
				id: id,
			};

			postForm(obj);
		} else return;
	};

	return (
		<Box className={styles.wrapper}>
			{loading ? (
				<CircularProgress />
			) : (
				<Paper className={styles.container}>
					{error && (
						<Alert severity='error' sx={{ width: "100%", m: "1em" }}>
							There was an error while posting data.
						</Alert>
					)}

					{success && (
						<Alert severity='success' sx={{ width: "100%", m: "1em" }}>
							Data has been sent successfully.
						</Alert>
					)}
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
									{errors.type && (
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
								<Box>
									{errors.no_of_slices && (
										<Typography variant='caption' color='error'>
											Please add a number.
										</Typography>
									)}
								</Box>
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
								<Box>
									{errors.diameter && (
										<Typography variant='caption' color='error'>
											Please add a diameter.
										</Typography>
									)}
								</Box>
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
									name='slices_of_bread'
									control={control}
									rules={{ required: true }}
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
								<Box>
									{errors.slices_of_bread && (
										<Typography variant='caption' color='error'>
											Please add a number of slices.
										</Typography>
									)}
								</Box>
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
			)}
		</Box>
	);
};

export default DishForm;
