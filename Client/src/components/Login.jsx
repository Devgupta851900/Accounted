/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import login from "../Services/operations/login";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
const Login = ({ setTab }) => {
	const loading = useSelector((state) => state.profile.loading);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful)
			reset({
				email: "",
				password: "",
			});
	}, [isSubmitSuccessful, reset]);

	const SubmitHandler = (data) => {
		dispatch(login(data, navigate));
	};

	return (
		<div className=" mt-24 flex flex-col justify-around  items-center  ">
			{loading ? (
				<div className=" mt-36 w-full flex justify-center items-center ">
					<Spinner />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(SubmitHandler)}
					className=" flex flex-col gap-y-6 items-center justify-center w-[30%] h-fit rounded-2xl
				 bg-gray-700 bg-opacity-30 box-content px-10 py-10  "
				>
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
								placeholder="Enter Your Email Address"
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

					{/* Password */}
					<div className="w-full h-[72px] flex flex-col justify-start ">
						<label className="relative">
							<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50">
								Password
								<sup className="text-red-900">*</sup>
							</p>
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Enter Password"
								{...register("password", {
									required: true,
									minLength: {
										value: 8,
										message:
											"Password Should be atleast 8 Characters",
									},
									maxLength: {
										value: 24,
										message:
											"Password Should not exceed 24 Characters",
									},
								})}
								style={{
									boxShadow:
										"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
								}}
								className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50"
							/>
							<span
								onClick={() => setShowPassword((prev) => !prev)}
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
							<div className=" text-red-900 self-start text-xs font-semibold ">
								Please Enter Correct Password
							</div>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="mt-2 w-full rounded-[8px] bg- bg-yellow-400 py-[8px] px-[12px] font-medium text-slate-950"
					>
						Login
					</button>

					<button
						className=" mt-1 text-blue-700 "
						onClick={() => {
							setTab("register");
						}}
					>
						Create new Account
					</button>
				</form>
			)}
		</div>
	);
};

export default Login;
