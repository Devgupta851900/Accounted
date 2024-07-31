import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../Services/operations/logout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { update } from "../Services/operations/update";

const AccountInformation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.profile.user);
	const [showModal, setShowModal] = useState(false);

	const loading = useSelector((state) => state.profile.loading);
	const [showPassword, setShowPassword] = useState(false);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful)
			reset({
				name: "",
				phone: "",
				designation: "",
				address: "",
				bio: "",
				oldPassword: "",
				newPassword: "",
				confirmNewPassword: "",
			});
	}, [isSubmitSuccessful, reset]);

	const SubmitHandler = (data) => {
		dispatch(update({ ...data, email: user.email }));
		setShowModal(false);
	};

	return (
		<div
			className={`relative 
		${showModal ? " h-screen md:overflow-hidden " : " h-full "}`}
		>
			<div
				className={`flex flex-col justify-center items-center mt-4 mb-16 p-4 transition-all duration-200
			${showModal ? " invisible " : " visible "}
			`}
			>
				<div className="w-full text-white flex flex-col justify-center items-start gap-y-4  ">
					<div className="flex w-full justify-between items-center md:px-24 ">
						<div className=" rounded-full border aspect-square border-slate-700 flex justify-start items-start lg:p-4 md:p-4 p-1 ">
							<img
								alt="profile"
								src={user.image}
								width={240}
								className=" rounded-full"
							/>
						</div>
						<div className=" mt-4 lg:w-1/2 md:w-1/2 w-full flex justify-center items-center gap-x-2">
							<button
								onClick={() => {
									setShowModal((prev) =>
										prev ? false : true
									);
								}}
								className="mt-2 lg:w-[40%] w-4/5 ml-2 rounded-[8px] bg- bg-yellow-400 py-[8px] px-[12px] font-medium text-slate-950"
							>
								Edit
							</button>
							<button
								onClick={() => {
									dispatch(logout(navigate));
								}}
								className="mt-2 lg:w-[40%] w-4/5 ml-2 rounded-[8px] bg- bg-yellow-400 py-[8px] px-[12px] font-medium text-slate-950"
							>
								Logout
							</button>
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Name
						</div>
						<div className="capitalize w-[72%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.name}
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Email:
						</div>
						<div className="capitalize w-[72%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.email}
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Phone Number
						</div>
						<div className="capitalize w-[72%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.phone}
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Designation
						</div>
						<div className="capitalize w-[72%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.designation}
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Address
						</div>
						<div className="capitalize w-[72%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.address}
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Country
						</div>
						<div className="capitalize w-[72%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.country}
						</div>
					</div>
					<div className="w-full  flex  justify-between items-center gap-4 md:text-2xl rounded-xl p-2  ">
						<div className="uppercase w-[23%] border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center shadow-[#ffffff2e]  ">
							Bio
						</div>
						<div className="capitalize w-[72%] h-[200px] flex justify-center items-center border-slate-700 bg-slate-400 bg-opacity-10 text-slate-200 rounded-full p-2 text-center">
							{user.bio ? (
								user.bio
							) : (
								<div className="text-slate-50 text-opacity-50 text-center">
									User Description will be shown here
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div>
				{showModal &&
					(loading ? (
						<div
							className="w-[90%]  mx-auto my-8 z-5 p-24  bg-slate-900 flex flex-col justify-center
						 items-center  rounded-3xl absolute top-0 left-0 bottom-0 right-0"
						>
							<Spinner />
						</div>
					) : (
						<form
							onSubmit={handleSubmit(SubmitHandler)}
							className=" w-[90%] h-fit mx-auto z-5 p-10 bg-slate-900  rounded-3xl absolute top-0 left-0 bottom-0 right-0  "
						>
							<div className="text-slate-50 text-center mb-2">
								You can edit one or more detail(s).
								<div className=" text-pink-800 ">
									[Please Enter Your password to confirm]
								</div>
							</div>

							<div className=" flex flex-col gap-y-4">
								<div className="flex gap-x-4">
									{/* Name */}
									<div className="w-full h-[72px] flex flex-col  ">
										<label className="">
											<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
												Name
												<sup className="text-red-900">
													*
												</sup>
											</p>
											<input
												type="text"
												name="name"
												placeholder="e.g. John"
												{...register("name", {})}
												style={{
													boxShadow:
														"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
												}}
												className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
											/>
										</label>
										{errors.name && (
											<div
												className=" text-red-900 self-start text-xs
									font-semibold "
											>
												Please Enter Name
											</div>
										)}
									</div>

									{/* Designation */}
									<div className="w-full h-[72px] flex flex-col  ">
										<label className="">
											<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
												Designation
												<sup className="text-red-900">
													*
												</sup>
											</p>
											<input
												type="text"
												name="designation"
												placeholder="e.g. Software Developer"
												{...register("designation", {})}
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
												Please Enter First Name
											</div>
										)}
									</div>
								</div>

								{/* Phone Number */}
								<div className="w-full h-[72px] flex flex-col  ">
									<label className="">
										<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
											Phone Number
											<sup className="text-red-900">
												*
											</sup>
										</p>
										<input
											type="text"
											name="phone"
											placeholder="e.g. John"
											{...register("phone", {})}
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
											Please Enter First Name
										</div>
									)}
								</div>

								{/* Address */}
								<div className="w-full h-[72px] flex flex-col  ">
									<label className="">
										<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
											Address
											<sup className="text-red-900">
												*
											</sup>
										</p>
										<input
											type="text"
											name="address"
											placeholder="e.g Landmark, City"
											{...register("address", {})}
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
											Please Enter First Name
										</div>
									)}
								</div>

								{/* Bio */}
								<div className="w-full h-fit flex flex-col  ">
									<label className="">
										<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
											Bio
											<sup className="text-red-900">
												*
											</sup>
										</p>
										<textarea
											type="text"
											name="bio"
											rows={5}
											placeholder="e.g Landmark, City"
											{...register("bio")}
											style={{
												boxShadow:
													"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
											}}
											className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
										/>
									</label>
									{errors.bio && (
										<div
											className=" text-red-900 self-start text-xs
									font-semibold "
										>
											Please Enter First Name
										</div>
									)}
								</div>

								{/* Password */}

								<div className="flex flex-col md:flex-row gap-2">
									{/* Old Password */}
									<div className="w-full h-[72px] flex flex-col  ">
										<label className="relative">
											<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
												Password
												<sup className="text-red-900">
													*
												</sup>
											</p>
											<input
												type={
													showOldPassword
														? "text"
														: "password"
												}
												name="oldPassword"
												placeholder="e.g. John@1"
												{...register("oldPassword", {
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
													setShowOldPassword(
														(prev) => !prev
													)
												}
												className="absolute right-3 top-[38px] z-[10] cursor-pointer"
											>
												{showOldPassword ? (
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
										{errors.oldPassword && (
											<div
												className=" text-red-900 self-start text-xs
									font-semibold "
											>
												Please Enter Your Password
											</div>
										)}
									</div>
									{/* Password */}
									<div className="w-full h-[72px] flex flex-col  ">
										<label className="relative">
											<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
												New Password
												<sup className="text-red-900">
													*
												</sup>
											</p>
											<input
												type={
													showPassword
														? "text"
														: "password"
												}
												name="newPassword"
												placeholder="e.g. John@1"
												{...register("newPassword", {
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
													setShowPassword(
														(prev) => !prev
													)
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
										{errors.newPassword && (
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
												<sup className="text-red-900">
													*
												</sup>
											</p>
											<input
												type={
													showConfirmPassword
														? "text"
														: "password"
												}
												name="confirmNewPassword"
												placeholder="e.g. John@1"
												{...register(
													"confirmNewPassword",
													{
														pattern: {
															value: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/",
															message:
																"Password should contain atleast one upper case, one lower case , one number and an special character ",
														},
													}
												)}
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
										{errors.confirmNewPassword && (
											<div
												className=" text-red-900 self-start text-xs
									font-semibold "
											>
												Please Enter Your Password
											</div>
										)}
									</div>
								</div>
							</div>

							<button
								type="submit"
								className="mt-12 w-full rounded-[8px] bg- bg-yellow-400 py-[8px] px-[12px] font-medium text-slate-950"
							>
								Save
							</button>

							<button
								onClick={() => {
									setShowModal((prev) =>
										prev ? false : true
									);
								}}
								className="  text-blue-600 mt-4 w-full "
							>
								Exit
							</button>
						</form>
					))}
			</div>
		</div>
	);
};

export default AccountInformation;
