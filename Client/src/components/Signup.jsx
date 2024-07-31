/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signup from "../Services/operations/register";
import { useNavigate } from "react-router-dom";

const Signup = ({ setTab }) => {
	const { loading } = useSelector((state) => state.profile.loading);
	const options = useMemo(() => countryList().getData(), []);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful)
			reset({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
				designation: "",
				address: "",
				phone: "",
				country: "",
			});
	}, [isSubmitSuccessful, reset]);

	const SubmitHandler = (data) => {
		dispatch(signup(data, navigate));
	};

	return (
		<div className=" flex flex-col  items-center  ">
			{loading ? (
				<div className=" mt-64 w-full flex justify-center items-center ">
					<Spinner />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(SubmitHandler)}
					className=" w-[50%] h-fit rounded-2xl
					bg-gray-700 bg-opacity-30 box-content px-10 py-10  "
				>
					<div className="flex flex-col gap-y-6   ">
						<div className="flex gap-2 ">
							{/* First Name*/}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										First Name
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type="text"
										name="firstName"
										placeholder="e.g. John"
										{...register("firstName", {
											required: true,
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
								</label>
								{errors.firstName && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter First Name
									</div>
								)}
							</div>

							{/* Last Name*/}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Last Name
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type="text"
										name="lastName"
										placeholder="e.g. Doe"
										{...register("lastName", {
											required: true,
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
								</label>
								{errors.lastName && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter Last Name
									</div>
								)}
							</div>
						</div>
						{/* Email */}
						<div className="w-full h-[72px] flex flex-col  ">
							<label className="">
								<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
									Email Address
									<sup className="text-red-900">*</sup>
								</p>
								<input
									type="email"
									name="email"
									placeholder="e.g. xyz@mail.com"
									{...register("email", { required: true })}
									style={{
										boxShadow:
											"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
									}}
									className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
								/>
							</label>
							{errors.email && (
								<div className=" text-red-900 self-start text-xs font-semibold ">
									Please Enter Correct Email Address
								</div>
							)}
						</div>

						<div className="flex gap-2">
							{/* Phone Number */}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Phone Number
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type="text"
										name="phone"
										placeholder="e.g. Landmark, City"
										{...register("phone", {
											required: true,
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
								</label>
								{errors.phone && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter Phone Number
									</div>
								)}
							</div>
							{/* Country */}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Country
										<sup className="text-red-900">*</sup>
									</p>
									<select
										{...register("country", {
											required: true,
										})}
										className="w-full h-fit rounded-lg bg-slate-800 p-3 text-slate-50"
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
									>
										{options.map((option, index) => (
											<option
												key={index}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>
								</label>
							</div>
						</div>

						<div className="flex gap-2">
							{/* Designation */}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Designation
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type="text"
										name="designation"
										placeholder="e.g. Software Developer"
										{...register("designation", {
											required: true,
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
								</label>
								{errors.designation && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter Designation
									</div>
								)}
							</div>
							{/* Address */}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Address
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type="text"
										name="address"
										placeholder="e.g. Landmark, City"
										{...register("address", {
											required: true,
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
								</label>
								{errors.address && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter your Address
									</div>
								)}
							</div>
						</div>

						<div className="flex gap-2">
							{/* Password */}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="relative">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Password
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type={
											showPassword ? "text" : "password"
										}
										name="password"
										placeholder="e.g. John@1"
										{...register("password", {
											required: true,
											pattern: {
												value: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/",
												message:
													"Password should contain atleast one upper case, one lower case , one number and an special character ",
											},
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
									<span
										onClick={() =>
											setShowPassword((prev) => !prev)
										}
										className="absolute right-3 top-[38px] z-[10] cursor-pointer"
									>
										{showPassword ? (
											<AiOutlineEyeInvisible
												fontSize={24}
												fill="#AFB2BF"
											/>
										) : (
											<AiOutlineEye
												fontSize={24}
												fill="#AFB2BF"
											/>
										)}
									</span>
								</label>
								{errors.password && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter Your Password
									</div>
								)}
							</div>
							{/* Confirm Password */}
							<div className="w-full h-[72px] flex flex-col  ">
								<label className="relative">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
										Confirm Password
										<sup className="text-red-900">*</sup>
									</p>
									<input
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										name="confirmPassword"
										placeholder="e.g. John@1"
										{...register("confirmPassword", {
											required: true,
											pattern: {
												value: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/",
												message:
													"Password should contain atleast one upper case, one lower case , one number and an special character ",
											},
										})}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
									/>
									<span
										onClick={() =>
											setShowConfirmPassword(
												(prev) => !prev
											)
										}
										className="absolute right-3 top-[38px] z-[10] cursor-pointer"
									>
										{showConfirmPassword ? (
											<AiOutlineEyeInvisible
												fontSize={24}
												fill="#AFB2BF"
											/>
										) : (
											<AiOutlineEye
												fontSize={24}
												fill="#AFB2BF"
											/>
										)}
									</span>
								</label>
								{errors.confirmPassword && (
									<div
										className=" text-red-900 self-start text-xs
									font-semibold "
									>
										Please Enter Your Password
									</div>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="mt-2 w-full rounded-[8px] bg- bg-yellow-400 py-[8px] px-[12px] font-medium text-slate-950"
						>
							Register
						</button>
					</div>

					<button
						className=" mt-2 text-blue-700   "
						onClick={() => {
							setTab("login");
						}}
					>
						Already have an Account
					</button>
				</form>
			)}
		</div>
	);
};

export default Signup;
